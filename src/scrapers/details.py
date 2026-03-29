import time
import argparse
import json
import urllib.parse
import logging
from typing import List, Dict, Optional
from scrapling import StealthyFetcher
from tenacity import retry, stop_after_attempt, wait_exponential
from src.config import MAPS_SELECTORS, SCRAPE_SETTINGS

class GoogleMapsDetails:
    """
    Scraper for extracting detailed information from a Google Maps listing.
    """

    def __init__(self, headless: bool = True):
        self.fetcher = StealthyFetcher()
        self.headless = headless
        self.logger = logging.getLogger(__name__)

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    def extract(self, name_or_url: str) -> Dict:
        """
        Extract details with Explicit Wait and Fallback Items.
        Uses tenacity for retries on network or selector failures.
        """
        search_query = name_or_url
        if 'google.com/maps' in name_or_url and '/place/' in name_or_url:
            search_query = name_or_url.split('/place/')[1].split('/')[0].replace('+', ' ')
        
        search_url = f"https://www.google.com/maps/search/{urllib.parse.quote(search_query)}"
        self.logger.info(f"Expert Extraction (Interaction Mode): {search_query}")
        
        extracted_data = {}

        def extract_action(page):
            page.set_viewport_size({"width": 1920, "height": 1080})
            time.sleep(3)
            
            # 1. Consent
            try:
                for sel in ['button[aria-label="Accept all"]', 'button:has-text("Accept all")']:
                    btn = page.locator(sel).first
                    if btn.is_visible(timeout=2000):
                        btn.click()
                        time.sleep(2); break
            except Exception as e:
                self.logger.debug(f"Consent button not found or already accepted: {e}")

            # 2. Select Business
            try:
                # Use selector from config
                listing_link = page.locator(MAPS_SELECTORS["listing_link"]).first
                if listing_link.is_visible(timeout=5000):
                    listing_link.click()
                    time.sleep(3)
                page.wait_for_selector('h1', timeout=10000)
            except Exception as e:
                self.logger.warning(f"Failed to find business 'h1' for {search_query}: {e}")
                return

            # 3. Trigger & Extract Reviews
            reviews = []
            try:
                # Use selector from config
                trigger = page.locator(MAPS_SELECTORS["reviews_btn"]).first
                if trigger.is_visible():
                    trigger.click()
                    self.logger.info("   Reviews: Clicked.")
                    
                    # WAIT for content to appear
                    try:
                        # Review item selector
                        page.wait_for_selector('.jftiEf', timeout=10000)
                    except:
                        page.wait_for_selector('div[role="main"]', timeout=5000)
                    
                    # Scroll & Extract using evaluate
                    # Note: We keep some hardcoded logic inside the JS string but could abstract further
                    reviews = page.evaluate(f'''() => {{
                        const items = [];
                        const grab = () => {{
                            const els = document.querySelectorAll('.jftiEf, div[aria-label*="review"]');
                            els.forEach(el => {{
                                const author = el.querySelector('.d4r55, .XE7Z9')?.innerText;
                                const text = el.querySelector('.wiU7W, .MyV73d, .G6B9hd')?.innerText;
                                if(author && text && text.length > 5) {{
                                    items.push({{author, text: text.trim()}});
                                }}
                            }});
                        }};

                        const pane = document.querySelector('div.m67q60, .dS8AEf, div[role="main"]');
                        for(let i=0; i<8; i++) {{
                            if(pane) pane.scrollBy(0, 5000);
                            const s = Date.now(); while(Date.now()-s < 800){{}}
                            grab();
                        }}
                        
                        const seen = new Set();
                        return items.filter(r => {{
                            const id = r.author + r.text;
                            if(seen.has(id)) return false;
                            seen.add(id); return true;
                        }});
                    }}''')
                    self.logger.info(f"   Success: {len(reviews)} reviews captured.")
            except Exception as e:
                self.logger.debug(f"Review extraction failed for {search_query}: {e}")

            # 4. Final Metadata
            nonlocal extracted_data
            extracted_data = page.evaluate(f'''() => {{
                const name = document.querySelector('h1')?.innerText;
                const rating = document.querySelector('span[aria-label*="stars"]')?.getAttribute('aria-label');
                const cat = document.querySelector('.DkEaL')?.innerText;
                const addr = document.querySelector("{MAPS_SELECTORS['address_field']}")?.getAttribute('aria-label');
                const ph = document.querySelector("{MAPS_SELECTORS['phone_field']}")?.getAttribute('aria-label');
                const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
                return {{ name, rating, category: cat, address: addr, phone: ph, links }};
            }}''')
            extracted_data['reviews'] = reviews
            return

        # Fetch with action
        self.fetcher.fetch(search_url, headless=self.headless, page_action=extract_action, wait=SCRAPE_SETTINGS["default_timeout"])

        if not extracted_data:
            raise ValueError(f"No data extracted for {search_query}")

        # Post-process links
        socials = {"facebook": "", "instagram": "", "linkedin": "", "twitter": "", "youtube": "", "tiktok": ""}
        website = ""
        for h in extracted_data.get('links', []):
            h = h.lower()
            if not h or 'google' in h: continue
            if any(p in h for p in ['tel:', 'mailto:', 'javascript:', 'callto:']): continue
            found = False
            for p in socials.keys():
                if p in h:
                    if not socials[p]: socials[p] = h
                    found = True; break
            if not found and not website: website = h

        return {
            "name": extracted_data.get('name', 'Unknown'),
            "rating": extracted_data.get('rating', 'N/A'),
            "category": extracted_data.get('category', ''),
            "website": website, "social_links": socials,
            "address": (extracted_data.get('address') or "").replace('Address: ', ''),
            "phone": (extracted_data.get('phone') or "").replace('Phone: ', ''),
            "reviews": extracted_data.get('reviews', []),
            "url": search_url
        }

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-extract", type=str)
    args = parser.parse_args()
    if args.test_extract:
        extractor = GoogleMapsDetails(headless=True)
        print(json.dumps(extractor.extract(args.test_extract), indent=2))

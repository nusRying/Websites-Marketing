import time
import argparse
import json
import urllib.parse
import logging
from typing import Dict
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

    @retry(
        stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10)
    )
    def extract(
        self, name_or_url: str, get_reviews: bool = False, max_reviews: int = 20
    ) -> Dict:
        """
        Extract details with Explicit Wait and Fallback Items.
        Uses tenacity for retries on network or selector failures.
        """
        search_query = name_or_url
        if "google.com/maps" in name_or_url and "/place/" in name_or_url:
            search_query = (
                name_or_url.split("/place/")[1].split("/")[0].replace("+", " ")
            )

        search_url = (
            f"https://www.google.com/maps/search/{urllib.parse.quote(search_query)}"
        )
        self.logger.info(f"Expert Extraction (Interaction Mode): {search_query}")

        extracted_data = {}

        def extract_action(page):
            page.set_viewport_size({"width": 1920, "height": 1080})
            time.sleep(3)

            # 1. Consent
            try:
                for sel in [
                    'button[aria-label="Accept all"]',
                    'button:has-text("Accept all")',
                ]:
                    btn = page.locator(sel).first
                    if btn.is_visible(timeout=2000):
                        btn.click()
                        time.sleep(2)
                        break
            except Exception as e:
                self.logger.debug(f"Consent button not found or already accepted: {e}")

            # 2. Select Business
            try:
                # Use selector from config
                listing_link = page.locator(MAPS_SELECTORS["listing_link"]).first
                if listing_link.is_visible(timeout=5000):
                    listing_link.click()
                    time.sleep(3)
                page.wait_for_selector("h1", timeout=10000)
            except Exception as e:
                self.logger.warning(
                    f"Failed to find business 'h1' for {search_query}: {e}"
                )
                return

            # 3. Trigger & Extract Reviews (Robust Sync Version)
            reviews = []
            if get_reviews:
                try:
                    self.logger.info(f"   Deep Review Extraction: Target {max_reviews}")
                    trigger = page.locator(MAPS_SELECTORS["reviews_btn"]).first
                    if trigger.is_visible():
                        trigger.click()
                        time.sleep(2)

                        # Wait for reviews container
                        scroller_selectors = [
                            "div[role='main']",
                            "div.m67q60",
                            "div.dS8AEf",
                            "div.fontBodyMedium",
                        ]
                        scroller_sel = None
                        for sel in scroller_selectors:
                            try:
                                if page.locator(sel).first.is_visible(timeout=3000):
                                    scroller_sel = sel
                                    break
                            except Exception:
                                continue

                        if not scroller_sel:
                            self.logger.warning(
                                "   Could not identify review scroller. Attempting global scroll."
                            )
                            scroller_sel = "body"

                        # Scroll to load
                        last_count = 0
                        for _ in range(15):
                            page.evaluate(
                                f"document.querySelector('{scroller_sel}').scrollBy(0, 5000)"
                            )
                            time.sleep(1.5)

                            # Expand "More" buttons during scroll to trigger content loading
                            page.evaluate(
                                "document.querySelectorAll('button[aria-label*=\"See more\"]').forEach(b => b.click())"
                            )

                            current_count = page.locator(
                                MAPS_SELECTORS["review_container"]
                            ).count()
                            if (
                                current_count >= max_reviews
                                or current_count == last_count
                            ):
                                break
                            last_count = current_count

                        # Parse
                        containers = page.locator(
                            MAPS_SELECTORS["review_container"]
                        ).all()
                        for i in range(min(len(containers), max_reviews)):
                            c = containers[i]
                            try:
                                author = c.locator(
                                    MAPS_SELECTORS["review_reviewer"]
                                ).first.inner_text()
                                # Try multiple text selectors for the review body
                                text_selectors = MAPS_SELECTORS["review_text"].split(
                                    ", "
                                )
                                text = ""
                                for t_sel in text_selectors:
                                    try:
                                        found_text = c.locator(t_sel).first.inner_text()
                                        if found_text:
                                            text = found_text
                                            break
                                    except Exception:
                                        continue

                                rating_attr = c.locator(
                                    MAPS_SELECTORS["review_rating"]
                                ).first.get_attribute("aria-label")
                                rating = rating_attr.split()[0] if rating_attr else "0"

                                if author and text:
                                    reviews.append(
                                        {
                                            "author": author.strip(),
                                            "rating": rating,
                                            "text": text.strip(),
                                        }
                                    )
                            except Exception as e:
                                self.logger.debug(f"Failed to parse a review item: {e}")
                                continue
                        self.logger.info(
                            f"   Success: {len(reviews)} reviews captured."
                        )
                except Exception as e:
                    self.logger.warning(f"   Review extraction failed: {e}")

            # 4. Final Metadata
            nonlocal extracted_data
            extracted_data = page.evaluate(f'''() => {{
                const name = document.querySelector('h1')?.innerText;
                const rating = document.querySelector('span[aria-label*="stars"]')?.getAttribute('aria-label');
                const cat = document.querySelector('.DkEaL')?.innerText;
                const addr = document.querySelector("{MAPS_SELECTORS["address_field"]}")?.getAttribute('aria-label');
                const ph = document.querySelector("{MAPS_SELECTORS["phone_field"]}")?.getAttribute('aria-label');
                const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
                return {{ name, rating, category: cat, address: addr, phone: ph, links }};
            }}''')
            extracted_data["reviews"] = reviews
            return

        # Fetch with action
        self.fetcher.fetch(
            search_url,
            headless=self.headless,
            page_action=extract_action,
            wait=SCRAPE_SETTINGS["default_timeout"],
        )

        if not extracted_data:
            raise ValueError(f"No data extracted for {search_query}")

        # Post-process links
        socials = {
            "facebook": "",
            "instagram": "",
            "linkedin": "",
            "twitter": "",
            "youtube": "",
            "tiktok": "",
        }
        website = ""
        for h in extracted_data.get("links", []):
            h = h.lower()
            if not h or "google" in h:
                continue
            if any(p in h for p in ["tel:", "mailto:", "javascript:", "callto:"]):
                continue
            found = False
            for p in socials.keys():
                if p in h:
                    if not socials[p]:
                        socials[p] = h
                    found = True
                    break
            if not found and not website:
                website = h

        return {
            "name": extracted_data.get("name", "Unknown"),
            "rating": extracted_data.get("rating", "N/A"),
            "category": extracted_data.get("category", ""),
            "website": website,
            "social_links": socials,
            "address": (extracted_data.get("address") or "").replace("Address: ", ""),
            "phone": (extracted_data.get("phone") or "").replace("Phone: ", ""),
            "reviews": extracted_data.get("reviews", []),
            "url": search_url,
        }


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-extract", type=str)
    args = parser.parse_args()
    if args.test_extract:
        extractor = GoogleMapsDetails(headless=True)
        print(json.dumps(extractor.extract(args.test_extract), indent=2))

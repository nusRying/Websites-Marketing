import time
import argparse
import logging
from typing import List, Dict
from src.scrapers.engine import ScraperEngine
from src.config import MAPS_SELECTORS, SCRAPE_SETTINGS

class GoogleMapsScraper:
    """
    Scraper for Google Maps business discovery.
    Identifies leads without websites.
    """

    def __init__(self, engine: ScraperEngine):
        self.engine = engine
        self.logger = logging.getLogger(__name__)

    def search(self, query: str, location: str, max_results: int = 20) -> List[Dict]:
        """
        Searches Google Maps for a query in a location and returns leads.
        """
        full_query = f"{query} in {location}" if location else query
        search_url = f"https://www.google.com/maps/search/{urllib.parse.quote(full_query)}" if 'urllib' in globals() else f"https://www.google.com/maps/search/{full_query.replace(' ', '+')}"
        
        # Ensure urllib.parse is available if we use it, or just use replace
        import urllib.parse
        search_url = f"https://www.google.com/maps/search/{urllib.parse.quote(full_query)}"

        self.logger.info(f"Searching Google Maps for: {full_query}")

        def scroll_action(page):
            feed_selector = MAPS_SELECTORS["feed_container"]
            try:
                page.wait_for_selector(feed_selector, timeout=10000)
            except Exception as e:
                self.logger.warning(f"Feed container not found: {e}")
                return

            results_count = 0
            retries = 0
            while results_count < max_results and retries < 3:
                # Scroll down the feed
                page.evaluate(f'document.querySelector("{feed_selector}").scrollBy(0, 2000)')
                time.sleep(2)
                
                # Count current listings
                items = page.query_selector_all(MAPS_SELECTORS["listing_link"])
                new_count = len(items)
                
                if new_count == results_count:
                    retries += 1
                else:
                    results_count = new_count
                    retries = 0
                
                # Check for "end of list"
                if "reached the end of the list" in page.content().lower():
                    break
            
            self.logger.info(f"Discovered {results_count} listings in search feed.")

        response = self.engine.fetch(search_url, page_action=scroll_action, wait=SCRAPE_SETTINGS["default_timeout"])
        
        # Parse the results
        leads = []
        all_links = response.css(MAPS_SELECTORS["listing_link"])[:max_results]
        self.logger.info(f"Parsing {len(all_links)} results from response...")

        social_media_domains = ['facebook.com', 'instagram.com', 'linkedin.com', 'twitter.com', 'x.com', 'youtube.com', 'tiktok.com', 'yelp.com']

        for link in all_links:
            name = link.attrib.get('aria-label', 'Unknown')
            url = link.attrib.get('href', '')
            
            # Find the container for this specific listing to check for a website link
            # We use a combined selector for common container classes
            container_xpath = 'ancestor::div[contains(@class, "Nv2Ybe") or contains(@role, "article") or contains(@class, "m67q60") or contains(@class, "Cp600")][1]'
            containers = link.xpath(container_xpath)
            
            has_website = False
            if containers:
                best_container = containers[0]
                sub_links = best_container.css('a')
                for sub_link in sub_links:
                    sub_href = sub_link.attrib.get('href', '').lower()
                    sub_aria = sub_link.attrib.get('aria-label', '').lower()
                    sub_data = sub_link.attrib.get('data-value', '').lower()
                    
                    # Logic: If it mentions 'website' or is a non-social external link
                    if 'website' in sub_aria or sub_data == 'website':
                        if not any(domain in sub_href for domain in social_media_domains):
                            has_website = True
                            break
                    
                    if sub_href and 'google.com/maps' not in sub_href and sub_href != url and not sub_href.startswith('/'):
                        if not any(domain in sub_href for domain in social_media_domains):
                            has_website = True
                            break
            
            leads.append({
                'name': name,
                'url': url,
                'has_website': has_website
            })

        return leads

    def filter_no_website(self, leads: List[Dict]) -> List[Dict]:
        """
        Filter out leads that have a website.
        """
        return [lead for lead in leads if not lead.get('has_website')]

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-search", type=str, help="Niche and location to search")
    parser.add_argument("--filter-no-website", action="store_true", help="Filter leads")
    args = parser.parse_args()

    if args.test_search:
        engine = ScraperEngine(headless=True)
        scraper = GoogleMapsScraper(engine)
        
        niche = args.test_search
        location = ""
        if ' in ' in args.test_search:
            niche, location = args.test_search.split(' in ', 1)

        results = scraper.search(niche, location)
        
        if args.filter_no_website:
            filtered = scraper.filter_no_website(results)
            print(f"Found {len(filtered)} leads without websites.")
            for lead in filtered:
                print(f"- {lead['name']}: {lead['url']}")
        else:
            for lead in results:
                status = "No Website" if not lead['has_website'] else "Has Website"
                print(f"- {lead['name']} ({status})")

import time
import argparse
from typing import List, Dict
try:
    from engine import ScraperEngine
except ImportError:
    from src.scrapers.engine import ScraperEngine

class GoogleMapsScraper:
    """
    Scraper for Google Maps business discovery.
    Identifies leads without websites.
    """

    def __init__(self, engine: ScraperEngine):
        self.engine = engine

    def search(self, query: str, location: str, max_results: int = 20) -> List[Dict]:
        """
        Searches Google Maps for a query in a location and returns leads.
        """
        full_query = f"{query} in {location}"
        search_url = f"https://www.google.com/maps/search/{full_query.replace(' ', '+')}"
        
        print(f"Searching for: {full_query}")

        def scroll_action(page):
            # Using single quotes for the selector inside double quotes
            feed_selector = "div[role='feed']"
            try:
                page.wait_for_selector(feed_selector, timeout=10000)
            except:
                # Might be a different layout or single result
                return

            results_count = 0
            retries = 0
            while results_count < max_results and retries < 3:
                # Scroll down
                page.evaluate(f'document.querySelector("{feed_selector}").scrollBy(0, 2000)')
                time.sleep(2)
                
                # Current count of items
                # hfpxzc is the class for the main link of each listing
                items = page.query_selector_all('a.hfpxzc')
                new_count = len(items)
                
                if new_count == results_count:
                    retries += 1
                else:
                    results_count = new_count
                    retries = 0
                
                if "reached the end of the list" in page.content():
                    break
            
            print(f"Discovered {results_count} listings in feed.")

        response = self.engine.fetch(search_url, page_action=scroll_action, wait=3000)
        
        # Parse the results
        leads = []
        # Each listing is usually inside a div that contains the hfpxzc link
        # and potentially a website button.
        
        # Let's find all listing containers.
        # Typically they are divs with class like 'Nv2Ybe' or similar, but class names change.
        # hfpxzc link is reliable.
        
        listings = response.css('div.Nv2Ybe, div.Ua7Kbe, div.m67q60') 
        # If classes failed, fallback to finding containers of a.hfpxzc
        if not listings:
            # Try to find parents of hfpxzc
            # Scrapling Selector doesn't have a good way to get parent easily in CSS
            # but we can try to find all 'a.hfpxzc' and then use xpath or similar.
            pass

        # Let's just use the links and their surrounding context if possible.
        # Or better, iterate over all hfpxzc links and check their siblings/parents.
        
        # Scrapling Response object is a Selector.
        # We can find all elements that look like a listing.
        
        # Standard Google Maps Result Container often has [role="article"] or just inside the feed
        all_links = response.css('a.hfpxzc')
        print(f"Parsing {len(all_links)} links...")
        for link in all_links:
            name = link.attrib.get('aria-label', 'Unknown')
            url = link.attrib.get('href', '')
            
            # To check for website, we look for a sibling link that has 'website' in its aria-label or href.
            # Use a more precise container finding: find the closest ancestor div that contains the link
            # NV2Ybe, Ua7Kbe, m67q60 are common, but let's be more generic.
            containers = link.xpath('ancestor::div[contains(@class, "Nv2Ybe") or contains(@role, "article") or contains(@class, "m67q60") or contains(@class, "Cp600")][1]')
            
            has_website = False
            if containers:
                best_container = containers[0]
                # Look for 'a' tags that could be a website
                all_sub_links = best_container.css('a')
                for sub_link in all_sub_links:
                    sub_href = sub_link.attrib.get('href', '')
                    sub_aria = sub_link.attrib.get('aria-label', '').lower()
                    sub_data_value = sub_link.attrib.get('data-value', '').lower()
                    
                    if 'website' in sub_aria or sub_data_value == 'website':
                        has_website = True
                        break
                    
                    # If it's an external link and not the main listing link
                    if sub_href and 'google.com/maps' not in sub_href and sub_href != url and not sub_href.startswith('/'):
                        # This is likely a website link
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
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-search", type=str, help="Niche and location to search")
    parser.add_argument("--filter-no-website", action="store_true", help="Filter leads without websites")
    args = parser.parse_args()

    if args.test_search:
        engine = ScraperEngine(headless=True)
        scraper = GoogleMapsScraper(engine)
        
        # Split test-search if it contains 'in'
        if ' in ' in args.test_search:
            niche, location = args.test_search.split(' in ', 1)
        else:
            niche = args.test_search
            location = ""

        results = scraper.search(niche, location)
        print(f"Found {len(results)} total results.")
        
        if args.filter_no_website:
            filtered = scraper.filter_no_website(results)
            print(f"Found {len(filtered)} results without website.")
            for lead in filtered:
                print(f"- {lead['name']}: {lead['url']}")
        else:
            for lead in results:
                status = "No Website" if not lead['has_website'] else "Has Website"
                print(f"- {lead['name']} ({status})")

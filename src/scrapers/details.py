import time
import argparse
import json
from typing import List, Dict, Optional
from scrapling import StealthyFetcher

class GoogleMapsDetails:
    """
    Scraper for extracting detailed information from a Google Maps listing URL.
    """

    def __init__(self, headless: bool = True):
        self.fetcher = StealthyFetcher()
        self.headless = headless

    def extract(self, listing_url: str) -> Dict:
        """
        Extract details for a single listing URL.
        """
        print(f"Extracting details from: {listing_url}")
        
        # Define an extraction action to ensure page is loaded and data is visible
        def extract_action(page):
            # Wait for any business-related content to load
            # DUH3nd is one of the common classes for the container
            try:
                page.wait_for_selector('h1.DUH3nd, div.TIH4Yd', timeout=10000)
            except:
                # If it fails, maybe it's just slow or different layout
                pass
            
            # Sometimes we need to click "About" or "Reviews" but most details are in the main view
            return

        response = self.fetcher.fetch(
            listing_url, 
            headless=self.headless, 
            page_action=extract_action,
            wait=3000,
            network_idle=True
        )

        # 1. Name - Usually in h1 with class DUH3nd
        name = response.css('h1.DUH3nd::text').get() or response.xpath('//h1/text()').get() or "Unknown"

        # 1.5 Website - Look for website button/link
        website = ""
        website_elem = response.css('a[aria-label*="Website"], button[aria-label*="Website"], a[data-tooltip*="website"]')
        if website_elem:
            website = website_elem[0].attrib.get('href', '')
            # If it's a button or doesn't have href, we might need more logic, 
            # but usually it's an 'a' tag.
        
        if not website:
            # Fallback to look for links that aren't maps links
            all_links = response.css('a')
            for link in all_links:
                href = link.attrib.get('href', '')
                if href and 'google.com/maps' not in href and not href.startswith('/') and 'google.com' not in href:
                    website = href
                    break

        # 2. Address - Look for buttons/divs with aria-label starting with "Address:"
        address = ""
        address_elems = response.css('button[aria-label*="Address:"], div[aria-label*="Address:"]')
        if address_elems:
            address = address_elems[0].attrib.get('aria-label', '').replace('Address: ', '')
        else:
            # Fallback to specific classes
            address = response.css('div.Io6YTe.fontBodyMedium.kR99db::text').get() or ""

        # 3. Phone - Look for buttons/divs with aria-label starting with "Phone:"
        phone = ""
        phone_elems = response.css('button[aria-label*="Phone:"], div[aria-label*="Phone:"]')
        if phone_elems:
            phone = phone_elems[0].attrib.get('aria-label', '').replace('Phone: ', '')
        else:
            # Fallback to searching for phone-like patterns or specific classes
            # Phone often appears in the same class as address
            potential_phones = response.css('div.Io6YTe.fontBodyMedium.kR99db::text').getall()
            for p in potential_phones:
                if any(c.isdigit() for c in p) and len(p) > 5:
                    # Very basic check: if it's not the address, it might be the phone
                    if p != address:
                        phone = p
                        break

        # 4. Reviews - Capture text of the last 3-5 reviews
        reviews = []
        # Reviews are usually in div.wiU7W
        review_elements = response.css('div.wiU7W')
        for review in review_elements[:5]:
            text = review.css('span.wiU7W::text').get() or review.xpath('.//span/text()').get()
            if text:
                reviews.append(text.strip())

        return {
            "name": name.strip() if name else "Unknown",
            "website": website,
            "address": address.strip() if address else "Not found",
            "phone": phone.strip() if phone else "Not found",
            "reviews": reviews,
            "url": listing_url
        }

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--test-extract", type=str, help="Listing URL to extract from")
    args = parser.parse_args()

    if args.test_extract:
        extractor = GoogleMapsDetails(headless=True)
        data = extractor.extract(args.test_extract)
        print(json.dumps(data, indent=2))

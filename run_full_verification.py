import os
import json
from src.scrapers.engine import ScraperEngine
from src.scrapers.google_maps import GoogleMapsScraper
from src.scrapers.details import GoogleMapsDetails
from src.scrapers.export import ExcelExporter

def run_verification():
    print("--- Starting Verification Run ---")
    
    # 1. Initialize components
    engine = ScraperEngine(headless=True)
    discovery = GoogleMapsScraper(engine)
    detail_extractor = GoogleMapsDetails(headless=True)
    exporter = ExcelExporter()

    # 2. Search for leads
    # Using a niche/location that's likely to have results
    niche = "Hand Car Wash"
    location = "Leeds, UK"
    print(f"Searching for {niche} in {location}...")
    
    leads = discovery.search(niche, location, max_results=10)
    print(f"Total leads found: {len(leads)}")
    
    # 3. Filter no-website leads
    no_website_leads = discovery.filter_no_website(leads)
    print(f"Leads without websites: {len(no_website_leads)}")
    
    if not no_website_leads:
        print("No leads without websites found. Using a few from total for detail extraction test.")
        test_leads = leads[:2]
    else:
        test_leads = no_website_leads[:3] # Test with up to 3 leads

    # 4. Extract details and perform second-pass verification
    enriched_leads = []
    social_media_domains = ['facebook.com', 'instagram.com', 'linkedin.com', 'twitter.com', 'x.com', 'youtube.com', 'tiktok.com', 'yelp.com']
    
    for lead in test_leads:
        print(f"Processing: {lead['name']}")
        details = detail_extractor.extract(lead['url'])
        
        # Second-pass website verification
        website = details.get('website', '')
        is_real_website = False
        if website:
            is_social = any(domain in website.lower() for domain in social_media_domains)
            if not is_social:
                is_real_website = True
        
        if is_real_website:
            print(f"  -> DROPPED: Real website found during second pass: {website}")
            continue
        
        print(f"  -> KEEPING: No real website found (Website field: {website or 'None'})")
        print(f"  -> Reviews captured: {len(details['reviews'])}")
        for i, r in enumerate(details['reviews'][:2]):
            print(f"     Review {i+1}: {r[:50]}...")
        enriched_leads.append(details)

    # 5. Export to Excel
    if enriched_leads:
        export_path = exporter.save(enriched_leads, "verification_run")
        print(f"Verification complete. Export saved to: {export_path}")
        
        # Verify file existence
        if os.path.exists(export_path):
            print("SUCCESS: Excel file generated.")
        else:
            print("FAILURE: Excel file not found.")
    else:
        print("No leads to export.")

    print("--- Verification Run Finished ---")

if __name__ == "__main__":
    # Ensure PYTHONPATH is set if running manually
    run_verification()

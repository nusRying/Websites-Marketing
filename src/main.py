import argparse
import time
import logging
import sys
from src.scrapers.engine import ScraperEngine
from src.scrapers.google_maps import GoogleMapsScraper
from src.scrapers.details import GoogleMapsDetails
from src.scrapers.discovery import DiscoveryEngine
from src.scrapers.export import ExcelExporter
from src.config import SCRAPE_SETTINGS

def setup_logging(level=logging.INFO):
    """Configures logging for the entire application."""
    logging.basicConfig(
        level=level,
        format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler("scraper.log")
        ]
    )

def main():
    parser = argparse.ArgumentParser(description="Expert Lead Generation Engine")
    parser.add_argument("--niche", type=str, required=True, help="Business niche (e.g., 'Plumbers')")
    parser.add_argument("--location", type=str, required=True, help="Target location (e.g., 'London')")
    parser.add_argument("--max-results", type=int, default=10, help="Max results to fetch")
    parser.add_argument("--headless", action="store_true", default=True, help="Run browser in headless mode")
    parser.add_argument("--debug", action="store_true", help="Enable debug logging")
    args = parser.parse_args()

    # 1. Setup Logging
    log_level = logging.DEBUG if args.debug else logging.INFO
    setup_logging(level=log_level)
    logger = logging.getLogger("Main")

    logger.info(f"--- Starting Lead Generation: {args.niche} in {args.location} ---")
    
    # 2. Initialize Engines
    try:
        engine = ScraperEngine(headless=args.headless)
        search_scraper = GoogleMapsScraper(engine)
        details_extractor = GoogleMapsDetails(headless=args.headless)
        discovery_engine = DiscoveryEngine(headless=args.headless)
        logger.info("Engines initialized successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize engines: {e}")
        return

    # 3. Search & Filter
    logger.info(f"Searching for listings for query: {args.niche} in {args.location}")
    all_leads = search_scraper.search(args.niche, args.location, max_results=args.max_results)
    no_website_leads = search_scraper.filter_no_website(all_leads)
    
    logger.info(f"Found {len(all_leads)} total listings. {len(no_website_leads)} identified as leads without websites.")
    
    if not no_website_leads:
        logger.warning("No qualified leads found. Exiting.")
        return

    # 4. Deep Extraction & Discovery
    enriched_leads = []
    social_media_domains = ['facebook.com', 'instagram.com', 'linkedin.com', 'twitter.com', 'x.com', 'youtube.com', 'tiktok.com', 'yelp.com']
    
    logger.info(f"Starting deep enrichment for {len(no_website_leads)} leads...")
    for i, lead in enumerate(no_website_leads):
        logger.info(f"[{i+1}/{len(no_website_leads)}] Processing Details: {lead['name']}")
        try:
            # Get detailed info (retries handled by decorator in details.py)
            details = details_extractor.extract(lead['url'])
            
            # Additional validation: Ensure we don't pick up leads that actually have websites
            website = details.get('website', '').lower()
            is_social = any(domain in website for domain in social_media_domains) if website else False
            
            if not website or is_social:
                # 5. DISCOVERY: Find Email via Social Media
                socials = details.get('social_links', {})
                email = None
                
                if socials.get('facebook'):
                    logger.debug(f"   Searching Facebook: {socials['facebook']}")
                    email = discovery_engine.find_email_on_facebook(socials['facebook'])
                
                if not email and socials.get('instagram'):
                    logger.debug(f"   Searching Instagram: {socials['instagram']}")
                    email = discovery_engine.find_email_on_instagram(socials['instagram'])
                
                details['email'] = email if email else "Not found"
                if email:
                    logger.info(f"   Found Email: {email}")
                else:
                    logger.debug(f"   No email found for {lead['name']}")
                
                enriched_leads.append(details)
            else:
                logger.info(f"   Skipping: Website detected during enrichment ({details['website']})")
                
        except Exception as e:
            logger.error(f"   Failed to process {lead['name']}: {e}")
        
        # Polite delay
        time.sleep(SCRAPE_SETTINGS.get("request_delay", 2))

    # 6. Export
    if enriched_leads:
        try:
            exporter = ExcelExporter()
            filename_clean = f"{args.niche.replace(' ', '_')}_{args.location.replace(' ', '_')}"
            filepath = exporter.save(enriched_leads, filename_prefix=filename_clean)
            logger.info(f"SUCCESS: Exported {len(enriched_leads)} leads to: {filepath}")
        except Exception as e:
            logger.error(f"Failed to export results: {e}")
    else:
        logger.warning("No enriched leads found to export.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nProcess interrupted by user. Exiting.")
        sys.exit(0)

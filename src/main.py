import argparse
import time
import logging
import sys
import os
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
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler("scraper.log"),
        ],
    )


def main():
    parser = argparse.ArgumentParser(description="Expert Lead Generation Engine")
    parser.add_argument(
        "--niche", type=str, required=True, help="Business niche (e.g., 'Plumbers')"
    )
    parser.add_argument(
        "--location", type=str, required=True, help="Target location (e.g., 'London')"
    )
    parser.add_argument(
        "--max-results", type=int, default=10, help="Max results to fetch"
    )
    parser.add_argument(
        "--headless",
        action="store_true",
        default=True,
        help="Run browser in headless mode",
    )
    parser.add_argument(
        "--get-reviews", action="store_true", help="Extract all reviews for leads"
    )
    parser.add_argument(
        "--max-reviews", type=int, default=20, help="Max reviews per lead"
    )
    parser.add_argument("--output", type=str, help="Specify output filename (optional)")
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
    logger.info(f"Searching for listings: {args.niche} in {args.location}")
    all_leads = search_scraper.search(
        args.niche, args.location, max_results=args.max_results
    )
    logger.info(f"Discovered {len(all_leads)} potential leads.")

    if not all_leads:
        logger.warning("No listings found. Exiting.")
        return

    # 4. Deep Extraction & Discovery
    final_data = []
    social_media_domains = [
        "facebook.com",
        "instagram.com",
        "linkedin.com",
        "twitter.com",
        "x.com",
        "youtube.com",
        "tiktok.com",
        "yelp.com",
    ]

    logger.info("Filtering and enriching leads...")
    for i, lead in enumerate(all_leads):
        logger.info(f"[{i + 1}/{len(all_leads)}] Analyzing: {lead['name']}")

        # Check if we need deep enrichment (no website or social media domain)
        website = lead.get("website", "").lower()
        is_social = (
            any(domain in website for domain in social_media_domains)
            if website
            else False
        )
        needs_enrichment = not website or is_social

        if needs_enrichment:
            logger.info("   -> No website detected. Starting deep scan...")
            try:
                # Get detailed info
                details = details_extractor.extract(
                    lead["url"],
                    get_reviews=args.get_reviews,
                    max_reviews=args.max_reviews,
                )

                # Double-check website from details
                detail_website = details.get("website", "").lower()
                detail_is_social = (
                    any(domain in detail_website for domain in social_media_domains)
                    if detail_website
                    else False
                )

                if not detail_website or detail_is_social:
                    # 5. DISCOVERY: Find Email via Social Media
                    socials = details.get("social_links", {})
                    email = None

                    if socials.get("facebook"):
                        email = discovery_engine.find_email_on_facebook(
                            socials["facebook"]
                        )

                    if not email and socials.get("instagram"):
                        email = discovery_engine.find_email_on_instagram(
                            socials["instagram"]
                        )

                    details["email"] = email if email else "Not found"
                    if email:
                        logger.info(f"   Success: Email found -> {email}")

                    # Merge and append
                    merged_lead = {**lead, **details}
                    final_data.append(merged_lead)
                else:
                    logger.info(
                        f"   Skipped: Website found in second pass ({detail_website})"
                    )
            except Exception as e:
                logger.error(f"   Extraction failed for {lead['name']}: {e}")
                final_data.append(lead)
        else:
            logger.info("   -> Website already exists. Skipping.")

        # Delay to avoid detection during heavy enrichment
        if needs_enrichment:
            time.sleep(SCRAPE_SETTINGS.get("request_delay", 2))

    # 6. Export
    if final_data:
        try:
            exporter = ExcelExporter()
            if args.output:
                # Strip directory and extension if provided, as Exporter handles them
                base_name = os.path.basename(args.output).replace(".xlsx", "")
                filepath = exporter.save(final_data, filename_prefix=base_name)
            else:
                filename_clean = f"{args.niche.replace(' ', '_')}_{args.location.replace(' ', '_')}_MASTER"
                filepath = exporter.save(final_data, filename_prefix=filename_clean)

            logger.info(f"SUCCESS: Exported {len(final_data)} leads to: {filepath}")
        except Exception as e:
            logger.error(f"Failed to export results: {e}")
    else:
        logger.warning("No qualified leads found to export.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nProcess interrupted by user. Exiting.")
        sys.exit(0)

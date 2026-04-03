import logging
import asyncio
from typing import List, Dict, Any
from src.scrapers.base import BaseScraper
from src.config import MAPS_SELECTORS

logger = logging.getLogger(__name__)


class ReviewsScraper(BaseScraper):
    """
    Scraper for extracting full reviews from a Google Maps lead.
    """

    async def get_reviews(
        self, page: Any, max_reviews: int = 50
    ) -> List[Dict[str, Any]]:
        """
        Navigates to the reviews tab and extracts reviews by scrolling.
        """
        reviews = []
        try:
            # 1. Click on the Reviews tab
            reviews_btn_sel = MAPS_SELECTORS["reviews_btn"]
            await page.wait_for_selector(reviews_btn_sel, timeout=5000)
            await page.click(reviews_btn_sel)
            logger.info("Clicked on Reviews tab.")

            # Wait for the reviews panel to load
            scroller_sel = MAPS_SELECTORS["review_scroller"]
            await page.wait_for_selector(scroller_sel, timeout=5000)

            # 2. Scroll-to-load loop
            last_height = 0
            retries = 0
            while len(reviews) < max_reviews and retries < 5:
                # Scroll the container
                await page.evaluate(
                    """
                    (selector) => {
                        const el = document.querySelector(selector);
                        if (el) el.scrollTop = el.scrollHeight;
                    }
                """,
                    scroller_sel,
                )

                await asyncio.sleep(2)  # Wait for load

                # Check for "More" buttons for long reviews and click them
                more_btns = await page.query_selector_all(
                    MAPS_SELECTORS["review_more_btn"]
                )
                for btn in more_btns:
                    try:
                        await btn.click()
                    except Exception:
                        pass

                # Extract current batch of reviews
                current_reviews = await self._parse_reviews(page)

                # Update total reviews list (deduplicate by text/reviewer if possible)
                # For simplicity, we'll just track the count and re-parse
                reviews = current_reviews

                # Check if height changed to detect end of list
                current_height = await page.evaluate(
                    f"document.querySelector('{scroller_sel}').scrollHeight"
                )
                if current_height == last_height:
                    retries += 1
                else:
                    retries = 0
                    last_height = current_height

                logger.info(f"Loaded {len(reviews)} reviews...")

            return reviews[:max_reviews]

        except Exception as e:
            logger.error(f"Error extracting reviews: {e}")
            return reviews

    async def _parse_reviews(self, page: Any) -> List[Dict[str, Any]]:
        """
        Parses the visible reviews in the DOM.
        """
        reviews_data = []
        containers = await page.query_selector_all(MAPS_SELECTORS["review_container"])

        for container in containers:
            try:
                # Extract details using selectors from config
                reviewer_el = await container.query_selector(
                    MAPS_SELECTORS["review_reviewer"]
                )
                rating_el = await container.query_selector(
                    MAPS_SELECTORS["review_rating"]
                )
                text_el = await container.query_selector(MAPS_SELECTORS["review_text"])
                time_el = await container.query_selector(MAPS_SELECTORS["review_time"])

                reviewer = await reviewer_el.inner_text() if reviewer_el else "Unknown"
                rating_text = (
                    await rating_el.get_attribute("aria-label")
                    if rating_el
                    else "0 stars"
                )
                # rating_text is like "5 stars"
                rating = rating_text.split()[0] if rating_text else "0"

                text = await text_el.inner_text() if text_el else ""
                time_str = await time_el.inner_text() if time_el else ""

                reviews_data.append(
                    {
                        "reviewer": reviewer.strip(),
                        "rating": rating,
                        "text": text.strip(),
                        "time": time_str.strip(),
                    }
                )
            except Exception as e:
                logger.debug(f"Skipping a review container due to parse error: {e}")
                continue

        return reviews_data

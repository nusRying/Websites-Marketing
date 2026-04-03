import time
import random
import logging
from scrapling import StealthyFetcher
from tenacity import retry, stop_after_attempt, wait_exponential
from src.config import SCRAPE_SETTINGS


class ScraperEngine:
    """
    Base scraper engine using Scrapling (v0.4.1) StealthyFetcher
    for stealthy web browsing with automation support.
    """

    def __init__(self, headless: bool = True, proxy: str = None):
        self.headless = headless
        self.proxy = proxy
        self.logger = logging.getLogger(__name__)

        # Initialize fetcher with optional proxy
        fetcher_kwargs = {
            "headless": headless,
            "disable_resources": False,
            "user_agent": SCRAPE_SETTINGS.get("user_agent"),
        }
        if proxy:
            fetcher_kwargs["proxy"] = proxy

        self.fetcher = StealthyFetcher(**fetcher_kwargs)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        reraise=True,
    )
    def fetch(self, url: str, page_action=None, wait: int = 0):
        """
        Fetches a URL and returns a ScraperResponse with retry logic.
        """
        # Apply a small randomized delay before each fetch for stealth
        delay = random.uniform(1.5, 4.0)
        time.sleep(delay)

        self.logger.info(f"Fetching (Wait: {delay:.1f}s): {url}")

        try:
            if page_action:
                self.logger.debug("Executing custom page action.")
                response = self.fetcher.fetch(url, page_action=page_action)
            else:
                response = self.fetcher.fetch(url)

            # Additional explicit wait if requested
            if wait > 0:
                time.sleep(wait / 1000)

            return response
        except Exception as e:
            self.logger.error(f"Error fetching {url}: {e}")
            raise

    def close(self):
        """
        Cleanup fetcher resources.
        """
        pass


if __name__ == "__main__":
    # Setup basic logging for the test
    logging.basicConfig(level=logging.INFO)

    # Quick test
    engine = ScraperEngine()
    try:
        response = engine.fetch("https://www.google.com/maps")
        print(f"Status: {response.status}")
        print("Scrapling engine initialized successfully.")
    except Exception as e:
        print(f"Test failed: {e}")

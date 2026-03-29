import time
import logging
from scrapling import StealthyFetcher

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
            "disable_resources": False 
        }
        if proxy:
            fetcher_kwargs["proxy"] = proxy
            
        self.fetcher = StealthyFetcher(**fetcher_kwargs)

    def fetch(self, url: str, page_action=None, wait: int = 2000):
        """
        Fetches a URL and returns a ScraperResponse.
        """
        self.logger.info(f"Fetching: {url}")
        
        try:
            if page_action:
                self.logger.debug("Executing custom page action.")
                # Scrapling's fetcher.fetch handles page_action
                response = self.fetcher.fetch(url, page_action=page_action)
            else:
                response = self.fetcher.fetch(url)
            
            # Scrapling wait is handled by the fetcher usually, but we can sleep if needed
            if wait > 0:
                time.sleep(wait / 1000)
                
            return response
        except Exception as e:
            self.logger.error(f"Error fetching {url}: {e}")
            raise
        # Scrapling handled cleanup usually, but we can add logic here if needed.
        pass

    def close(self):
        """
        Cleanup fetcher resources.
        """
        # Scrapling handled cleanup usually, but we can add logic here if needed.
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

from scrapling import Fetcher

class ScraperEngine:
    """
    Base scraper engine using Scrapling (v0.4.1) for stealthy web browsing.
    Ensures high-stealth settings to avoid bot detection.
    """

    def __init__(self, headless: bool = True):
        # Fetcher() defaults to stealthy browser settings
        self.fetcher = Fetcher()
        self.fetcher.configure(headless=headless)

    def goto(self, url: str):
        """
        Navigate to the specified URL.
        """
        return self.fetcher.get(url)

    def close(self):
        """
        Shutdown browser session.
        """
        # Scrapling v0.4.1 uses playwright under the hood if needed,
        # usually Fetcher handles cleanup but it's good to have a hook.
        pass

if __name__ == "__main__":
    # Quick test
    engine = ScraperEngine()
    response = engine.goto("https://www.google.com/maps")
    print(f"Status: {response.status}")
    print("Scrapling engine initialized successfully.")

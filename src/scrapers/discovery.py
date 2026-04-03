import re
import logging
from typing import Optional
from scrapling import StealthyFetcher
from src.config import DISCOVERY_SETTINGS


class DiscoveryEngine:
    """
    Engine for discovering emails and extra info from social media pages.
    """

    def __init__(self, headless: bool = True):
        self.fetcher = StealthyFetcher()
        self.headless = headless
        self.logger = logging.getLogger(__name__)
        self.email_regex = re.compile(DISCOVERY_SETTINGS["email_regex"])
        self.excluded_domains = DISCOVERY_SETTINGS["excluded_domains"]

    def find_email_on_facebook(self, fb_url: str) -> Optional[str]:
        """
        Visits a Facebook page and attempts to find an email.
        """
        if not fb_url:
            return None

        self.logger.info(f"Checking Facebook for email: {fb_url}")

        # Target the 'about' page for contact info
        target_url = fb_url.rstrip("/") + "/about" if "about" not in fb_url else fb_url

        try:
            response = self.fetcher.fetch(target_url, headless=self.headless, wait=2000)
            content = response.text
            emails = self.email_regex.findall(content)

            # Filter emails
            filtered_emails = [
                e
                for e in emails
                if not any(domain in e.lower() for domain in self.excluded_domains)
                and not e.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".svg"))
            ]

            if filtered_emails:
                email = filtered_emails[0]
                self.logger.info(f"Found email {email} on Facebook")
                return email
        except Exception as e:
            self.logger.warning(f"Facebook discovery failed for {fb_url}: {e}")

        return None

    def find_email_on_instagram(self, ig_url: str) -> Optional[str]:
        """
        Instagram is harder due to login walls, but sometimes visible in bio.
        """
        if not ig_url:
            return None

        self.logger.info(f"Checking Instagram bio for email: {ig_url}")
        try:
            response = self.fetcher.fetch(ig_url, headless=self.headless, wait=2000)
            content = response.text
            emails = self.email_regex.findall(content)

            # Apply same filtering
            filtered_emails = [
                e
                for e in emails
                if not any(domain in e.lower() for domain in self.excluded_domains)
                and not e.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".svg"))
            ]

            if filtered_emails:
                email = filtered_emails[0]
                self.logger.info(f"Found email {email} on Instagram")
                return email
        except Exception as e:
            self.logger.warning(f"Instagram discovery failed for {ig_url}: {e}")

        return None

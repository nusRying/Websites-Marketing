import os
import logging
import time
import urllib.parse
from playwright.sync_api import sync_playwright
from typing import Dict
from supabase import create_client, Client

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("ScreenshotWorker")

class ScreenshotWorker:
    """
    Captures high-quality screenshots of personalized sample websites
    and uploads them to Supabase Storage.
    """

    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url.rstrip("/")
        
        # Supabase Config
        self.supabase_url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        self.supabase: Client = None
        
        if self.supabase_url and self.supabase_key:
            self.supabase = create_client(self.supabase_url, self.supabase_key)
        else:
            logger.warning("Supabase credentials missing. Screenshots will remain local only.")

    def generate_url(self, lead: Dict, template_path: str = "/preview") -> str:
        """
        Constructs the personalized URL for a lead.
        """
        params = {
            "name": lead.get("Name", ""),
            "niche": lead.get("Category", ""),
            "location": lead.get("Address", ""),
            "phone": lead.get("Phone", ""),
            "rating": lead.get("Rating", "5.0")
        }
        
        # Add AI fields if present
        for key, val in lead.items():
            if key.startswith("ai_") and val:
                params[key] = val

        query_string = urllib.parse.urlencode({k: v for k, v in params.items() if v})
        return f"{self.base_url}{template_path}?{query_string}"

    def capture_screenshot(self, url: str, output_path: str, mobile: bool = False) -> bool:
        """
        Navigates to a URL and captures a screenshot.
        """
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            
            if mobile:
                context = browser.new_context(viewport={'width': 390, 'height': 844}, user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1")
            else:
                context = browser.new_context(viewport={'width': 1280, 'height': 800})

            page = context.new_page()
            
            try:
                logger.info(f"Capturing: {url[:60]}...")
                page.goto(url, wait_until="networkidle", timeout=60000)
                time.sleep(3) 
                
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                page.screenshot(path=output_path, full_page=False)
                return True
                
            except Exception as e:
                logger.error(f"Failed to capture screenshot: {e}")
                return False
            finally:
                browser.close()

    def upload_to_supabase(self, local_path: str, storage_path: str) -> str:
        """
        Uploads a local file to Supabase Storage and returns the public URL.
        """
        if not self.supabase:
            return local_path

        try:
            with open(local_path, 'rb') as f:
                # bucket name: 'screenshots'
                self.supabase.storage.from_("screenshots").upload(
                    path=storage_path,
                    file=f,
                    file_options={"content-type": "image/png", "x-upsert": "true"}
                )
            
            # Get public URL
            res = self.supabase.storage.from_("screenshots").get_public_url(storage_path)
            return res
        except Exception as e:
            logger.error(f"Supabase upload failed: {e}")
            return local_path

    def process_lead_list(self, leads: list, output_dir: str, file_prefix: str):
        """
        Processes a list of leads and captures screenshots for each.
        """
        from src.utils import auto_select_template
        
        for i, lead in enumerate(leads):
            name_clean = "".join([c if c.isalnum() else "_" for c in str(lead.get('Name', 'Unknown'))])
            filename = f"{i+1}_{name_clean}.png"
            local_path = os.path.join(output_dir, file_prefix, filename)
            
            template = auto_select_template(lead.get('Category', ''))
            url = self.generate_url(lead, template)
            
            success = self.capture_screenshot(url, local_path)
            if success:
                # Cloud Upload
                storage_path = f"{file_prefix}/{filename}"
                logger.info(f"Uploading to cloud storage: {storage_path}")
                cloud_url = self.upload_to_supabase(local_path, storage_path)
                lead['Screenshot Path'] = cloud_url
                logger.info(f"Proof Ready: {cloud_url}")
            else:
                lead['Screenshot Path'] = "FAILED"

if __name__ == "__main__":
    # Test capture
    worker = ScreenshotWorker()
    test_lead = {"Name": "Test Business", "Category": "Plumber", "Address": "London"}
    worker.capture_screenshot(worker.generate_url(test_lead), "exports/screenshots/test_business.png")

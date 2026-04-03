import requests
import os
import logging
from typing import List, Dict, Optional

# Setup logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger("SmartleadAPI")


class SmartleadAPI:
    """
    Integration layer for Smartlead.ai API v1.
    """

    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("SMARTLEAD_API_KEY")
        self.base_url = "https://app.smartlead.ai/api/v1"

        if not self.api_key:
            logger.warning("SMARTLEAD_API_KEY not found. API calls will be mocked.")

    def add_leads_to_campaign(self, campaign_id: int, leads: List[Dict]) -> Dict:
        """
        Adds multiple leads to a specific Smartlead campaign.
        Leads should be a list of dicts with: email, first_name, last_name, company_name, etc.
        """
        if not self.api_key:
            logger.info(
                f"MOCK API: Adding {len(leads)} leads to campaign {campaign_id}"
            )
            return {"success": True, "message": "Mocked successful add"}

        endpoint = f"{self.base_url}/campaigns/{campaign_id}/leads"
        payload = {"lead_list": leads}

        try:
            response = requests.post(
                endpoint, params={"api_key": self.api_key}, json=payload
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Failed to add leads to Smartlead: {e}")
            return {"success": False, "error": str(e)}

    def update_lead_custom_fields(
        self, campaign_id: int, email: str, custom_fields: Dict
    ) -> Dict:
        """
        Updates custom fields for a specific lead in a campaign.
        Useful for flagging 'has_viewed_site' or updating 'ai_copy'.
        """
        if not self.api_key:
            logger.info(
                f"MOCK API: Updating lead {email} in campaign {campaign_id} with {custom_fields}"
            )
            return {"success": True}

        # Note: Smartlead might require lead_id instead of email for updates in some versions
        # This assumes a search or standard update flow.
        endpoint = f"{self.base_url}/campaigns/{campaign_id}/leads/update"
        payload = {"email": email, "custom_fields": custom_fields}

        try:
            response = requests.post(
                endpoint, params={"api_key": self.api_key}, json=payload
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Failed to update lead in Smartlead: {e}")
            return {"success": False, "error": str(e)}

    def check_lead_status(self, campaign_id: int, email: str) -> Optional[Dict]:
        """
        Checks the status of a lead within a campaign.
        """
        if not self.api_key:
            return {"status": "ACTIVE", "mock": True}

        endpoint = f"{self.base_url}/campaigns/{campaign_id}/leads"

        try:
            response = requests.get(
                endpoint, params={"api_key": self.api_key, "email": email}
            )
            response.raise_for_status()
            leads = response.json()
            return leads[0] if leads else None
        except Exception as e:
            logger.error(f"Failed to check lead status: {e}")
            return None


if __name__ == "__main__":
    # Test
    sl = SmartleadAPI()
    result = sl.add_leads_to_campaign(
        12345, [{"email": "test@example.com", "first_name": "Test"}]
    )
    print(result)

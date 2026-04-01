import pandas as pd
import os
import logging
import urllib.parse
from typing import List, Dict
from datetime import datetime

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("OutreachOrchestrator")

class OutreachOrchestrator:
    """
    Handles data transformation for Smartlead/Instantly outreach campaigns.
    """

    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url.rstrip("/")

    def format_for_outreach(self, leads: List[Dict]) -> pd.DataFrame:
        """
        Transforms internal lead data into outreach-ready format.
        """
        outreach_data = []
        
        # Simple Python version of the template selector (sync with src/utils.py)
        from src.utils import auto_select_template

        for lead in leads:
            # 1. Base Info
            entry = {
                "first_name": self._extract_first_name(lead.get("Name", "there")),
                "company_name": lead.get("Name", "your business"),
                "email": lead.get("Email", ""),
                "phone": lead.get("Phone", ""),
                "location": lead.get("Address", "your local area"),
                "rating": lead.get("Rating", "5.0")
            }

            # 2. Personalized URL
            template = auto_select_template(lead.get("Category", ""))
            entry["sample_site_url"] = self._generate_full_url(lead, template)

            # 3. AI Tokens (Smartlead custom variables)
            # Map ai_hero_title -> custom_hero_title
            for key, val in lead.items():
                if key.startswith("ai_"):
                    smart_key = f"custom_{key.replace('ai_', '')}"
                    entry[smart_key] = val

            # 4. Visual Proof Path
            entry["visual_proof_local"] = lead.get("Screenshot Path", "")
            
            outreach_data.append(entry)

        return pd.DataFrame(outreach_data)

    def _extract_first_name(self, name: str) -> str:
        """
        Attempts to get a first name from a business name (fallback).
        In B2B outreach, if we don't have a person's name, we use 'team' or 'owner'.
        """
        # For now, if it looks like a person's name, we could try, 
        # but usually Google Maps gives business names.
        return "Team"

    def _generate_full_url(self, lead: Dict, template_path: str) -> str:
        """
        Generates the full personalized URL.
        """
        params = {
            "name": lead.get("Name", ""),
            "niche": lead.get("Category", ""),
            "location": lead.get("Address", ""),
            "phone": lead.get("Phone", ""),
            "rating": lead.get("Rating", "5.0")
        }
        
        # Add AI fields
        for key, val in lead.items():
            if key.startswith("ai_") and val:
                params[key] = val

        query_string = urllib.parse.urlencode({k: v for k, v in params.items() if v})
        return f"{self.base_url}{template_path}?{query_string}"

    def save_campaign_file(self, df: pd.DataFrame, output_path: str):
        """
        Saves the outreach data to a CSV file.
        """
        df.to_csv(output_path, index=False)
        logger.info(f"Campaign file saved to: {output_path}")
        return output_path

if __name__ == "__main__":
    # Test Orchestrator
    orchestrator = OutreachOrchestrator()
    mock_leads = [{
        "Name": "Elite Cleaners",
        "Category": "Cleaning",
        "ai_hero_title": "The Best Cleaning in London",
        "Screenshot Path": "exports/screenshots/test.png"
    }]
    df = orchestrator.format_for_outreach(mock_leads)
    orchestrator.save_campaign_file(df, "exports/test_campaign.csv")

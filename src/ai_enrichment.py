import pandas as pd
import json
import os
import argparse
import logging
from typing import List, Dict
from openai import OpenAI
from datetime import datetime
from src.screenshot_worker import ScreenshotWorker
from src.outreach_orchestrator import OutreachOrchestrator
from src.cloud_sync import CloudSync

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("AIEnrichment")

class AIEnrichmentEngine:
    # ... (init and generate_copy kept)

    def process_file(self, input_path: str, output_path: str = None, generate_screenshots: bool = True, user_id: str = None):
        """
        Reads an Excel lead list, generates AI copy, saves results,
        triggers screenshots, and generates outreach campaign file.
        Finally, syncs to cloud if user_id is provided.
        """
        if not os.path.exists(input_path):
            logger.error(f"Input file not found: {input_path}")
            return

        logger.info(f"Loading leads from: {input_path}")
        df = pd.read_excel(input_path)
        
        # Only process leads with "No Website" = "Yes"
        leads_to_process = df[df["No Website"] == "Yes"].to_dict('records')
        logger.info(f"Found {len(leads_to_process)} leads to enrich with AI copy.")

        enriched_leads = []
        for i, lead in enumerate(leads_to_process):
            logger.info(f"[{i+1}/{len(leads_to_process)}] Enriching: {lead.get('Name')}")
            ai_copy = self.generate_copy(lead)
            
            # Merge AI copy into lead data (flattened with 'ai_' prefix)
            for key, val in ai_copy.items():
                lead[f"ai_{key}"] = val
            
            enriched_leads.append(lead)

        # 1. Trigger Screenshots
        if generate_screenshots and enriched_leads:
            logger.info("Triggering Screenshot Worker for enriched leads...")
            worker = ScreenshotWorker()
            file_prefix = os.path.basename(input_path).replace(".xlsx", "")
            worker.process_lead_list(enriched_leads, "exports/screenshots", file_prefix)

        # 2. Save Enriched Excel
        enriched_df = pd.DataFrame(enriched_leads)
        if not output_path:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_path = input_path.replace(".xlsx", f"_AI_ENRICHED_{timestamp}.xlsx")

        enriched_df.to_excel(output_path, index=False)
        logger.info(f"Enriched Excel saved to: {output_path}")

        # 3. Generate Outreach CSV
        if enriched_leads:
            logger.info("Generating Smartlead-ready outreach file...")
            orchestrator = OutreachOrchestrator()
            outreach_df = orchestrator.format_for_outreach(enriched_leads)
            outreach_path = output_path.replace(".xlsx", ".csv")
            orchestrator.save_campaign_file(outreach_df, outreach_path)

        # 4. SaaS CLOUD SYNC
        if user_id and enriched_leads:
            logger.info(f"Triggering Cloud Sync for user: {user_id}")
            syncer = CloudSync()
            syncer.sync_file(output_path, user_id)

        return output_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Lead Enrichment Tool")
    parser.add_argument("--input", type=str, required=True, help="Path to the Excel lead list")
    parser.add_argument("--output", type=str, help="Custom output path")
    parser.add_argument("--api-key", type=str, help="OpenAI API Key")
    parser.add_argument("--user-id", type=str, help="Supabase User ID for cloud sync")
    parser.add_argument("--no-screenshots", action="store_true", help="Disable screenshot generation")
    args = parser.parse_args()

    engine = AIEnrichmentEngine(api_key=args.api_key)
    engine.process_file(args.input, args.output, generate_screenshots=not args.no_screenshots, user_id=args.user_id)

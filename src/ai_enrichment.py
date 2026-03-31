import pandas as pd
import json
import os
import argparse
import logging
from typing import List, Dict
from openai import OpenAI
from datetime import datetime

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("AIEnrichment")

class AIEnrichmentEngine:
    """
    Enriches leads with AI-generated copy (GPT-4o) for sample websites.
    """

    def __init__(self, api_key: str = None):
        # Prefer API key from env or provided argument
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            logger.warning("OPENAI_API_KEY not found in environment. AI features will be limited.")
        
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def generate_copy(self, lead: Dict) -> Dict:
        """
        Generates personalized copy for a single lead using GPT-4o.
        """
        if not self.client:
            return {}

        name = lead.get("Name", "this business")
        niche = lead.get("Category", "Specialist")
        location = lead.get("Address", "your local area")
        reviews = lead.get("Recent Reviews (All)", "")

        prompt = f"""
        You are an expert conversion copywriter for a high-end web design agency.
        Generate personalized website copy for a business called "{name}".
        Niche: {niche}
        Location: {location}
        Recent Reviews to pull insights from: {reviews[:1000]}

        The business currently DOES NOT have a website. Your goal is to show them how a professional site can solve their problems.

        Provide the following fields in JSON format:
        1. hero_title: A punchy, benefit-driven headline (use <span> for emphasis).
        2. hero_subtitle: A supportive sub-headline highlighting trust and location.
        3. pain_point: A specific challenge this business faces (based on their niche/reviews).
        4. solution: How a website solves that specific pain point.
        5. niche_cta: A custom call-to-action button text.

        Keep the tone professional, urgent, and highly local.
        """

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            logger.error(f"AI Generation failed for {name}: {e}")
            return {}

    def process_file(self, input_path: str, output_path: str = None):
        """
        Reads an Excel lead list, generates AI copy, and saves the results.
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

        # Save to new Excel file
        enriched_df = pd.DataFrame(enriched_leads)
        if not output_path:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_path = input_path.replace(".xlsx", f"_AI_ENRICHED_{timestamp}.xlsx")

        enriched_df.to_excel(output_path, index=False)
        logger.info(f"SUCCESS: Enriched leads saved to: {output_path}")
        return output_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Lead Enrichment Tool")
    parser.add_argument("--input", type=str, required=True, help="Path to the Excel lead list")
    parser.add_argument("--output", type=str, help="Custom output path")
    parser.add_argument("--api-key", type=str, help="OpenAI API Key")
    args = parser.parse_args()

    engine = AIEnrichmentEngine(api_key=args.api_key)
    engine.process_file(args.input, args.output)

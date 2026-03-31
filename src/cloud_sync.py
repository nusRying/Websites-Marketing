import os
import pandas as pd
import logging
import json
from typing import List, Dict
from supabase import create_client, Client
from datetime import datetime

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("CloudSync")

class CloudSync:
    """
    Synchronizes local scraper results to Supabase Cloud.
    """

    def __init__(self):
        self.url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        self.key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") # Use Service Role for backend sync
        
        if not self.url or not self.key:
            logger.warning("Supabase credentials missing. Cloud Sync will be skipped.")
            self.client = None
        else:
            self.client: Client = create_client(self.url, self.key)

    def sync_file(self, file_path: str, user_id: str):
        """
        Uploads an enriched Excel file to the leads table.
        """
        if not self.client:
            return None

        if not os.path.exists(file_path):
            logger.error(f"Sync failed: File not found {file_path}")
            return None

        logger.info(f"Syncing data to cloud for user {user_id}...")
        
        try:
            df = pd.read_excel(file_path)
            file_name = os.path.basename(file_path)
            
            # 1. Create a Batch
            batch_data = {
                "user_id": user_id,
                "niche": file_name.split('_')[0],
                "location": file_name.split('_')[1] if '_' in file_name else 'Unknown',
                "file_name": file_name,
                "status": "COMPLETED"
            }
            
            batch_res = self.client.table("batches").insert(batch_data).execute()
            batch_id = batch_res.data[0]['id']
            
            # 2. Prepare Leads
            leads_to_insert = []
            for _, row in df.iterrows():
                # Extract AI Copy (prefix 'ai_')
                ai_copy = {}
                lead_data = row.to_dict()
                for key, val in lead_data.items():
                    if str(key).startswith("ai_") and pd.notna(val):
                        ai_copy[key] = val

                lead_entry = {
                    "user_id": user_id,
                    "batch_id": batch_id,
                    "name": str(lead_data.get("Name", "Unknown")),
                    "email": str(lead_data.get("Email", "")) if pd.notna(lead_data.get("Email")) else None,
                    "phone": str(lead_data.get("Phone", "")) if pd.notna(lead_data.get("Phone")) else None,
                    "address": str(lead_data.get("Address", "")) if pd.notna(lead_data.get("Address")) else None,
                    "rating": str(lead_data.get("Rating", "5.0")),
                    "category": str(lead_data.get("Category", "")),
                    "website": str(lead_data.get("Website", "")) if pd.notna(lead_data.get("Website")) else None,
                    "quality": str(lead_data.get("Lead Quality", "POTENTIAL")),
                    "screenshot_path": str(lead_data.get("Screenshot Path", "")) if pd.notna(lead_data.get("Screenshot Path")) else None,
                    "ai_copy": ai_copy,
                    "status": "NEW"
                }
                leads_to_insert.append(lead_entry)

            # 3. Bulk Insert Leads
            if leads_to_insert:
                # Chunk inserts if list is huge (e.g., > 1000)
                chunk_size = 500
                for i in range(0, len(leads_to_insert), chunk_size):
                    chunk = leads_to_insert[i:i + chunk_size]
                    self.client.table("leads").insert(chunk).execute()
            
            logger.info(f"✅ SUCCESS: Synced {len(leads_to_insert)} leads to cloud batch {batch_id}")
            return batch_id

        except Exception as e:
            logger.error(f"Cloud Sync failed: {e}")
            return None

if __name__ == "__main__":
    # Test sync if env vars are present
    syncer = CloudSync()
    # Replace with a real test user ID from your Supabase Auth if testing manually
    # syncer.sync_file("exports/test_runs/some_file.xlsx", "USER_ID_HERE")

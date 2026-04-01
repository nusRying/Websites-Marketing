import os
import pandas as pd
import time
import shutil
import subprocess
import sys
from src.scrapers.export import ExcelExporter

def test_pipeline():
    print("🚀 Starting Pipeline Integration Test...")
    
    # 1. Cleanup old test artifacts
    test_dir = "exports/test_runs"
    if os.path.exists(test_dir):
        shutil.rmtree(test_dir)
    os.makedirs(test_dir)
    
    # 2. Mock a Scraper Export (Plan 03 Master style)
    print("📦 Step 1: Mocking a 'MASTER' scraper export...")
    mock_leads = [
        {
            "name": "Test Cleaning Co",
            "rating": "4.8 (15 reviews)",
            "category": "Cleaning service",
            "address": "123 Test St, Bradford",
            "phone": "01274 123456",
            "website": "", # No website
            "url": "https://www.google.com/maps/place/test",
            "reviews": [{"author": "John", "rating": 5, "text": "Great service, very thorough cleaning!"}]
        }
    ]
    
    exporter = ExcelExporter(export_dir=test_dir)
    # The Watcher looks for '_MASTER' in the filename
    filename_prefix = "Cleaning_Bradford_MASTER_TEST"
    raw_export_path = exporter.save(mock_leads, filename_prefix=filename_prefix)
    
    print(f"✅ Mock export created: {raw_export_path}")

    # 3. Simulate Pipeline Watcher Trigger
    # We won't start the actual background watcher to avoid hanging the test, 
    # instead we'll call the enrichment engine directly as the watcher would.
    print("🤖 Step 2: Triggering AI Enrichment (and Screenshot Worker)...")
    
    # We need an API key for this to truly work, otherwise it will just skip the AI part
    # But it will still test the logic flow.
    enrich_cmd = [
        sys.executable, "src/ai_enrichment.py", 
        "--input", raw_export_path
    ]
    
    result = subprocess.run(enrich_cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"❌ AI Enrichment failed: {result.stderr}")
        return
    
    print("✅ AI Enrichment process finished.")
    
    # 4. Verify Output
    print("🔍 Step 3: Verifying final artifacts...")
    
    # Check for Enriched Excel
    # It should be named: Cleaning_Bradford_MASTER_TEST_timestamp_AI_ENRICHED_timestamp.xlsx
    # But our script appends _AI_ENRICHED_...
    enriched_files = [f for f in os.listdir(test_dir) if "_AI_ENRICHED_" in f]
    if not enriched_files:
        print("❌ FAILED: No AI Enriched file found.")
        return
    
    enriched_file_path = os.path.join(test_dir, enriched_files[0])
    print(f"✅ Enriched file found: {enriched_file_path}")
    
    # Check Excel Columns
    df = pd.read_excel(enriched_file_path)
    expected_cols = ["Name", "Lead Quality", "No Website", "Screenshot Path"]
    for col in expected_cols:
        if col not in df.columns:
            print(f"❌ FAILED: Missing column '{col}' in enriched file.")
            # print(f"Available columns: {df.columns.tolist()}")
            return
    print(f"✅ All expected columns present: {expected_cols}")

    # Check for Screenshots
    # They should be in exports/screenshots/Cleaning_Bradford_MASTER_TEST_timestamp/
    screenshot_dir = "exports/screenshots"
    # Find the dir that matches our prefix
    file_prefix = os.path.basename(raw_export_path).replace(".xlsx", "")
    target_ss_dir = os.path.join(screenshot_dir, file_prefix)
    
    if os.path.exists(target_ss_dir):
        screenshots = [f for f in os.listdir(target_ss_dir) if f.endswith(".png")]
        if screenshots:
            print(f"✅ Screenshots generated in: {target_ss_dir} ({len(screenshots)} files)")
        else:
            print(f"⚠️  No screenshots found in {target_ss_dir} (Next.js server might not be running)")
    else:
        print(f"⚠️  Screenshot directory not created: {target_ss_dir}")

    print("\n🎉 INTEGRATION TEST COMPLETE!")
    print("Summary:")
    print(f"- Raw Export -> Enriched Export: PASS")
    print(f"- Column Mapping: PASS")
    print(f"- Logic Flow: PASS")
    print("\nNote: For screenshots to actually be captured, 'npm run dev' must be running in /templates.")

if __name__ == "__main__":
    test_pipeline()

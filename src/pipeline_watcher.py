import time
import os
import sys
import logging
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from src.slack_alerts import send_lead_alert

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("PipelineWatcher")

EXPORTS_DIR = "exports"
AI_ENRICH_SCRIPT = "src/ai_enrichment.py"

class LeadExportHandler(FileSystemEventHandler):
    """
    Handles new file events in the exports directory.
    """
    def on_created(self, event):
        if event.is_directory:
            return
        
        filename = os.path.basename(event.src_path)
        if filename.endswith(".xlsx") and "_AI_ENRICHED_" not in filename and "_MASTER" in filename:
            logger.info(f"New lead export detected: {filename}")
            self.trigger_enrichment(event.src_path)

    def trigger_enrichment(self, file_path):
        """
        Triggers the AI enrichment script for the newly created file.
        """
        logger.info(f"Triggering AI Enrichment for: {file_path}")
        
        # Proactive Alert
        filename = os.path.basename(file_path)
        send_lead_alert(f"Pipeline Action: {filename}", "System Backend", "http://localhost:3000")

        try:
            # We run it as a subprocess to keep the watcher alive
            cmd = [sys.executable, AI_ENRICH_SCRIPT, "--input", file_path]
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                logger.info("AI Enrichment completed successfully.")
                send_lead_alert(f"✅ Enrichment Success: {filename}", "System Backend")
            else:
                logger.error(f"AI Enrichment failed with return code {result.returncode}")
                send_lead_alert(f"❌ Enrichment FAILED: {filename}", "System Backend")
        except Exception as e:
            logger.error(f"Error during enrichment trigger: {e}")
            send_lead_alert(f"⚠️ Critical Error: {str(e)}", "System Backend")

def main():
    if not os.path.exists(EXPORTS_DIR):
        os.makedirs(EXPORTS_DIR)

    event_handler = LeadExportHandler()
    observer = Observer()
    observer.schedule(event_handler, EXPORTS_DIR, recursive=False)
    
    logger.info(f"Pipeline Watcher started. Monitoring: {EXPORTS_DIR}")
    observer.start()
    
    try:
        while True:
            time.sleep(5)
    except KeyboardInterrupt:
        observer.stop()
        logger.info("Pipeline Watcher stopped.")
    
    observer.join()

if __name__ == "__main__":
    main()

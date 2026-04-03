import json
import os
import psutil
import time
from datetime import datetime

STATUS_FILE = "templates/src/data/system_status.json"


def check_system_health():
    """
    Checks if the core pipeline scripts are running and collects resource metrics.
    """
    status = {
        "last_updated": datetime.now().isoformat(),
        "resources": {
            "cpu_percent": psutil.cpu_percent(),
            "memory_mb": psutil.virtual_memory().used / (1024 * 1024),
            "load_avg": os.getloadavg() if hasattr(os, "getloadavg") else [0, 0, 0],
        },
        "services": {
            "scraper": {"status": "IDLE", "label": "G-Maps Scraper"},
            "watcher": {"status": "OFFLINE", "label": "Pipeline Watcher"},
            "enrichment": {"status": "IDLE", "label": "AI Enrichment"},
        },
    }

    # Check for active processes
    for proc in psutil.process_iter(["pid", "name", "cmdline"]):
        try:
            cmdline = " ".join(proc.info["cmdline"]) if proc.info["cmdline"] else ""

            if "google_maps.py" in cmdline:
                status["services"]["scraper"]["status"] = "RUNNING"

            if "pipeline_watcher.py" in cmdline:
                status["services"]["watcher"]["status"] = "ACTIVE"

            if "ai_enrichment.py" in cmdline:
                status["services"]["enrichment"]["status"] = "PROCESSING"
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    # Ensure directory exists
    os.makedirs(os.path.dirname(STATUS_FILE), exist_ok=True)

    with open(STATUS_FILE, "w") as f:
        json.dump(status, f, indent=2)


if __name__ == "__main__":
    while True:
        check_system_health()
        time.sleep(5)  # Update every 5 seconds

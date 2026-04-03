import requests

url = "http://127.0.0.1:27123/vault/Research Logs/Google Maps Scraper Refactor.md"
headers = {
    "Authorization": "Bearer 6973bcc18656efcfd413918352af6c5f3712b9f4d8e508cc9b9d7281e10c8710",
    "Content-Type": "text/markdown",
}
content = """# Google Maps Scraper Refactor Log - 2026-03-29

## Overview
Refactored the Google Maps lead scraper to a modular, stealth-focused architecture.

## Key Changes
- **Modular Engine**: Introduced `ScraperEngine` with `scrapling` integration (v0.4.1).
- **Stealth Fetcher**: Implemented `StealthyFetcher` with randomized user agents and JA3/H2 fingerprinting.
- **Resilient Selectors**: Updated Google Maps selectors to `.Nv2PK` and `a.hfpxzc` for improved layout coverage.

## Verification
- Successfully extracted leads for 'Cafes' in 'Bradford'.
- Verified data quality: Names, Phones, and Review Highlights correctly parsed.
- Exported to Excel: `exports/Cafes_Bradford_20260328_225610.xlsx`.

## Status
- Core Refactor: **PASS**
- Verification: **PASS**
- Remote Push: **PENDING (No remote configured)**
"""

try:
    response = requests.post(url, headers=headers, data=content.encode("utf-8"))
    if response.status_code == 200:
        print("Obsidian log updated successfully.")
    else:
        print(
            f"Failed to update Obsidian log: {response.status_code} - {response.text}"
        )
except Exception as e:
    print(f"Error: {e}")

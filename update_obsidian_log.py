import requests
import json
import datetime

# Configuration
vault_path = "Vault/Research Logs/Websites Marketing Project Log.md"
api_url = f"http://127.0.0.1:27123/vault/{vault_path}"
headers = {
    "Authorization": "Bearer 6973bcc18656efcfd413918352af6c5f3712b9f4d8e508cc9b9d7281e10c8710",
    "Content-Type": "text/markdown"
}

# Content for the update
now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
new_entry = f"""
## Log Entry: {now} - Phase 3 Completion

### Summary
Successfully finalized Phase 3: Google Maps Lead Intelligence. The system is now capable of stealthily discovering and enriching leads that lack websites.

### Key Achievements
- **Stealth Engine**: Updated `ScraperEngine` with randomized delays and `tenacity` retries for robust G-Maps navigation.
- **Advanced CLI**: Developed `src/main.py` with flexible arguments for niche, location, and custom output paths.
- **Double-Pass Verification**: Implemented a second-pass check in `details.py` to confirm "no website" status, filtering out businesses that use social media as their primary web presence.
- **Successful POC**: Verified the pipeline with runs in Bradford and Leeds. Fixed pathing bugs in the Excel export logic and missing imports in the main script.

### Technical Metrics
- **Phase 3 Progress**: 100%
- **Overall Completion**: 25%
- **Status**: Stable and Ready for Production Lead Gen.

### Next Steps
- **Phase 2 Integration**: Begin building the Apollo/Clay enrichment pipeline.
- **Site Templating**: Develop the dynamic Next.js sample site engine.
"""

try:
    # First, try to get the existing content to append
    get_response = requests.get(api_url, headers={"Authorization": headers["Authorization"]})
    if get_response.status_code == 200:
        existing_content = get_response.text
        updated_content = existing_content + "\n" + new_entry
        put_response = requests.put(api_url, headers=headers, data=updated_content.encode('utf-8'))
        if put_response.status_code == 204:
            print("Obsidian log appended successfully.")
        else:
            print(f"Failed to append to Obsidian log: {put_response.status_code} - {put_response.text}")
    else:
        # If file doesn't exist, create it
        post_response = requests.post(api_url, headers=headers, data=new_entry.encode('utf-8'))
        if post_response.status_code == 200:
            print("Obsidian log created successfully.")
        else:
            print(f"Failed to create Obsidian log: {post_response.status_code} - {post_response.text}")
except Exception as e:
    print(f"Error updating Obsidian: {e}")

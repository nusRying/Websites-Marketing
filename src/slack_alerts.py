import requests
import os
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger("SlackAlerts")

SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL")


def send_lead_alert(lead_name: str, location: str, lead_url: str = None):
    """
    Sends a real-time alert to Slack when a lead views their site.
    """
    if not SLACK_WEBHOOK_URL:
        logger.warning("SLACK_WEBHOOK_URL not set. Alert will only be logged locally.")
        logger.info(
            f"MOCK SLACK ALERT: 🔥 {lead_name} from {location} is viewing their site!"
        )
        return

    payload = {
        "text": f"🔥 *LEAD ENGAGEMENT:* {lead_name} is viewing their sample site right now!",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"🔥 *LEAD VIEWING:* `{lead_name}` from {location} is on their sample site right now!",
                },
            },
            {
                "type": "section",
                "fields": [
                    {"type": "mrkdwn", "text": f"*Business:* {lead_name}"},
                    {"type": "mrkdwn", "text": f"*Location:* {location}"},
                ],
            },
        ],
    }

    if lead_url:
        payload["blocks"].append(
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {"type": "plain_text", "text": "View in CRM"},
                        "url": "http://localhost:3000",  # Link to main dashboard
                    }
                ],
            }
        )

    try:
        response = requests.post(SLACK_WEBHOOK_URL, json=payload)
        if response.status_code == 200:
            logger.info(f"Slack alert sent for {lead_name}")
        else:
            logger.error(
                f"Failed to send Slack alert: {response.status_code} - {response.text}"
            )
    except Exception as e:
        logger.error(f"Error sending Slack alert: {e}")


if __name__ == "__main__":
    # Test alert
    send_lead_alert("Test Business", "London")

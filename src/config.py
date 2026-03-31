# Configuration for Scraper Selectors and Settings

# Google Maps Selectors
MAPS_SELECTORS = {
    "listing_container": ".Nv2PK, .bfZ77d, div[role='article']",
    "listing_link": "a.hfpxzc, a[aria-label*='Visit website']",
    "listing_name": ".qBF1Pd, .fontHeadlineSmall",
    "website_button": "a[aria-label*='website'], a[aria-label*='Website'], a[data-item-id='authority']",
    "address_field": "button[data-item-id='address']",
    "phone_field": "button[data-item-id^='phone:tel:']",
    "category_field": "button[data-item-id='category']",
    "hours_btn": "div[aria-label*='Hours']",
    "hours_table": "table.e07XUe",
    "reviews_btn": "button[aria-label*='Reviews'], button[jsaction*='pane.reviewlist.goto']",
    "review_container": "div.jftiEf",
    "review_reviewer": "div.d4r55",
    "review_rating": "span.kvMY9b",
    "review_text": "span.wiU7W, div.MyV73d, span.wiI7pd",
    "review_time": "span.rsqawe",
    "review_more_btn": "button[aria-label*='See more'], button.w8Bnu",
    "review_scroller": "div[role='main'], div.m67q60, div.dS8AEf",
    "social_links": "a[href*='facebook.com'], a[href*='instagram.com'], a[href*='linkedin.com'], a[href*='twitter.com'], a[href*='x.com'], a[href*='youtube.com'], a[href*='tiktok.com']",
    "feed_container": "div[role='feed']"
}

# Scraping Settings
SCRAPE_SETTINGS = {
    "max_results_per_search": 20,
    "max_reviews_per_lead": 150,
    "default_timeout": 30000,  # 30 seconds
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# Email Discovery
DISCOVERY_SETTINGS = {
    "email_regex": r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
    "excluded_domains": ["sentry.io", "example.com", "placeholder.com"]
}

---
phase: 03-google-maps-lead-intelligence
plan: 02
subsystem: Lead Scraper
tags: [lead-extraction, excel, google-maps]
requirements: [LEAD-GM-02, LEAD-GM-03]
tech-stack: [Python, Scrapling, Pandas, Openpyxl]
key-files: [src/scrapers/details.py, src/scrapers/export.py, src/scrapers/google_maps.py]
decisions:
  - Add second-pass website verification during detail extraction for "100% accuracy".
  - Handle social media links in the website field separately if needed (currently captured).
  - Use aria-labels for robust attribute extraction as class names change frequently.
metrics:
  duration: 1.5h
  completed_date: "2026-03-28"
  tasks: 2/2
---

# Phase 03 Plan 02: Detail Extraction and Excel Export Summary

## Substantive One-liner
Implemented robust detail extraction for Google Maps listings (Phone, Address, Reviews) and Excel export functionality with a second-pass accuracy check for websites.

## Key Accomplishments
- **Detailed Attribute Extraction**: Created `src/scrapers/details.py` which extracts Name, Address, Phone, Website, and Recent Reviews from any Google Maps listing URL.
- **Excel Export Logic**: Created `src/scrapers/export.py` using `pandas` and `openpyxl` to generate formatted Excel reports for discovered leads.
- **Improved Discovery Accuracy**: Refined `src/scrapers/google_maps.py` to better detect website buttons and fixed a syntax error in the scroll automation logic.
- **Accuracy Verification**: Added a second-pass check during detail extraction to confirm "no website" status, catching social media links (Instagram, Facebook) that might be missed during initial discovery.

## Deviations from Plan
### Auto-fixed Issues
**1. [Rule 1 - Bug] Fixed SyntaxError in scroll automation**
- **Found during:** Discovery testing.
- **Issue:** `Page.evaluate` was using conflicting single quotes in the CSS selector.
- **Fix:** Used double quotes for the selector within the `evaluate` template string.
- **Commit:** `007aeb9`

**2. [Rule 2 - Missing Functionality] Added Website Verification to Details**
- **Found during:** Testing "Ensure 100% accuracy" requirement.
- **Issue:** Discovery sometimes misses social media links which businesses use as their "website".
- **Fix:** Added a check for website buttons and external links in `details.py`.
- **Commit:** `cf99617`

**3. [Rule 3 - Blocking Issue] Scrapling Selector list access**
- **Found during:** Detail extraction testing.
- **Issue:** `response.css()` returns a `Selectors` object (list) which does not have an `.attrib` property.
- **Fix:** Safely accessed the first element `[0]` before calling `.attrib`.
- **Commit:** `cf99617`

## Known Stubs
- **Recent Reviews**: Currently captures reviews from the main panel if visible, but doesn't navigate to the full "Reviews" tab yet. If empty, it's documented as `[]`.

## Self-Check: PASSED
- `src/scrapers/details.py` exists and correctly extracts data from real G-Maps URLs.
- `src/scrapers/export.py` exists and generates valid `.xlsx` files.
- `src/scrapers/google_maps.py` scroll logic is functional.
- All tasks committed individually.

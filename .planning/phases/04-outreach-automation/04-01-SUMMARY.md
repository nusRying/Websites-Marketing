---
phase: 04-outreach-automation-and-visual-proof
plan: 01
subsystem: Visual Proof Engine
tags: [playwright, screenshots, automation, visual-proof]
requirements: [SITE-03]
tech-stack: [Python, Playwright, Pandas]
key-files: [src/screenshot_worker.py, src/ai_enrichment.py, src/scrapers/export.py]
decisions:
  - Integrated `playwright` to capture high-quality hero-section screenshots of personalized sample sites.
  - Placed the screenshot trigger directly inside `ai_enrichment.py` to ensure every enriched lead gets visual proof immediately.
  - Standardized screenshot storage in `exports/screenshots/{file_prefix}/` for easy organization.
  - Dynamically added all `ai_` fields and the `Screenshot Path` to the final Excel export.
metrics:
  duration: 1h
  completed_date: "2026-03-31"
  tasks: 3/3
---

# Phase 04 Plan 01: Screenshot Worker Implementation Summary

## Substantive One-liner
Automated the generation of high-quality visual proof by implementing a Playwright-based screenshot worker that captures personalized site previews for every enriched lead.

## Key Accomplishments
- **Visual Proof Engine**: Created `src/screenshot_worker.py` which renders dynamic Next.js templates with full URL parameters and captures crisp hero-section images.
- **Pipeline Deep Integration**: Updated `src/ai_enrichment.py` to automatically trigger screenshot generation as the final step of the enrichment process.
- **Data Linkage**: Enhanced `src/scrapers/export.py` to include direct file paths to the generated screenshots, making the data ready for bulk upload to outreach platforms.
- **Animation Resilience**: Implemented a 3-second 'settle' delay in the capture logic to ensure Framer Motion and Reveal animations are fully rendered before the shot is taken.

## Deviations from Plan
- **Integration Optimization**: Chose to trigger screenshots from the AI Enrichment script rather than the Watcher directly to keep the logic grouped by "lead enhancement" state.

## Known Stubs
- **Local Server Dependency**: The screenshot worker requires the Next.js dev server (`npm run dev`) to be running locally on port 3000 to capture images. In production, this will point to the deployed Vercel URL.

## Self-Check: PASSED
- `src/screenshot_worker.py` successfully captures images when provided with a valid local URL.
- Excel exports now contain the `Screenshot Path` column.
- The full pipeline (Scrape -> Watcher -> Enrich -> Screenshot) is architecturally complete.

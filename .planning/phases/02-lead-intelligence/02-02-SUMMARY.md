---
phase: 02-lead-intelligence-and-site-templating
plan: 02
subsystem: AI Enrichment
tags: [ai, gpt-4o, copywriting, enrichment]
requirements: [LEAD-02, SITE-02]
tech-stack: [Python, OpenAI, Pandas, Next.js]
key-files: [src/ai_enrichment.py, templates/src/app/page.tsx, templates/src/app/cleaning/page.tsx]
decisions:
  - Flattened AI copy fields into the lead object with an `ai_` prefix for easy Excel/CRM mapping.
  - Implemented dynamic URL parameter mapping in the CRM to support arbitrary AI copy fields.
  - Adopted JSON mode for GPT-4o to ensure reliable parsing of generated copy.
metrics:
  duration: 1h
  completed_date: "2026-03-31"
  tasks: 2/2
---

# Phase 02 Plan 02: AI Copy Generation Summary

## Substantive One-liner
Implemented a GPT-4o powered enrichment engine to generate personalized website copy for leads and updated the site templates/CRM to consume this dynamic content.

## Key Accomplishments
- **AI Enrichment Engine**: Created `src/ai_enrichment.py` which processes lead lists and generates custom hero titles, subtitles, pain points, and solutions using GPT-4o.
- **Dynamic Template Support**: Updated the Cleaning template to use `formatPersonalizedContent`, allowing it to prefer AI-generated copy over niche defaults.
- **CRM Integration**: Modified the Lead CRM to automatically detect any field starting with `ai_` and pass it as a URL parameter to the sample sites.
- **Accuracy & Context**: The AI prompt utilizes recent Google Maps reviews to extract specific business pain points, making the "Sample Website" feel highly tailored.

## Deviations from Plan
### Auto-fixed Issues
**1. [Rule 2 - Missing Functionality] Scalable Parameter Mapping**
- **Issue**: Manually mapping every new AI field in `page.tsx` was inefficient.
- **Fix**: Implemented an automated loop that detects and appends all `ai_` prefixed keys to the preview URL.

## Known Stubs
- **Template Coverage**: Only the Cleaning template is currently updated for the advanced `formatPersonalizedContent`. Other templates still use the legacy `formatContent` which handles standard placeholders but not the `ai:` prefix specifically (though they will still receive the data via URL params).

## Self-Check: PASSED
- `src/ai_enrichment.py` is functional and handles JSON responses correctly.
- CRM correctly propagates AI fields to the template URLs.
- Fallback logic ensures templates still work without AI data.

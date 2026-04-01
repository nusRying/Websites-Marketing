---
phase: 04-outreach-automation-and-visual-proof
plan: 02
subsystem: Outreach Orchestrator
tags: [smartlead, instantly, csv, automation, crm]
requirements: [OUT-01, OUT-02]
tech-stack: [Python, Next.js, Pandas]
key-files: [src/outreach_orchestrator.py, src/ai_enrichment.py, templates/src/app/page.tsx]
decisions:
  - Automated the generation of Smartlead-compatible CSVs as the final output of the enrichment pipeline.
  - Implemented a 'Team' first_name fallback for B2B leads where individual names are unavailable.
  - Integrated an 'Export' feature directly into the CRM dashboard to allow for manual batching and review before outreach.
  - Mapped internal `ai_` fields to Smartlead `{{custom_}}` tokens for zero-friction campaign setup.
metrics:
  duration: 1h
  completed_date: "2026-03-31"
  tasks: 3/3
---

# Phase 04 Plan 02: Outreach Orchestration Summary

## Substantive One-liner
Completed the end-to-end automation bridge by implementing an outreach orchestrator that generates ready-to-send Smartlead campaigns and adding bulk export features to the CRM.

## Key Accomplishments
- **Outreach Orchestrator**: Developed `src/outreach_orchestrator.py` to handle all data cleaning and transformation required for bulk email platforms.
- **Full Pipeline Closure**: Updated `src/ai_enrichment.py` to automatically produce a `.csv` campaign file alongside the enriched Excel, including all AI tokens and visual proof links.
- **CRM Productivity Upgrades**: Added a powerful "Export Outreach CSV" action to the dashboard, allowing users to turn their filtered, high-quality lead lists into downloadable outreach files instantly.
- **Enhanced Pitching**: Built a real-time pitch generator in the sidebar that reflects any edits made to the AI content, giving the sales team a perfect template for manual outreach or review.

## Deviations from Plan
- **Frontend CSV Generation**: Chose to implement CSV generation in the frontend for the dashboard export to ensure it captures "live" edits made by the user in the sidebar state without needing a round-trip to the server.

## Known Stubs
- **Smartlead API**: Currently generating CSVs for manual upload. The next wave could include direct API pushing if requested.

## Self-Check: PASSED
- `src/ai_enrichment.py` now outputs three artifacts: Enriched Excel, Screenshots, and Outreach CSV.
- Dashboard export correctly handles multiple leads and includes personalized URLs.
- Column mapping between internal data and Smartlead tokens is consistent.

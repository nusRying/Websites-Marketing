# Requirements: Automated Website Sales Engine

## Infrastructure (INF)
- **INF-01: Domain Fleet Management**: Setup 10+ secondary domains and 20+ inboxes to distribute outreach volume and protect main brand.
- **INF-02: Automated Warmup**: Implement mandatory 2-4 week domain warmup period before active sending.
- **INF-03: Unified Inbox**: Centralize responses across all mailboxes for easy management and tracking.

## Lead Intelligence (LEAD)
- **LEAD-01: Apollo Lead Sourcing**: Automate pulling businesses without websites from Apollo.io.
- **LEAD-02: Clay Enrichment Pipeline**: Enrich leads with company-specific facts (address, industry, name, owner info) to drive personalization.
- **LEAD-03: Multi-Stage Email Verification**: Implement Apollo and MillionVerifier verification to minimize bounce rates.
- **LEAD-GM-01: Scrapling v0.4.1 G-Maps Scraper**: Build a stealthy scraper that identifies businesses without websites on Google Maps.
- **LEAD-GM-02: Scraper Detail Extraction**: Extract name, phone, address, and recent reviews from G-Maps listings.
- **LEAD-GM-03: Excel Lead Export**: Save filtered lead data (no-website businesses) to an Excel file with detailed attribution.

## Website Generation (SITE)
- **SITE-01: Dynamic Next.js Template**: Build a fast-loading template that renders personalized content (name, industry, logo) based on URL parameters.
- **SITE-02: AI Copywriting (GPT-4o)**: Use LLMs to generate site content specific to the business niche and location.
- **SITE-03: Visual Previews (Screenshots)**: Automated Puppeteer worker to capture high-quality screenshot previews of the sample sites for inclusion in emails.
- **SITE-04: Click/View Tracking**: Real-time tracking of when a lead clicks the link or views their sample site.
- **SITE-05: Direct Meeting Booking**: Integration of Calendly/TidyCal directly onto the sample site to reduce conversion friction.

## Outreach Engine (OUT)
- **OUT-01: Multi-Inbox Sending Rotation**: Rotate between the fleet of inboxes to keep daily volume per inbox low (max 50 emails/day).
- **OUT-02: AI-Personalized First Lines**: Dynamic generation of email openers using company-specific data from the Clay pipeline.
- **OUT-03: Real-Time Alerts (Slack/Webhook)**: Notifications for when a lead views their site or responds to an email.

## v1 Scope Summary
Total v1 Requirements: 17
- Infrastructure: 3
- Lead Intelligence: 6
- Website Generation: 5
- Outreach Engine: 3

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INF-01 | Phase 1 | COMPLETED |
| INF-02 | Phase 1 | COMPLETED |
| INF-03 | Phase 1 | COMPLETED |
| LEAD-01 | Phase 2 | COMPLETED |
| LEAD-02 | Phase 2 | COMPLETED |
| LEAD-03 | Phase 2 | COMPLETED |
| LEAD-GM-01 | Phase 03 | COMPLETED |
| LEAD-GM-02 | Phase 03 | COMPLETED |
| LEAD-GM-03 | Phase 03 | COMPLETED |
| SITE-01 | Phase 2 | COMPLETED |
| SITE-02 | Phase 2 | COMPLETED |
| SITE-03 | Phase 3 | COMPLETED |
| SITE-04 | Phase 3 | COMPLETED |
| SITE-05 | Phase 4 | COMPLETED |
| OUT-01 | Phase 1 | COMPLETED |
| OUT-02 | Phase 3 | COMPLETED |
| OUT-03 | Phase 3 | COMPLETED |

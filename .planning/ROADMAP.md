# Roadmap: Automated Website Sales Engine

## Phases

- [ ] **Phase 1: Infrastructure & Reputation** - Setup domain fleet and begin reputation warmup.
- [ ] **Phase 2: Lead Intelligence & Site Templating** - Build the data pipeline and personalized sample site engine.
- [ ] **Phase 3: Outreach Automation & Visual Proof** - Orchestrate outreach with visual proof and engagement tracking.
- [ ] **Phase 4: Conversion & Scaling** - Finalize conversion funnel and scale volume.

## Phase Details

### Phase 1: Infrastructure & Reputation
**Goal**: Secure sending reputation for outreach domains.
**Depends on**: Nothing
**Requirements**: INF-01, INF-02, INF-03, OUT-01
**Success Criteria** (what must be TRUE):
  1. 10+ secondary domains are registered and configured with SPF/DKIM/DMARC.
  2. 20+ inboxes are active in a warmup sequence for at least 2 weeks.
  3. Unified inbox is receiving test emails from all sending domains.
**Plans**: TBD

### Phase 2: Lead Intelligence & Site Templating
**Goal**: Build the data pipeline and the "Show" part of the value proposition.
**Depends on**: Phase 1
**Requirements**: LEAD-01, LEAD-02, LEAD-03, SITE-01, SITE-02
**Success Criteria** (what must be TRUE):
  1. Automated pipeline fetches 50+ qualified leads from Apollo daily.
  2. Clay pipeline successfully enriches leads with company-specific data and AI-generated site copy.
  3. A Next.js site renders correctly for any lead when passed their unique ID/slug, showing their name and industry.
**Plans**: TBD
**UI hint**: yes

### Phase 3: Outreach Automation & Visual Proof
**Goal**: Connect the value to the infrastructure with high-conversion outreach.
**Depends on**: Phase 2
**Requirements**: SITE-03, SITE-04, OUT-02, OUT-03
**Success Criteria** (what must be TRUE):
  1. Puppeteer worker generates a screenshot of the sample site for each new lead.
  2. Outreach sequence (Smartlead) pulls lead data, screenshot, and personalized first line from Clay.
  3. System triggers a Slack/Webhook alert when a sample site is viewed.
**Plans**: TBD

### Phase 4: Conversion & Scaling
**Goal**: Maximize meeting bookings and scale the system.
**Depends on**: Phase 3
**Requirements**: SITE-05
**Success Criteria** (what must be TRUE):
  1. Calendly/TidyCal widget is embedded and functional on all sample sites.
  2. Meeting booking data is tracked and attributed back to the outreach campaign.
  3. System can handle 500+ daily emails across the fleet without deliverability drops.
**Plans**: TBD
**UI hint**: yes

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure & Reputation | 0/0 | Not started | - |
| 2. Lead Intelligence & Site Templating | 0/0 | Not started | - |
| 3. Outreach Automation & Visual Proof | 0/0 | Not started | - |
| 4. Conversion & Scaling | 0/0 | Not started | - |

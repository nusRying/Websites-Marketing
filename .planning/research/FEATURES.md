# Feature Landscape

**Domain:** Lead Generation & Outreach Automation
**Researched:** 2024-10-25
**Overall Confidence:** HIGH

## Table Stakes (Required for Competition)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Multi-Inbox Sending** | Distribute volume to avoid spam. | Medium | Requires rotating inboxes and managing 10+ domains. |
| **Email Verification** | High bounce rates kill domains. | Low | Use MillionVerifier/NeverBounce. |
| **Personalized First Lines** | Increases open/reply rates. | Medium | Use LLMs (GPT-4o) via Clay. |
| **Automated Warmup** | Builds sender reputation. | Low | Smartlead/Instantly built-in. |
| **Unified Inbox** | Manage replies across all mailboxes. | Medium | Essential for managing 50+ inboxes. |

## Differentiators (Sets the Product Apart)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Sample Website Generation** | Shows, don't just tell. Higher trust. | High | Custom Next.js templates with dynamic logos/copy. |
| **Visual Previews (Screenshots)** | High click-through rates in emails. | High | Automated screenshot engine (Shotstack/Puppeteer). |
| **Industry-Specific Landing Pages** | High conversion through relevance. | Medium | Dynamically injected testimonials based on lead niche. |
| **Real-time Lead View Tracking** | Immediate "strike while iron is hot." | Low | Webhooks and Slack alerts on page view. |
| **Direct Meeting Booking** | Reduces friction to conversion. | Low | Embed Calendly/TidyCal directly on the sample site. |

## Anti-Features (Avoid These)

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **High Daily Sending Volume** | Kills domain reputation (Spam). | "Low and Slow" - Max 50 emails/day per inbox. |
| **Single Domain Outreach** | One "Report as Spam" can kill the brand. | Use a "Fleet" of secondary domains. |
| **Manual Data Cleaning** | Doesn't scale. | Automate data normalization with Clay. |

## Feature Dependencies

```mermaid
Lead Source (Apollo) → Data Enrichment (Clay) → Website Data (OpenAI)
Website Data → Next.js (Sample Page)
Next.js (Sample Page) → Screenshot Engine (Puppeteer)
Screenshot & URL → Email Sending Tool (Smartlead)
```

## MVP Recommendation

**Prioritize:**
1.  **Lead Enrichment & Sourcing (Apollo + Clay)**: Without high-quality data, everything else fails.
2.  **Simple Personalized Landing Page (Next.js)**: Build *one* template that uses `{{Company Name}}` and `{{Logo}}`.
3.  **Basic Outreach Flow (Smartlead)**: Set up the infra (3 domains, 6 inboxes).

**Defer:**
-   **Multi-Channel (LinkedIn/SMS)**: Master email first.
-   **Advanced Screenshot Engine**: Start with just a link to the page.

## Sources

- [Instantly.ai Deliverability Guide](https://instantly.ai/deliverability)
- [Clay.com Use Cases](https://www.clay.com/use-cases)

# Domain Pitfalls

**Domain:** Lead Generation & Outreach Automation
**Researched:** 2024-10-25
**Overall Confidence:** HIGH

## Critical Pitfalls (Causes Major Damage)

### Pitfall 1: Domain Reputation Burn
**What goes wrong:** Sending from a new domain without "Warmup" or using a single domain for high-volume outreach.
**Root cause:** Gmail/Outlook's strict spam filters.
**Consequences:** 100% of your emails land in spam; domains get "Blacklisted" for months.
**Prevention:** Always use **Smartlead/Instantly Warmup** for 2-4 weeks before sending. Rotate across many secondary domains (`get-acme.com`).
**Detection:** Monitor "Open Rates." If they drop below 20-30%, your domain reputation is likely damaged.

### Pitfall 2: High Bounce Rates
**What goes wrong:** Sending to outdated or guessed emails.
**Consequences:** Providers like Google and Microsoft will throttle your inboxes if you have >3% bounce rate.
**Prevention:** Run every email list through a **verification tool** (MillionVerifier, NeverBounce, or Findymail).

## Moderate Pitfalls

### Pitfall 1: Low Relevance (The "Spammy" Look)
**What goes wrong:** Using generic "I'd like to chat" templates.
**Prevention:** Use **Clay + GPT-4o** to pull a specific fact about the company (e.g., "I saw you recently hired for [Role]") and include it in the email and the "Sample Website."

### Pitfall 2: Page Loading Speed
**What goes wrong:** The personalized "Sample Website" takes 5+ seconds to load.
**Prevention:** Use **Next.js with Edge Functions** or static generation with dynamic ISR. Avoid large, unoptimized images.

## Minor Pitfalls

### Pitfall 1: Broken Logos/Images
**What goes wrong:** Clay finds a broken URL for the company logo, making the sample site look unprofessional.
**Prevention:** Add a fallback "Company Name" text if the logo URL is missing or returns a 404.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| **Infrastructure** | SPF/DKIM Misconfiguration | Use Cloudflare and verify records via a tool like [DMARC Analyzer](https://dmarcian.com/dmarc-inspector/). |
| **Site Gen** | AI Hallucinations | Use strictly structured prompts (JSON) and validation for the GPT-4o output. |
| **Outreach** | Over-Sending | Cap each inbox at 30-50 emails/day, even if you feel it's "too slow." |

## Sources

- [Instantly.ai Deliverability Masterclass](https://instantly.ai/university)
- [NeverBounce Deliverability Report](https://neverbounce.com/blog/email-deliverability)

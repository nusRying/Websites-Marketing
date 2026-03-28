# Technology Stack

**Project:** Lead Gen & Sample Website Outreach
**Researched:** 2024-10-25
**Overall Confidence:** HIGH

## Recommended Stack

### 1. Lead Generation & Data Enrichment (The "Intelligence")
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Apollo.io** | API v2 | Lead Sourcing | Largest B2B database with verified emails and LinkedIn profiles. |
| **Clay** | Enterprise | Enrichment & AI | Replaces custom scrapers. Pulls data from 50+ sources (Google Maps, Website Tech, LinkedIn). |
| **Apify / PhantomBuster** | N/A | Niche Scraping | For scraping specific directories or Google Maps results not in Apollo. |

### 2. Website Generation (The "Sample")
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Next.js** | 14/15 (App Router) | Frontend Template | Server-side rendering for fast-loading, personalized landing pages. |
| **Vercel** | N/A | Hosting & Deployment | Global Edge Network ensures the "Sample Site" loads instantly for the lead. |
| **OpenAI API** | GPT-4o | AI Copywriting | Generates personalized headlines and value propositions for each lead. |
| **Supabase** | N/A | Backend & Database | Stores lead data, tracking stats, and provides a simple Auth/API layer. |
| **Puppeteer / Shotstack** | N/A | Screenshot Generation | Automates taking a "thumbnail" of the sample site to include in emails. |

### 3. Email Outreach (The "Engine")
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Instantly.ai / Smartlead** | API v1 | Sequencing & Rotation | Manages 100+ inboxes, automated warmup, and "Unlimited" sending accounts. |
| **Google Workspace** | N/A | Mailboxes | Best deliverability reputation for cold outreach. |
| **Cloudflare** | N/A | DNS Management | Handles SPF, DKIM, DMARC records for the "fleet" of secondary domains. |

### 4. Integration & Orchestration
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **n8n / Make** | Self-hosted/Cloud | Workflow Automation | Glues the different APIs together (Clay -> Supabase -> Smartlead). |
| **Slack API** | N/A | Notifications | Alerts the sales team when a lead views their "Sample Site." |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Sending Tool | Smartlead.ai | Lemlist | Lemlist is more expensive for high-volume inbox rotation. |
| Lead Source | Apollo.io | ZoomInfo | ZoomInfo is significantly more expensive for startups/small teams. |
| Site Builder | Custom Next.js | 10Web (WordPress) | Custom Next.js allows for deeper personalization and better performance. |

## Sources

- [Smartlead.ai Knowledge Base](https://help.smartlead.ai/)
- [Clay.com Documentation](https://docs.clay.com/)
- [Next.js App Router Documentation](https://nextjs.org/docs)
- [Apollo.io API Reference](https://www.apollo.io/api-reference)

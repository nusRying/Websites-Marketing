# SaaS Architecture Audit

**Analysis Date:** 2026-04-01

## Pattern Overview

**Overall:** Hybrid SaaS with Next.js App Router frontend and FastAPI background worker backend, integrated via Supabase.

**Key Characteristics:**
- **Frontend Auth:** Supabase Auth with SSR middleware protection.
- **Backend Auth:** Service role for secure cloud sync from the worker.
- **Data Model:** Profiles, Batches, Leads, and CRM History with relational integrity.

## Layers

**Auth Layer (Supabase SSR):**
- Location: `templates/src/middleware.ts`
- Purpose: Protects dashboard and API routes while allowing public template access.
- Risk: None detected. Middleware correctly handles cookie-based auth for Next.js 13+ environments.

**Persistence Layer (Supabase Postgres):**
- Location: `supabase/migrations/`
- Contains: RLS-protected tables for user data.
- Risk: High. `crm_history` INSERT policy allows ANY user to insert data into any lead's history if not properly scoped.

**Integration Layer (Cloud Sync):**
- Location: `src/cloud_sync.py`
- Purpose: Syncs local scraper data to Supabase.
- Risk: Reliance on `SUPABASE_SERVICE_ROLE_KEY` requires strict environment variable security.

## Data Flow

**Lead Discovery & Enrichment:**
1. Next.js triggers FastAPI `run-pipeline` endpoint (async).
2. FastAPI worker runs Scraper (Playwright/Scrapling) locally.
3. AI Enrichment Engine processes leads (OpenAI).
4. `CloudSync` uploads results to Supabase using the service role.
5. Next.js frontend fetches results directly from Supabase via RLS-protected client.

## Recommendations

- **Fix RLS:** Update `crm_history` INSERT policy to check `lead_id` ownership:
  ```sql
  CREATE POLICY "Users can log history of their leads" ON crm_history FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM leads WHERE leads.id = crm_history.lead_id AND leads.user_id = auth.uid()));
  ```
- **Centralize Config:** The `profiles` table lacks a `full_name` or `avatar_url` column, which might be needed for a standard SaaS dashboard.

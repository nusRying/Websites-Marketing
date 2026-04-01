# Security Audit

**Analysis Date:** 2026-04-01

## Credential Leakage Risks

**Findings:**
- **Root .gitignore (CRITICAL):** The project lacks a root `.gitignore` file.
  - Risk: Sensitive files like `.env`, `scraper.log`, and other local data could be accidentally committed to the repository.
- **Environment Variables:** Credentials like `SUPABASE_SERVICE_ROLE_KEY` and `OPENAI_API_KEY` are passed via `docker-compose.yml`.
  - Risk: If `docker-compose.yml` is committed with hardcoded values (not detected here, but a risk), secrets leak.
- **Service Role Usage:** `src/cloud_sync.py` uses the `SUPABASE_SERVICE_ROLE_KEY`.
  - Risk: This key bypasses RLS. If the backend worker is compromised, the attacker has full access to the database.

## Row Level Security (RLS)

**Analysis of Migration Files (`supabase/migrations/`):**
- **Profiles, Batches, Leads:** Correctly use `auth.uid() = user_id` for SELECT and INSERT.
- **CRM History:**
  - `CREATE POLICY "System can log history" ON crm_history FOR INSERT WITH CHECK (TRUE);`
  - **Vulnerability:** Allows any authenticated (and potentially unauthenticated, depending on `anon` role) user to insert arbitrary history logs for any lead ID.
  - Recommendation: Scope this policy to ensure the `lead_id` belongs to the `auth.uid()`.

## API & Data Security

**FastAPI Endpoints:**
- `trigger_pipeline` endpoint takes a `user_id` as a string parameter (`src/api_worker.py`).
- **Risk:** There is no authentication on this endpoint. Anyone who can reach the worker can trigger scrapers on behalf of any `user_id`, potentially incurring costs or syncing data to other users' accounts.
- **Recommendation:** Implement API Key or JWT validation on the worker's endpoints.

**File System:**
- Temporary files in `exports/temp` contain lead data.
- **Risk:** While cleaned up, they remain on disk during the job. If the container is shared, other processes might access them.

## Recommendations

1. **Add Root .gitignore:** Immediately create a `.gitignore` to protect against credential leaks.
2. **Secure Worker API:** Add a shared secret or JWT validation to the FastAPI endpoints.
3. **Refine RLS:** Fix the `crm_history` policy.
4. **Secret Management:** Consider using a secret manager (e.g., AWS Secret Manager, HashiCorp Vault) for the `SUPABASE_SERVICE_ROLE_KEY` instead of simple environment variables.

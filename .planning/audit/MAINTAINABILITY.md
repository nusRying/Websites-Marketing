# Maintainability Audit

**Analysis Date:** 2026-04-01

## Code Quality & Patterns

**Template Configurations:**
- Location: `templates/src/configs/`
- Pattern: Object-based configurations (e.g., `CleaningConfig`) with placeholder support.
- Assessment: Highly maintainable. Adding a new niche is as simple as creating a new `.ts` file and updating the `autoSelectTemplate` logic.

**Personalization Logic:**
- Location: `templates/src/lib/personalization.ts` and `templates/src/lib/usePersonalization.ts`.
- Pattern: Centralized `t` function and a custom React hook to bridge URL params with template state.
- Assessment: Excellent. Separates data extraction from UI presentation. Consistent across all template routes.

**Next.js Middleware:**
- Location: `templates/src/middleware.ts`.
- Assessment: Robust. Properly handles Supabase SSR, auth redirection, and route exclusion for public assets/templates.

## Technical Debt

**Placeholder Code (CRITICAL):**
- File: `src/ai_enrichment.py`.
- Issue: Contains placeholder comments like `# ... (init and generate_copy kept)`.
- Impact: Key logic for AI enrichment and `generate_copy` is missing or commented out, breaking the core pipeline functionality.
- Fix: Restore the missing methods or properly implement them from the original source.

**In-Memory State:**
- File: `src/api_worker.py`.
- Issue: `jobs = {}` is an in-memory dictionary.
- Impact: Makes the worker stateful and impossible to scale horizontally or recover from crashes.

**Hardcoded Logic:**
- File: `templates/src/lib/personalization.ts`.
- Issue: `autoSelectTemplate` uses a hardcoded list of `if/else` checks for niche detection.
- Improvement: Move this mapping to a JSON config or database-driven rules for easier updates without code changes.

## Recommendations

1. **Refactor AI Enrichment:** Remove placeholder comments and implement full logic in `src/ai_enrichment.py`.
2. **Database-Driven Tasks:** Move job tracking to the `batches` table in Supabase.
3. **Template Discovery:** Standardize the template config exports so they can be dynamically imported or looked up via a centralized registry.
4. **Testing:** Add unit tests for the personalization logic and integration tests for the FastAPI worker.

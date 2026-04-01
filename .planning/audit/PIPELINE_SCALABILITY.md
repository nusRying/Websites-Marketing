# Pipeline Scalability Audit

**Analysis Date:** 2026-04-01

## Current State

**Architecture:** Dockerized FastAPI app using `BackgroundTasks` for scraping and enrichment.

**Key Components:**
- **FastAPI:** Entry point for pipeline requests (`src/api_worker.py`).
- **Playwright/Scrapling:** Browser-based discovery (`src/scrapers/engine.py`).
- **In-Memory Job Store:** Tracks job status during runtime.

## Scaling Bottlenecks

**Compute (High Risk):**
- Scraper uses `StealthyFetcher` (Playwright) which is resource-heavy (CPU/RAM).
- `BackgroundTasks` executes in the same process, competing with the API for resources.
- Parallelism is limited by the number of CPU cores and the browser overhead.

**State Management (High Risk):**
- `jobs` dictionary in `src/api_worker.py` is in-memory.
- **Problem:** If the Docker container restarts or crashes, all active job status information is lost.
- **Problem:** Cannot scale to multiple API replicas as they won't share the `jobs` state.

**I/O and Blocking (Medium Risk):**
- Scraper includes hardcoded `time.sleep` (1.5-4s) for stealth, which is fine, but adds to total job time.
- Temporary files are created in `exports/temp` and cleaned up at the end. High volume could lead to disk I/O pressure.

## Scalability Recommendations

1. **Move to a Distributed Task Queue:**
   - Implement **Celery** or **RQ** with **Redis** as the broker.
   - Separate the API container from the Worker container to allow independent scaling.
2. **Persistence for Job Status:**
   - Store job metadata and status in the `batches` table in Supabase (or a dedicated Redis store).
   - Allows users to refresh the page and see job progress across sessions/restarts.
3. **Browser Pool Management:**
   - Use a browserless cluster or a persistent browser pool (e.g., `browserless.io`) instead of starting a new Playwright instance for every job.
   - Optimize the `ScraperEngine` to reuse browser contexts where safe.
4. **Horizontal Scaling:**
   - With a task queue, you can spin up 10 workers on different machines to handle high lead discovery volume without impacting API responsiveness.

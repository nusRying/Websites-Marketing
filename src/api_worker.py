import logging
import uuid
from fastapi import FastAPI, BackgroundTasks, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from supabase import create_client, Client
import sentry_sdk
from src.job_store import JobStore

# Initialize Sentry
SENTRY_DSN = os.getenv("SENTRY_DSN")
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        traces_sample_rate=1.0,
        profiles_sample_rate=1.0,
    )
    logging.info("Sentry initialized for Backend Worker")

# Import our pipeline components
from src.scrapers.engine import ScraperEngine  # noqa: E402
from src.scrapers.google_maps import GoogleMapsScraper  # noqa: E402
from src.ai_enrichment import AIEnrichmentEngine  # noqa: E402

# Setup logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger("APIWorker")

app = FastAPI(title="Lead Engine SaaS Worker")


def parse_allowed_origins(raw_origins: str | None = None) -> list[str]:
    raw = raw_origins
    if raw is None:
        raw = (
            os.getenv("WORKER_ALLOWED_ORIGINS")
            or os.getenv("NEXT_PUBLIC_APP_URL")
            or os.getenv("NEXT_PUBLIC_SITE_URL")
            or ""
        )

    origins = [origin.strip().rstrip("/") for origin in raw.split(",") if origin.strip()]

    vercel_url = os.getenv("VERCEL_URL")
    if vercel_url:
        vercel_origin = (
            vercel_url
            if vercel_url.startswith(("http://", "https://"))
            else f"https://{vercel_url}"
        )
        origins.append(vercel_origin.rstrip("/"))

    if origins:
        return sorted(set(origins))

    return [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]


ALLOWED_ORIGINS = parse_allowed_origins()


# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client for Auth Verification
supabase_url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
supabase_anon_key = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = (
    create_client(supabase_url, supabase_anon_key)
    if supabase_url and supabase_anon_key
    else None
)


async def get_current_user(authorization: str = Header(None)):
    """
    Verifies the JWT token from Supabase Auth.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Missing or invalid authorization header"
        )

    token = authorization.split(" ")[1]

    if not supabase:
        logger.error("Supabase client not initialized")
        raise HTTPException(status_code=500, detail="Internal server error")

    try:
        # Verify token with Supabase
        user_res = supabase.auth.get_user(token)
        if not user_res.user:
            raise HTTPException(status_code=401, detail="Invalid session")
        return user_res.user
    except Exception as e:
        logger.error(f"Auth error: {e}")
        raise HTTPException(status_code=401, detail="Authentication failed")


class PipelineRequest(BaseModel):
    niche: str
    location: str
    max_results: int = 10
    user_id: str
    generate_screenshots: bool = True


class JobStatus(BaseModel):
    job_id: str
    status: str
    message: str


job_store = JobStore()


def model_to_dict(model: BaseModel) -> dict:
    if hasattr(model, "model_dump"):
        return model.model_dump()
    return model.dict()


def run_full_pipeline(job_id: str, request: PipelineRequest):
    """
    Orchestrates the full Lead Engine pipeline in the background.
    """
    try:
        job_store.update(job_id, "RUNNING", "Scraping Google Maps leads.")
        logger.info(f"Starting Pipeline Job {job_id} for user {request.user_id}")

        # 1. SCRAPE
        engine = ScraperEngine(headless=True)
        search_scraper = GoogleMapsScraper(engine)
        logger.info(
            f"Job {job_id}: Searching for {request.niche} in {request.location}"
        )

        leads = search_scraper.search(
            request.niche, request.location, max_results=request.max_results
        )

        if not leads:
            job_store.update(
                job_id,
                "COMPLETED_NO_RESULTS",
                "Pipeline completed, but no matching leads were found.",
            )
            logger.warning(f"Job {job_id}: No leads found.")
            return

        # 2. ENRICH, SCREENSHOT & CLOUD SYNC
        temp_dir = "exports/temp"
        os.makedirs(temp_dir, exist_ok=True)

        from src.scrapers.export import ExcelExporter

        exporter = ExcelExporter(export_dir=temp_dir)
        temp_filename = f"job_{job_id}_raw"
        raw_file_path = exporter.save(leads, filename_prefix=temp_filename)

        # 3. Trigger Enrichment (which now handles Screenshots and Cloud Sync)
        enrich_engine = AIEnrichmentEngine()
        job_store.update(job_id, "ENRICHING", "Generating AI copy and screenshots.")
        logger.info(f"Job {job_id}: Starting AI Enrichment and Cloud Sync...")

        final_file = enrich_engine.process_file(
            input_path=raw_file_path,
            generate_screenshots=request.generate_screenshots,
            user_id=request.user_id,
        )

        job_store.update(
            job_id,
            "SUCCESS",
            "Pipeline completed successfully and synced to cloud.",
            output_file=final_file,
        )
        logger.info(
            f"Job {job_id}: Pipeline completed successfully. Data synced to cloud."
        )

        # Cleanup temp files
        if os.path.exists(raw_file_path):
            os.remove(raw_file_path)
        if final_file and os.path.exists(final_file):
            os.remove(final_file)

    except Exception as e:
        job_store.update(job_id, "FAILED", "Pipeline failed.", error=str(e))
        logger.error(f"Job {job_id} failed: {e}")


@app.get("/")
async def root():
    return {"status": "Lead Engine Worker Active", "version": "1.0.0"}


@app.post("/run-pipeline", response_model=JobStatus)
async def trigger_pipeline(
    request: PipelineRequest,
    background_tasks: BackgroundTasks,
    user=Depends(get_current_user),
):
    """
    Starts a background pipeline job after verifying user identity.
    """
    # Security: Ensure the user is only triggering jobs for their own ID
    if request.user_id != user.id:
        raise HTTPException(status_code=403, detail="Forbidden: User ID mismatch")

    job_id = str(uuid.uuid4())
    job_store.create(job_id, user.id, model_to_dict(request))

    background_tasks.add_task(run_full_pipeline, job_id, request)

    return JobStatus(
        job_id=job_id,
        status="PENDING",
        message="Pipeline job started in the background.",
    )


@app.get("/job/{job_id}")
async def get_job_status(job_id: str, user=Depends(get_current_user)):
    """
    Returns the status of a specific job.
    """
    record = job_store.get(job_id)
    if not record:
        raise HTTPException(status_code=404, detail="Job not found")

    if record.get("user_id") != user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    return {
        "job_id": job_id,
        "status": record.get("status"),
        "message": record.get("message"),
        "error": record.get("error"),
        "created_at": record.get("created_at"),
        "updated_at": record.get("updated_at"),
        "completed_at": record.get("completed_at"),
    }

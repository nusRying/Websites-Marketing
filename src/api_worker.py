import logging
import uuid
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import Optional
import os

# Import our pipeline components
from src.scrapers.engine import ScraperEngine
from src.scrapers.google_maps import GoogleMapsScraper
from src.ai_enrichment import AIEnrichmentEngine

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger("APIWorker")

app = FastAPI(title="Lead Engine SaaS Worker")

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

# In-memory job store (in production, use Redis/Postgres)
jobs = {}

def run_full_pipeline(job_id: str, request: PipelineRequest):
    """
    Orchestrates the full Lead Engine pipeline in the background.
    """
    try:
        jobs[job_id] = "RUNNING"
        logger.info(f"Starting Pipeline Job {job_id} for user {request.user_id}")

        # 1. SCRAPE
        engine = ScraperEngine(headless=True)
        search_scraper = GoogleMapsScraper(engine)
        logger.info(f"Job {job_id}: Searching for {request.niche} in {request.location}")
        
        leads = search_scraper.search(request.niche, request.location, max_results=request.max_results)
        
        if not leads:
            jobs[job_id] = "COMPLETED_NO_RESULTS"
            logger.warning(f"Job {job_id}: No leads found.")
            return

        # 2. ENRICH, SCREENSHOT & CLOUD SYNC
        # We'll save to a temp file first for the AI engine to process
        temp_dir = "exports/temp"
        os.makedirs(temp_dir, exist_ok=True)
        
        # We need a dummy ExcelExporter to create the initial file
        from src.scrapers.export import ExcelExporter
        exporter = ExcelExporter(export_dir=temp_dir)
        temp_filename = f"job_{job_id}_raw"
        raw_file_path = exporter.save(leads, filename_prefix=temp_filename)

        # 3. Trigger Enrichment (which now handles Screenshots and Cloud Sync)
        enrich_engine = AIEnrichmentEngine()
        logger.info(f"Job {job_id}: Starting AI Enrichment and Cloud Sync...")
        
        final_file = enrich_engine.process_file(
            input_path=raw_file_path,
            generate_screenshots=request.generate_screenshots,
            user_id=request.user_id
        )

        jobs[job_id] = "SUCCESS"
        logger.info(f"Job {job_id}: Pipeline completed successfully. Data synced to cloud.")

        # Cleanup temp files
        if os.path.exists(raw_file_path):
            os.remove(raw_file_path)
        if final_file and os.path.exists(final_file):
            os.remove(final_file)

    except Exception as e:
        jobs[job_id] = f"FAILED: {str(e)}"
        logger.error(f"Job {job_id} failed: {e}")

@app.get("/")
async def root():
    return {"status": "Lead Engine Worker Active", "version": "1.0.0"}

@app.post("/run-pipeline", response_model=JobStatus)
async def trigger_pipeline(request: PipelineRequest, background_tasks: BackgroundTasks):
    """
    Starts a background pipeline job.
    """
    job_id = str(uuid.uuid4())
    jobs[job_id] = "PENDING"
    
    background_tasks.add_task(run_full_pipeline, job_id, request)
    
    return JobStatus(
        job_id=job_id,
        status="PENDING",
        message="Pipeline job started in the background."
    )

@app.get("/job/{job_id}")
async def get_job_status(job_id: str):
    """
    Returns the status of a specific job.
    """
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {"job_id": job_id, "status": jobs[job_id]}

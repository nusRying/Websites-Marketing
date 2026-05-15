from src.job_store import JobStore


def test_job_store_memory_lifecycle():
    store = JobStore(use_database=False)

    created = store.create(
        "job-1",
        "user-1",
        {"niche": "plumber", "location": "London", "max_results": 10},
    )

    assert created["status"] == "PENDING"
    assert created["user_id"] == "user-1"
    assert created["completed_at"] is None

    updated = store.update("job-1", "RUNNING", "Scraping leads.")
    assert updated["status"] == "RUNNING"
    assert updated["message"] == "Scraping leads."

    finished = store.update("job-1", "SUCCESS", "Done.", output_file="exports/a.xlsx")
    assert finished["status"] == "SUCCESS"
    assert finished["completed_at"] is not None
    assert finished["output_file"] == "exports/a.xlsx"

    loaded = store.get("job-1")
    assert loaded is not None
    assert loaded["status"] == "SUCCESS"

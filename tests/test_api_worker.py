import pytest
from httpx import AsyncClient, ASGITransport
from src.api_worker import app, parse_allowed_origins


def test_parse_allowed_origins_from_csv():
    origins = parse_allowed_origins(
        "https://app.example.com, http://localhost:3000/, https://app.example.com"
    )
    assert origins == ["http://localhost:3000", "https://app.example.com"]


@pytest.mark.asyncio
async def test_root_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "status": "Lead Engine Worker Active",
        "version": "1.0.0",
    }


@pytest.mark.asyncio
async def test_run_pipeline_unauthorized():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/run-pipeline",
            json={"niche": "plumber", "location": "london", "user_id": "test-user"},
        )
    # Should be 401 because we haven't provided a Bearer token
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_job_status_requires_authentication():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/job/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 401

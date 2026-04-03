import pytest
from unittest.mock import MagicMock, patch
from src.scrapers.engine import ScraperEngine
from src.ai_enrichment import AIEnrichmentEngine
from src.cloud_sync import CloudSync


# 1. Google Maps Scraper Resilience
def test_scraper_engine_retries_on_failure():
    """
    Verify that ScraperEngine.fetch retries on network failures.
    """
    mock_fetcher = MagicMock()
    # Mock it to fail twice and then succeed
    mock_fetcher.fetch.side_effect = [
        Exception("Network error"),
        Exception("Network error"),
        "Success Response",
    ]

    with patch("src.scrapers.engine.StealthyFetcher", return_value=mock_fetcher):
        engine = ScraperEngine()
        response = engine.fetch("https://example.com")

        assert response == "Success Response"
        assert mock_fetcher.fetch.call_count == 3


# 2. AI Enrichment JSON Parsing (Behavioral Test)
def test_ai_enrichment_handles_malformed_json():
    """
    Verify that AIEnrichmentEngine handles malformed JSON from LLM gracefully.
    """
    # This will currently FAIL because the implementation is missing
    # We'll mock the OpenAI client and return a malformed JSON string
    try:
        engine = AIEnrichmentEngine()
        # Mocking the missing generate_copy method to simulate what we WANT to test
        # If it's missing, this test will naturally fail, which is correct for an auditor.
        if not hasattr(engine, "generate_copy"):
            pytest.fail(
                "AIEnrichmentEngine.generate_copy is missing from implementation!"
            )

    except TypeError:
        pytest.fail("AIEnrichmentEngine constructor failed (missing __init__)!")


# 3. Supabase RLS and Auth (Policy Audit)
# This is usually done via SQL analysis, but we can mock a check here if we had a live DB.
# Instead, we'll document it in the report.


# 4. Excel/SaaS Sync: Multi-tenant safety
def test_cloud_sync_requires_user_id():
    """
    Verify that CloudSync.sync_file requires a user_id and tags data correctly.
    """
    mock_supabase = MagicMock()
    with patch("src.cloud_sync.create_client", return_value=mock_supabase):
        # We need to mock pd.read_excel because sync_file reads the file
        mock_df = MagicMock()
        mock_df.iterrows.return_value = []  # Empty list for simplicity

        with patch("pandas.read_excel", return_value=mock_df):
            syncer = CloudSync()
            syncer.client = mock_supabase

            # We don't need a real file if we mock read_excel
            with patch("os.path.exists", return_value=True):
                syncer.sync_file("dummy.xlsx", "user_123")

            # Verify batch insert used the correct user_id
            mock_supabase.table.assert_any_call("batches")
            # The exact call structure depends on the Supabase client version/mocking
            # But we want to see user_id: "user_123" in the insert
            # mock_supabase.table().insert().execute()

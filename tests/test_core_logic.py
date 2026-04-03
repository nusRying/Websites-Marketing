import pandas as pd
import os
from unittest.mock import MagicMock, patch
from src.ai_enrichment import AIEnrichmentEngine
from src.scrapers.export import ExcelExporter


def test_excel_exporter_logic():
    exporter = ExcelExporter(export_dir="exports/test_cleanup")
    mock_leads = [
        {
            "name": "Elite Plumbers",
            "rating": "4.9 (100 reviews)",
            "category": "Plumber",
            "url": "https://maps.google.com/1",
        }
    ]

    path = exporter.save(mock_leads, filename_prefix="unit_test")
    assert os.path.exists(path)

    df = pd.read_excel(path)
    assert df.iloc[0]["Name"] == "Elite Plumbers"
    assert df.iloc[0]["Lead Quality"] == "ELITE"
    assert df.iloc[0]["No Website"] == "Yes"

    # Cleanup
    os.remove(path)
    os.rmdir("exports/test_cleanup")


@patch("src.ai_enrichment.OpenAI")
def test_ai_enrichment_mock(mock_openai):
    # Mock the OpenAI response
    mock_client = MagicMock()
    mock_openai.return_value = mock_client

    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(
            message=MagicMock(
                content='{"hero_title": "Test Title", "pain_point": "Test Pain"}'
            )
        )
    ]
    mock_client.chat.completions.create.return_value = mock_response

    engine = AIEnrichmentEngine(api_key="fake-key")
    lead = {"Name": "Test Biz", "Category": "Testing", "Address": "London"}

    result = engine.generate_copy(lead)

    assert result["hero_title"] == "Test Title"
    assert result["pain_point"] == "Test Pain"
    mock_client.chat.completions.create.assert_called_once()

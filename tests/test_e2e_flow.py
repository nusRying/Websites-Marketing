import os
import socket
from urllib.parse import urlparse

import pytest
from playwright.sync_api import expect, sync_playwright

BASE_URL = os.getenv("E2E_BASE_URL", "http://localhost:3000")


def server_is_running() -> bool:
    parsed = urlparse(BASE_URL)
    host = parsed.hostname or "127.0.0.1"
    port = parsed.port or (443 if parsed.scheme == "https" else 80)
    try:
        with socket.create_connection((host, port), timeout=2):
            return True
    except Exception:
        return False


@pytest.mark.skipif(not server_is_running(), reason="Next.js server is not running")
def test_login_page_load():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto(f"{BASE_URL}/login")

        title = page.locator("h1")
        assert "Welcome Back" in title.inner_text()

        email_input = page.locator('input[type="email"]')
        assert email_input.is_visible()

        browser.close()


@pytest.mark.skipif(not server_is_running(), reason="Next.js server is not running")
def test_local_demo_opens_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto(f"{BASE_URL}/login", wait_until="domcontentloaded")
        page.get_by_role("button", name="CONTINUE IN LOCAL DEMO").click()
        page.wait_for_url(f"{BASE_URL}/", wait_until="domcontentloaded")

        expect(page.get_by_text("Lead Pro")).to_be_visible(timeout=30000)
        expect(page.get_by_text("Bradford Local Services Demo").first).to_be_visible(timeout=30000)

        browser.close()


@pytest.mark.skipif(not server_is_running(), reason="Next.js server is not running")
def test_template_editor_canvas_loads():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.add_init_script("localStorage.setItem('onboarding_complete', 'true')")

        page.goto(f"{BASE_URL}/login", wait_until="domcontentloaded")
        page.get_by_role("button", name="CONTINUE IN LOCAL DEMO").click()
        page.wait_for_url(f"{BASE_URL}/", wait_until="domcontentloaded")

        page.get_by_text("Templates", exact=True).first.click()
        expect(page.get_by_role("heading", name="Template Studio")).to_be_visible(
            timeout=30000
        )
        page.get_by_text("Lead Machine (Default)").first.click()
        page.get_by_role("button", name="Enter Visual Editor").click()

        canvas = page.frame_locator('iframe[title="Editor Canvas"]').locator("body")
        expect(canvas).to_contain_text("Acme Services", timeout=30000)

        browser.close()


@pytest.mark.skipif(not server_is_running(), reason="Next.js server is not running")
def test_public_template_page_loads():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto(f"{BASE_URL}/preview?name=Demo%20Services&niche=Plumber&location=London")

        assert "Demo Services" in page.locator("body").inner_text()
        assert page.locator("body").is_visible()

        browser.close()

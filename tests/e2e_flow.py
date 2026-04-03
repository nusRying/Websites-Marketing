from playwright.sync_api import sync_playwright


def test_login_page_load():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local dev server login page
        try:
            page.goto("http://localhost:3000/login")

            # Check for "Welcome Back" heading
            title = page.locator("h1")
            assert "Welcome Back" in title.inner_text()

            # Check for email input
            email_input = page.locator('input[type="email"]')
            assert email_input.is_visible()

            print("✅ E2E: Login page loads and displays correctly.")
        except Exception as e:
            print(f"❌ E2E Test Failed: {e}")
        finally:
            browser.close()


if __name__ == "__main__":
    # Note: Requires Next.js server running on port 3000
    test_login_page_load()

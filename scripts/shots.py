import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000/"
out = Path(sys.argv[2] if len(sys.argv) > 2 else "docs/screens")
out.mkdir(parents=True, exist_ok=True)
views = {"desktop": (1440, 900), "tablet": (768, 1024), "mobile": (390, 844)}

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    for name, (w, h) in views.items():
        page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=2, reduced_motion="reduce")
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(1200)
        page.screenshot(path=str(out / f"{name}-hero.png"))
        total = page.evaluate("document.body.scrollHeight")
        for y in range(0, total, h // 2):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(150)
        page.wait_for_timeout(600)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(600)
        page.screenshot(path=str(out / f"{name}-full.png"), full_page=True)
        page.close()
    browser.close()
print("saved to", out)

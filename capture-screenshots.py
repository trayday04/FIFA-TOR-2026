#!/usr/bin/env python3
"""Capture JPEG screenshots of all main app screens."""

import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "screenshots"
PORT = 8765
BASE = f"http://127.0.0.1:{PORT}/index.html"
VIEWPORT = {"width": 390, "height": 844}


def start_server():
    return subprocess.Popen(
        [sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def wait_for_app(page):
    page.goto(BASE, wait_until="networkidle", timeout=60000)
    page.wait_for_selector("#bottomNav", timeout=30000)
    page.wait_for_timeout(800)


def shot(page, name):
    path = OUT / f"{name}.jpg"
    page.screenshot(path=str(path), type="jpeg", quality=90, full_page=False)
    print(f"  saved {path.name}")


def nav_to(page, view):
    page.click(f'#bottomNav button[data-view="{view}"]')
    page.wait_for_timeout(700)


def close_sheet(page):
    page.click(".sheet-close", timeout=5000)
    page.wait_for_function("() => !document.getElementById('scrim').classList.contains('open')")
    page.wait_for_timeout(300)


def main():
    OUT.mkdir(exist_ok=True)
    server = start_server()
    time.sleep(0.6)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport=VIEWPORT, device_scale_factor=2)
            wait_for_app(page)

            print("Capturing main screens…")
            shot(page, "01-matches-list")

            page.click('#matchSeg button[data-match-view="cal"]')
            page.wait_for_timeout(700)
            shot(page, "02-matches-calendar")

            nav_to(page, "events")
            shot(page, "03-events")

            nav_to(page, "stadiums")
            shot(page, "04-stadiums")

            nav_to(page, "teams")
            shot(page, "05-teams")

            print("Capturing detail sheets…")
            nav_to(page, "matches")
            page.click('#matchSeg button[data-match-view="list"]')
            page.wait_for_timeout(500)
            page.click("#view-list .card", timeout=10000)
            page.wait_for_selector("#scrim.open", timeout=10000)
            page.wait_for_timeout(400)
            shot(page, "06-match-detail")
            close_sheet(page)

            nav_to(page, "teams")
            page.click("#teamsMain .tcard", timeout=10000)
            page.wait_for_selector("#scrim.open", timeout=10000)
            page.wait_for_timeout(400)
            shot(page, "07-team-detail")
            close_sheet(page)

            nav_to(page, "stadiums")
            page.click("#stadiumsMain .stadium-card", timeout=10000)
            page.wait_for_selector("#scrim.open", timeout=10000)
            page.wait_for_timeout(400)
            shot(page, "08-stadium-detail")
            close_sheet(page)

            nav_to(page, "events")
            page.click("#eventsMain .ev-row", timeout=10000)
            page.wait_for_selector("#scrim.open", timeout=10000)
            page.wait_for_timeout(400)
            shot(page, "09-event-detail")

            browser.close()
    finally:
        server.terminate()
        server.wait(timeout=5)

    print(f"\nDone — {len(list(OUT.glob('*.jpg')))} JPEGs in {OUT}")


if __name__ == "__main__":
    main()

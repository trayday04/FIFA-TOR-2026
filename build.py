#!/usr/bin/env python3
"""Build FIFA WC26 packages: GitHub Pages (docs/) + offline zip (FIFA-WC26-Live/)."""
import base64
import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DOCS = ROOT / "docs"
OUT = ROOT / "FIFA-WC26-Live"
ZIP = ROOT / "FIFA-WC26-Live.zip"

COPY_FILES = (
    "index.html",
    "manifest.webmanifest",
    "app.js",
    "schedule.js",
    "toronto-events.js",
    "squads.js",
)
COPY_DIRS = ("assets",)

DRIVE_README = """FIFA World Cup 26 — Live App (Google Drive / Phone)
======================================================

IMPORTANT — HOW TO OPEN ON YOUR PHONE
  Do NOT use Google Drive's in-app preview. It only loads the HTML file and
  breaks scripts, events, and images.

  1. Download FIFA-WC26-Live.zip from Google Drive to your phone.
  2. Unzip it (Files app / Samsung My Files / etc.).
  3. Tap index.html and choose "Open with Chrome" (Android) or Safari (iPhone).

  Everything is inside index.html — no other files are required.

LIVE SCORES
  Keep Wi‑Fi or mobile data on. Scores refresh from FIFA every ~45 seconds.

REBUILD
  python3 build.py
  Then re-upload FIFA-WC26-Live.zip to Google Drive.
"""


def build_github_pages():
    """Multi-file site for GitHub Pages (HTTPS, live API, PWA install)."""
    if DOCS.exists():
        shutil.rmtree(DOCS)
    DOCS.mkdir()

    for name in COPY_FILES:
        src = ROOT / name
        if src.is_file():
            shutil.copy2(src, DOCS / name)

    for name in COPY_DIRS:
        src = ROOT / name
        if src.is_dir():
            shutil.copytree(src, DOCS / name)

    # Disable Jekyll so GitHub Pages serves assets as-is
    (DOCS / ".nojekyll").touch()

    (DOCS / "README.txt").write_text(
        "This folder is published by GitHub Pages.\n"
        "Live URL: https://trayday04.github.io/FIFA-TOR-2026/\n"
        "Rebuild: python3 build.py\n",
        encoding="utf-8",
    )


def build_standalone_html():
    html_src = (ROOT / "index.html").read_text(encoding="utf-8")
    css = re.search(r"<style>(.*?)</style>", html_src, re.S).group(1)

    woff2 = (ROOT / "assets/fonts/FWC26.woff2").read_bytes()
    logo = (ROOT / "assets/fwc26-logo.png").read_bytes()
    css = re.sub(
        r"@font-face\s*\{[^}]+\}",
        '@font-face { font-family:"FWC26"; src:url(data:font/woff2;base64,'
        + base64.b64encode(woff2).decode()
        + ') format("woff2"); font-weight:100 900; font-display:swap; }',
        css,
        count=1,
    )

    logo_b64 = base64.b64encode(logo).decode()
    body = re.search(r"<body>(.*)</body>", html_src, re.S).group(1).strip()
    body = re.sub(r'<script src="[^"]+"></script>\s*', "", body)
    body = body.replace(
        'src="assets/fwc26-logo.png"',
        f'src="data:image/png;base64,{logo_b64}"',
    )
    body = re.sub(r'<link rel="manifest" href="[^"]+" />\s*', "", body)
    body = re.sub(r'<link rel="apple-touch-icon" href="[^"]+" />\s*', "", body)

    js = "\n".join(
        (ROOT / name).read_text(encoding="utf-8")
        for name in ("schedule.js", "toronto-events.js", "squads.js", "app.js")
    )

    venue_dir = ROOT / "assets" / "venues"
    if venue_dir.is_dir():
        for img in sorted(venue_dir.glob("*.jpg")):
            data_url = "data:image/jpeg;base64," + base64.b64encode(img.read_bytes()).decode()
            js = js.replace(f"assets/venues/{img.name}", data_url)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#0a0a0a" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="data:image/png;base64,{logo_b64}" />
<title>FIFA World Cup 26&#8482; &middot; Matches</title>
<style>
{css}
</style>
</head>
<body>
{body}
<script>
{js}
</script>
</body>
</html>
"""


def build_offline_zip():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()

    standalone = build_standalone_html()
    (OUT / "index.html").write_text(standalone, encoding="utf-8")
    (OUT / "README.txt").write_text(DRIVE_README, encoding="utf-8")

    with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(OUT / "index.html", "FIFA-WC26-Live/index.html")
        z.write(OUT / "README.txt", "FIFA-WC26-Live/README.txt")


def main():
    build_github_pages()
    build_offline_zip()

    docs_kb = sum(f.stat().st_size for f in DOCS.rglob("*") if f.is_file()) // 1024
    html_kb = (OUT / "index.html").stat().st_size // 1024
    zip_kb = ZIP.stat().st_size // 1024
    print(f"github pages  {DOCS}/  ({docs_kb} KB)")
    print(f"offline zip   {ZIP}  ({zip_kb} KB, single HTML {html_kb} KB)")


if __name__ == "__main__":
    main()

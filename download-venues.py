#!/usr/bin/env python3
"""Download venue hero images — aerial stadiums + live FIFA 2026 Toronto activations."""
import argparse
import json
import time
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "assets" / "venues"
UA = "FIFA-WC26-Prototype/1.0 (local build)"
HERO_W, HERO_H = 1400, 788  # 16:9 for consistent hero crop

# Stadiums: Wikimedia aerial/overhead shots (similar elevated perspective)
STADIUM_AERIAL = {
    "MEX": "Estadio Azteca desde el aire 1.jpg",
    "GDL": "Estadio Akron, Guadalajara.jpg",
    "MTY": "Mexico Guadalupe Monterrey Estadio BBVA Bancomer fifa world cup 2026 2.JPG",
    "TOR": "url:https://www.toronto.ca/wp-content/uploads/2026/03/8f0e-SJ90022-1536x1024.jpg",
    "VAN": "BC Place (Vancouver).jpg",
    "ATL": "Overhead shot of Georgia Dome, New Falcons stadium construction site April 25, 2014.jpg",
    "BOS": "Gillette Stadium satellite view.png",
    "DAL": "AT&T Stadium (Arlington).jpg",
    "HOU": "Reliant park aerial.jpeg",
    "KAN": "Aerial view of Arrowhead Stadium 08-31-2013.jpg",
    "LAX": "SoFi Stadium (Inglewood).jpg",
    "MIA": "Sun Life Stadium aerial 2012 (cropped).jpg",
    "NYC": "Metlife stadium (Aerial view).jpg",
    "PHL": "Lincoln Financial Field (Aerial view) (cropped).jpg",
    "SFO": "Aerial view of California's Great Adventure and Levi's Stadium (4020).jpg",
    "SEA": "Aerial Qwest Field Aug 2009.jpg",
}

# Toronto event venues: recent FIFA 2026 activation photos (June 2026)
TORONTO_ACTIVATIONS = {
    "fanfest": "url:https://www.toronto.ca/wp-content/uploads/2026/06/9744-SJ90959-1536x865.jpg",
    "harbourfront": "url:https://cdn.assets.prezly.com/8d6a0d4a-0316-409d-9de5-c13651602694/-/resize/1600/Untitled%20design%20(16).png",
    "stackt": "url:https://www.torontomike.com/content/images/size/w1600/2026/06/studio.jpg",
    "nps": "url:https://www.toronto.ca/wp-content/uploads/2026/05/961f-FIFA-NPS.png",
}

VENUE_SOURCES = {**STADIUM_AERIAL, **TORONTO_ACTIVATIONS}


def wiki_thumb(filename, width=1400):
    title = "File:" + filename.replace(" ", "_")
    q = urllib.parse.urlencode(
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|thumburl",
            "iiurlwidth": str(width),
            "format": "json",
        }
    )
    url = "https://commons.wikimedia.org/w/api.php?" + q
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    data = json.load(urllib.request.urlopen(req, timeout=30))
    page = next(iter(data["query"]["pages"].values()))
    if "missing" in page:
        raise FileNotFoundError(filename)
    info = page["imageinfo"][0]
    return info.get("thumburl") or info.get("url")


def wiki_search_aerial(stadium_name):
    q = urllib.parse.urlencode(
        {
            "action": "query",
            "list": "search",
            "srsearch": f"{stadium_name} aerial",
            "srnamespace": "6",
            "format": "json",
            "srlimit": "8",
        }
    )
    req = urllib.request.Request(
        "https://commons.wikimedia.org/w/api.php?" + q,
        headers={"User-Agent": UA},
    )
    hits = json.load(urllib.request.urlopen(req, timeout=30))["query"]["search"]
    for hit in hits:
        title = hit["title"].replace("File:", "")
        if any(x in title.lower() for x in (".pdf", ".webm", ".svg", "logo")):
            continue
        if any(x in title.lower() for x in ("aerial", "aerea", "aére", "air", "drone", "satellite", "desde el aire", "fly-over", "overhead")):
            return title
    return hits[0]["title"].replace("File:", "") if hits else None


def fetch_bytes(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    data = urllib.request.urlopen(req, timeout=90).read()
    if len(data) < 5000 or data[:15].startswith(b"<!DOCTYPE") or data[:5].lower().startswith(b"<html"):
        raise ValueError(f"bad response ({len(data)} bytes)")
    return data


def normalize_hero(data):
    """Center-crop to 16:9 and resize for consistent hero cards."""
    try:
        from PIL import Image
    except ImportError:
        return data
    img = Image.open(BytesIO(data)).convert("RGB")
    w, h = img.size
    target_ratio = HERO_W / HERO_H
    current = w / h
    if current > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = max(0, (h - new_h) // 3 if h > w else (h - new_h) // 2)
        img = img.crop((0, top, w, min(h, top + new_h)))
    img = img.resize((HERO_W, HERO_H), Image.Resampling.LANCZOS)
    buf = BytesIO()
    img.save(buf, format="JPEG", quality=82, optimize=True)
    return buf.getvalue()


def resolve_source(key, spec):
    if spec.startswith("url:"):
        return spec[4:]
    if spec.startswith("wiki:"):
        spec = spec[5:]
    path = urllib.parse.quote(spec, safe="().'")
    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{path}?width=1600"


def download(key, spec, force=False):
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f"{key}.jpg"
    if dest.exists() and dest.stat().st_size > 5000 and not force:
        print(f"  {key}: cached ({dest.stat().st_size // 1024} KB)")
        return
    url = resolve_source(key, spec)
    data = fetch_bytes(url)
    data = normalize_hero(data)
    dest.write_bytes(data)
    print(f"  {key}: {len(data) // 1024} KB")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Re-download all images")
    args = parser.parse_args()
    print("Downloading venue images…")
    failed = []
    for key, spec in VENUE_SOURCES.items():
        try:
            download(key, spec, force=args.force)
            time.sleep(2.5)
        except Exception as err:
            print(f"  {key}: FAILED ({err})")
            failed.append(key)
    if failed:
        print("Failed:", ", ".join(failed))
        raise SystemExit(1)
    print(f"Saved {len(VENUE_SOURCES)} images to {OUT}")


if __name__ == "__main__":
    main()

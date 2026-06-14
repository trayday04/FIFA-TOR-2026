#!/usr/bin/env python3
"""Build squads.js from FIFA API + Wikipedia club data."""
import json
import re
import html as htmlmod
import unicodedata
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FIFA_URL = "https://api.fifa.com/api/v3/teams/squads/all/108/285023?count=500"
WIKI_PAGE_URL = (
    "https://en.wikipedia.org/w/api.php?action=parse&page=2026_FIFA_World_Cup_squads"
    "&prop=text&format=json"
)

WIKI_TO_FIFA = {
    "Czech Republic": "CZE",
    "South Korea": "KOR",
    "Korea Republic": "KOR",
    "Turkey": "TUR",
    "Türkiye": "TUR",
    "United States": "USA",
    "Ivory Coast": "CIV",
    "Côte d'Ivoire": "CIV",
    "Iran": "IRN",
    "IR Iran": "IRN",
    "DR Congo": "COD",
    "Congo DR": "COD",
    "Bosnia and Herzegovina": "BIH",
    "Cabo Verde": "CPV",
    "Cape Verde": "CPV",
    "Curaçao": "CUW",
    "Curacao": "CUW",
    "Germany": "GER",
    "Scotland": "SCO",
    "England": "ENG",
    "South Africa": "RSA",
    "New Zealand": "NZL",
    "Saudi Arabia": "KSA",
    "IR Iran": "IRN",
}

UA = "FIFA-WC26-Prototype/1.0 (educational)"


def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)


def strip_html(s):
    s = re.sub(r"<sup[^>]*>.*?</sup>", "", s, flags=re.S)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", htmlmod.unescape(s)).strip()


def norm_name(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"\([^)]*\)", "", s)
    s = re.sub(r"[^\w\s]", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()


def fifa_name_key(desc):
    parts = desc.strip().split()
    if len(parts) >= 2 and parts[-1].isupper() and len(parts[-1]) > 1:
        return norm_name(f"{parts[-1].title()}, {' '.join(parts[:-1]).title()}")
    return norm_name(desc)


def fifa_display_name(desc):
    parts = desc.strip().split()
    if len(parts) >= 2 and parts[-1].isupper() and len(parts[-1]) > 1:
        surname = parts[-1].title()
        given = " ".join(p if p.isupper() and len(p) <= 3 else p.title() for p in parts[:-1])
        return f"{given} {surname}".strip()
    return desc.title()


def parse_wiki_section(html):
    first_table = html.split("</table>")[0] + "</table>"
    by_num = {}
    by_name = {}
    for row in re.findall(r'<tr class="nat-fs-player">(.*?)</tr>', first_table, re.S):
        sort_m = re.search(r'data-sort-value="([^"]+)"', row)
        if not sort_m:
            continue
        sort_val = sort_m.group(1)
        if "," in sort_val:
            last, first = [x.strip() for x in sort_val.split(",", 1)]
            name_key = norm_name(f"{first} {last}")
        else:
            name_key = norm_name(sort_val)
        cells = re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)
        if len(cells) < 7:
            continue
        try:
            num = int(strip_html(cells[0]))
        except ValueError:
            num = None
        club_cell = cells[6]
        club_link = re.search(r'<a[^>]+title="([^"]+)"', club_cell)
        club = strip_html(club_link.group(1) if club_link else club_cell)
        club = re.sub(r"\s+F\.C\.$", "", club)
        club = re.sub(r"\s+FC$", "", club)
        by_name[name_key] = club
        if num is not None:
            by_num[num] = club
    return {"by_name": by_name, "by_num": by_num}


def load_wiki_clubs(fifa_names, html):
    all_clubs = {}

    def title_to_code(title):
        if title in WIKI_TO_FIFA:
            return WIKI_TO_FIFA[title]
        for name, code in fifa_names.items():
            if name.lower() == title.lower():
                return code
        return None

    # Split on h3 country headings (title may include inner spans)
    parts = re.split(r'<h3 id="([^"]+)"[^>]*>(.*?)</h3>', html, flags=re.S)
    # parts: [prefix, id1, title1, chunk1, id2, title2, chunk2, ...]
    for i in range(1, len(parts), 3):
        title = strip_html(parts[i + 1]).strip()
        chunk = parts[i + 2]
        if title.startswith("Group "):
            continue
        code = title_to_code(title)
        if not code:
            continue
        parsed = parse_wiki_section(chunk)
        if parsed["by_name"]:
            all_clubs[code] = parsed
            print(f"  wiki {title} -> {code}: {len(parsed['by_name'])} players")
    return all_clubs


def player_pos(p):
    loc = p.get("RealPositionLocalized") or p.get("PositionLocalized") or []
    if loc:
        return loc[0].get("Description", "Player")
    return "Player"


HEADSHOT = "?io=transform:fill,width:200,height:128,gravity:top"

def player_img(p):
    pic = p.get("PlayerPicture") or {}
    url = pic.get("PictureUrl")
    if url:
        return url + HEADSHOT
    return None


def main():
    print("Fetching FIFA squads…")
    raw_path = ROOT / "data" / "fifa_squads_raw.json"
    if raw_path.exists():
        fifa = json.loads(raw_path.read_text(encoding="utf-8"))
    else:
        fifa = fetch_json(FIFA_URL)
        raw_path.write_text(json.dumps(fifa), encoding="utf-8")

    print("Fetching Wikipedia clubs…")
    fifa_names = {t["TeamName"][0]["Description"]: t["IdCountry"] for t in fifa["Results"]}
    wiki_cache = ROOT / "data" / "wiki_squads.json"
    if wiki_cache.exists():
        html = json.loads(wiki_cache.read_text(encoding="utf-8"))["parse"]["text"]["*"]
    else:
        html = fetch_json(WIKI_PAGE_URL)["parse"]["text"]["*"]
        wiki_cache.write_text(json.dumps({"parse": {"text": {"*": html}}}), encoding="utf-8")
    wiki_clubs = load_wiki_clubs(fifa_names, html)

    squads = {}
    missing = 0
    for team in fifa["Results"]:
        code = team["IdCountry"]
        wiki_team = wiki_clubs.get(code, {})
        wiki_names = wiki_team.get("by_name", {})
        wiki_nums = wiki_team.get("by_num", {})
        players = []
        for p in sorted(team.get("Players", []), key=lambda x: x.get("JerseyNum") or 99):
            desc = p["PlayerName"][0]["Description"]
            name = fifa_display_name(desc)
            num = p.get("JerseyNum")
            key = norm_name(name)
            alt_key = fifa_name_key(desc)
            club = wiki_nums.get(num) or wiki_names.get(key) or wiki_names.get(alt_key)
            if not club:
                surname = norm_name(desc.split()[-1])
                matches = [c for k, c in wiki_names.items() if k.split()[-1:] == [surname] or k.endswith(" " + surname)]
                if len(matches) == 1:
                    club = matches[0]
                else:
                    missing += 1
                    club = ""
            players.append({
                "no": p.get("JerseyNum"),
                "n": name,
                "pos": player_pos(p),
                "club": club,
                "img": player_img(p),
            })
        squads[code] = players

    out = ROOT / "squads.js"
    out.write_text(
        "/* Official FIFA WC26 squads — photos from FIFA, clubs from Wikipedia */\n"
        "const SQUADS = "
        + json.dumps(squads, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {out} ({out.stat().st_size // 1024} KB, {missing} club lookups unmatched)")


if __name__ == "__main__":
    main()

# FIFA World Cup 26 — Toronto & Matches App

Mobile web app for the FIFA World Cup 2026™ schedule, live scores, team squads, and Toronto fan events.

## Live app (shareable link)

After GitHub Pages is enabled, the app is available at:

**https://trayday04.github.io/FIFA-TO-2026/**

Works on desktop and mobile in Chrome, Safari, or Edge. Requires internet for live scores, goal scorers, and player photos.

### Enable GitHub Pages (one-time)

1. Push this repository to GitHub (`main` branch).
2. Open **Settings → Pages** on the repo.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push any commit (or re-run the **Deploy GitHub Pages** workflow). The site will publish in ~1–2 minutes.

Alternatively, choose **Deploy from a branch**, branch **main**, folder **`/docs`**.

## Local development

Open `index.html` via a local server (not required for GitHub):

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Build outputs

```bash
python3 build.py
```

| Output | Purpose |
|--------|---------|
| `docs/` | **GitHub Pages** — multi-file site (push to GitHub) |
| `FIFA-WC26-Live/` + `.zip` | **Offline / Google Drive** — single self-contained HTML file |

## Project layout

```
index.html          App shell + styles
app.js              UI, live scores, goal timelines
schedule.js         Match schedule
toronto-events.js   Toronto fan events
squads.js           Team rosters
assets/             Fonts, logo, venue photos
build.py            Builds docs/ and FIFA-WC26-Live zip
```

## Live data

When online, the app polls the official FIFA API every ~45 seconds for scores and fetches goal scorers from match timelines.

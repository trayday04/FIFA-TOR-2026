/* ============================================================
   FIFA World Cup 26 — Matches app
   Self-contained schedule model + List / Calendar / Teams views
   ============================================================ */

/* ---------- Teams (48) across 12 groups A–L — official FIFA draw ---------- */
const T = {
  MEX:["Mexico","MX","MEX"],           RSA:["South Africa","ZA","RSA"],     KOR:["Korea Republic","KR","KOR"],   CZE:["Czechia","CZ","CZE"],
  CAN:["Canada","CA","CAN"],           SUI:["Switzerland","CH","SUI"],      QAT:["Qatar","QA","QAT"],            BIH:["Bosnia & Herzegovina","BA","BIH"],
  BRA:["Brazil","BR","BRA"],           MAR:["Morocco","MA","MAR"],          HAI:["Haiti","HT","HAI"],            SCO:["Scotland","GB-SCT","SCO"],
  USA:["USA","US","USA"],              PAR:["Paraguay","PY","PAR"],         AUS:["Australia","AU","AUS"],        TUR:["T\u00fcrkiye","TR","TUR"],
  GER:["Germany","DE","GER"],          CUW:["Cura\u00e7ao","CW","CUW"],     CIV:["C\u00f4te d'Ivoire","CI","CIV"], ECU:["Ecuador","EC","ECU"],
  NED:["Netherlands","NL","NED"],      JPN:["Japan","JP","JPN"],            TUN:["Tunisia","TN","TUN"],          SWE:["Sweden","SE","SWE"],
  ESP:["Spain","ES","ESP"],            CPV:["Cabo Verde","CV","CPV"],     KSA:["Saudi Arabia","SA","KSA"],     URU:["Uruguay","UY","URU"],
  BEL:["Belgium","BE","BEL"],          EGY:["Egypt","EG","EGY"],            IRN:["IR Iran","IR","IRN"],          NZL:["New Zealand","NZ","NZL"],
  FRA:["France","FR","FRA"],           SEN:["Senegal","SN","SEN"],          NOR:["Norway","NO","NOR"],           IRQ:["Iraq","IQ","IRQ"],
  ARG:["Argentina","AR","ARG"],        ALG:["Algeria","DZ","ALG"],          AUT:["Austria","AT","AUT"],          JOR:["Jordan","JO","JOR"],
  POR:["Portugal","PT","POR"],         UZB:["Uzbekistan","UZ","UZB"],       COL:["Colombia","CO","COL"],         COD:["Congo DR","CD","COD"],
  ENG:["England","GB-ENG","ENG"],      CRO:["Croatia","HR","CRO"],          GHA:["Ghana","GH","GHA"],            PAN:["Panama","PA","PAN"],
};

const GROUPS = {
  A:["MEX","RSA","KOR","CZE"],
  B:["CAN","SUI","QAT","BIH"],
  C:["BRA","MAR","HAI","SCO"],
  D:["USA","PAR","AUS","TUR"],
  E:["GER","CUW","CIV","ECU"],
  F:["NED","JPN","TUN","SWE"],
  G:["BEL","EGY","IRN","NZL"],
  H:["ESP","CPV","KSA","URU"],
  I:["FRA","SEN","NOR","IRQ"],
  J:["ARG","ALG","AUT","JOR"],
  K:["POR","UZB","COL","COD"],
  L:["ENG","CRO","GHA","PAN"],
};

/* ---------- Venues (16 host cities) ---------- */
/* etOffset = hours relative to US Eastern Time */
const V = {
  MEX:{city:"Mexico City",   stadium:"Estadio Azteca",            country:"Mexico",  off:-1, img:"assets/venues/MEX.jpg"},
  GDL:{city:"Guadalajara",   stadium:"Estadio Akron",             country:"Mexico",  off:-1, img:"assets/venues/GDL.jpg"},
  MTY:{city:"Monterrey",     stadium:"Estadio BBVA",              country:"Mexico",  off:-1, img:"assets/venues/MTY.jpg"},
  TOR:{city:"Toronto",       stadium:"Toronto Stadium",           country:"Canada",  off:0,  img:"assets/venues/TOR.jpg"},
  VAN:{city:"Vancouver",     stadium:"BC Place",                  country:"Canada",  off:-3, img:"assets/venues/VAN.jpg"},
  ATL:{city:"Atlanta",       stadium:"Mercedes-Benz Stadium",     country:"USA",     off:0,  img:"assets/venues/ATL.jpg"},
  BOS:{city:"Boston",        stadium:"Gillette Stadium",          country:"USA",     off:0,  img:"assets/venues/BOS.jpg"},
  DAL:{city:"Dallas",        stadium:"AT&T Stadium",              country:"USA",     off:-1, img:"assets/venues/DAL.jpg"},
  HOU:{city:"Houston",       stadium:"NRG Stadium",               country:"USA",     off:-1, img:"assets/venues/HOU.jpg"},
  KAN:{city:"Kansas City",   stadium:"Arrowhead Stadium",         country:"USA",     off:-1, img:"assets/venues/KAN.jpg"},
  LAX:{city:"Los Angeles",   stadium:"SoFi Stadium",              country:"USA",     off:-3, img:"assets/venues/LAX.jpg"},
  MIA:{city:"Miami",         stadium:"Hard Rock Stadium",         country:"USA",     off:0,  img:"assets/venues/MIA.jpg"},
  NYC:{city:"New York / NJ", stadium:"MetLife Stadium",           country:"USA",     off:0,  img:"assets/venues/NYC.jpg"},
  PHL:{city:"Philadelphia",  stadium:"Lincoln Financial Field",   country:"USA",     off:0,  img:"assets/venues/PHL.jpg"},
  SFO:{city:"Bay Area",      stadium:"Levi's Stadium",            country:"USA",     off:-3, img:"assets/venues/SFO.jpg"},
  SEA:{city:"Seattle",       stadium:"Lumen Field",               country:"USA",     off:-3, img:"assets/venues/SEA.jpg"},
};

const STADIUM_COUNTRY_GROUPS = [
  { country: "Canada", label: "Canada" },
  { country: "Mexico", label: "Mexico" },
  { country: "USA", label: "United States" },
];

const VENUE_IMAGES={
  fanfest:"assets/venues/fanfest.jpg",
  harbourfront:"assets/venues/harbourfront.jpg",
  stackt:"assets/venues/stackt.jpg",
  nps:"assets/venues/nps.jpg",
};

/* ---------- Helpers ---------- */
function flag(iso){
  if(iso==="GB-SCT") return "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F";
  if(iso==="GB-ENG") return "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F";
  return iso.replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
function teamObj(key){
  if(!key || !T[key]) return {key:null, name:key||"TBD", iso:null, code:key||"TBD", tbd:true, flag:"\u2753"};
  const [name,iso,code]=T[key];
  return {key, name, iso, code, tbd:false, flag:flag(iso)};
}
const MONTHS=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
const MONTHS_FULL=["January","February","March","April","May","June","July","August","September","October","November","December"];
const WDAY=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const WDAY_FULL=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function pad(n){ return n<10?"0"+n:""+n; }
function fmtTime(h,m){ const ap=h>=12?"PM":"AM"; let hh=h%12; if(hh===0)hh=12; return hh+(m?":"+pad(m):"")+" "+ap; }
function addHours(h, off){ return ((h+off)%24+24)%24; }

const TOURNAMENT_START = new Date(2026, 5, 11);
const TOURNAMENT_END = new Date(2026, 6, 19, 23, 59, 59);

function todayContext(){
  const now = new Date();
  const ymd = now.getFullYear()+"-"+pad(now.getMonth()+1)+"-"+pad(now.getDate());
  const inTournament = now >= TOURNAMENT_START && now <= TOURNAMENT_END;
  return { now, ymd, inTournament, month: now.getMonth(), day: now.getDate() };
}

function syncCalendarToToday(selectDay){
  const t = todayContext();
  if(!t.inTournament) return false;
  state.calMonth = t.month;
  if(selectDay) state.calSel = { month: t.month, day: t.day };
  return true;
}

function stickyHeaderHeight(){
  const v=getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim();
  if(v.endsWith("px")) return parseFloat(v);

  let h=0;
  const topbar=document.getElementById("mainTopbar");
  if(topbar) h+=topbar.offsetHeight;
  const head=matchesHeadEl();
  const matchesVisible=head && !document.getElementById("matchesShell").classList.contains("hidden");
  if(matchesVisible && head) h+=head.offsetHeight;
  else {
    const searchBar=activeSearchBar();
    if(searchBar) h+=searchBar.offsetHeight;
  }
  return h||120;
}

function scrollToDateSection(container, ymd, behavior="smooth"){
  if(!container || !ymd) return;
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      let el = container.querySelector('[data-ymd="'+ymd+'"]');
      if(!el){
        const els = [...container.querySelectorAll("[data-ymd]")];
        el = els.find(e => e.dataset.ymd >= ymd) || els[els.length - 1];
      }
      if(!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - stickyHeaderHeight();
      window.scrollTo({ top: Math.max(0, top), behavior });
    });
  });
}

function scrollToMatchCard(container, matchNo, behavior="smooth"){
  if(!container || matchNo == null) return;
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      const el = container.querySelector('.card[data-match="'+matchNo+'"]');
      if(!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - stickyHeaderHeight() - 8;
      window.scrollTo({ top: Math.max(0, top), behavior });
    });
  });
}

function findAnchorMatch(list){
  const { now } = todayContext();
  const sorted = list.slice().sort((a,b)=>a.dateObj-b.dateObj || a.no-b.no);

  const live = sorted.filter(m=>m.live);
  if(live.length) return live[live.length - 1];

  const finished = sorted.filter(m=>m.finished);
  if(finished.length) return finished[finished.length - 1];

  const inProgress = sorted.filter(m=>{
    const elapsed = now - m.dateObj;
    return elapsed >= 0 && elapsed <= 105 * 60 * 1000;
  });
  if(inProgress.length) return inProgress[inProgress.length - 1];

  return null;
}

function scrollToRecentMatchSection(container, opts={}){
  const t = todayContext();
  if(!container) return;
  const behavior = opts.instant ? "auto" : "smooth";
  const anchor = findAnchorMatch(filtered());
  if(anchor) scrollToMatchCard(container, anchor.no, behavior);
  else if(t.inTournament) scrollToDateSection(container, t.ymd, behavior);
}

function scrollToTodaySection(container){
  scrollToRecentMatchSection(container);
}

function goToListForDate(month, day){
  state.scrollToYmd = "2026-"+pad(month + 1)+"-"+pad(day);
  state.pendingScrollToday = null;
  setView("matches");
  setMatchView("list", {scroll:false});
}

/* ---------- Build schedule from official FIFA data ---------- */
function buildSchedule(){
  const all=OFFICIAL_MATCHES.map(m=>{
    const out={...m};
    const [mo,da]=out.dateMD.split("-").map(Number);
    out.dateObj=new Date(2026, mo-1, da, out.etHour, out.etMin);
    out.ymd="2026-"+pad(mo)+"-"+pad(da);
    return out;
  });
  all.sort((a,b)=>a.dateObj-b.dateObj || a.no-b.no);
  return all;
}

const MATCHES=buildSchedule();

/* ---------- Derived display helpers ---------- */
function homeTeam(m){ return m.home!==undefined && m.home!==null ? teamObj(m.home) : labelTeam(m.homeLabel); }
function awayTeam(m){ return m.away!==undefined && m.away!==null ? teamObj(m.away) : labelTeam(m.awayLabel); }
function labelTeam(lbl){ return {key:null,name:lbl,iso:null,code:lbl,tbd:true,flag:"\u2753"}; }

function localTime(m){
  const off=V[m.venue].off;
  const lh=addHours(m.etHour, off);
  return fmtTime(lh, m.etMin);
}
function etTime(m){ return fmtTime(m.etHour, m.etMin); }

function playerPhotoUrl(url){
  if(!url || url.indexOf("digitalhub.fifa.com") === -1) return url;
  return url.split("?")[0] + "?io=transform:fill,width:200,height:128,gravity:top";
}

function matchScoreHTML(m, large){
  if(m.live && m.homeScore != null && m.awayScore != null){
    const min = m.matchMinute ? `<span class="minute">${m.matchMinute}</span>` : "";
    return `<span class="status live-pulse">Live</span><span class="score live">${m.homeScore} \u2013 ${m.awayScore}</span>${min}`;
  }
  if(m.finished && m.homeScore != null){
    return `<span class="status">FT</span><span class="score ft">${m.homeScore} \u2013 ${m.awayScore}</span>`;
  }
  const cls=large?"time scheduled":"time";
  return `<span class="${cls}">${localTime(m)}</span><span class="vs">VS</span><span class="et">${etTime(m)} ET</span>`;
}

function escHtml(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
}

function formatScorerName(raw){
  return raw.trim().split(/\s+/).map(w=>{
    if(w.length <= 3 && w.includes(".")) return w;
    return w.charAt(0) + w.slice(1).toLowerCase();
  }).join(" ");
}

function parseGoalEvent(ev, homeIdTeam, awayIdTeam){
  if(ev.Type !== 0) return null;
  const desc = ev.EventDescription?.[0]?.Description || "";
  const m = desc.match(/^(.+?)\s+\([^)]+\)\s+scores/i);
  const name = formatScorerName(m ? m[1] : desc.split("(")[0].trim());
  const minute = ev.MatchMinute || "";
  let side = null;
  if(ev.IdTeam && homeIdTeam && ev.IdTeam === homeIdTeam) side = "home";
  else if(ev.IdTeam && awayIdTeam && ev.IdTeam === awayIdTeam) side = "away";
  if(!side || !name) return null;
  return { side, minute, name };
}

function goalsHTML(m){
  if(!(m.finished || m.live) || !m.goals?.length) return "";
  const home = m.goals.filter(g => g.side === "home");
  const away = m.goals.filter(g => g.side === "away");
  const col = (list, alignRight) => {
    if(!list.length) return `<span class="goal-none">\u2014</span>`;
    return list.map(g => `<span class="goal-line"><span class="gm">${escHtml(g.minute)}</span>${escHtml(g.name)}</span>`).join("");
  };
  return `<div class="goals"><div class="gcol">${col(home)}</div><div class="gcol">${col(away, true)}</div></div>`;
}

function goalsDetailHTML(m){
  if(!(m.finished || m.live) || !m.goals?.length) return "";
  const h = homeTeam(m), a = awayTeam(m);
  const block = (team, list) => {
    const rows = list.length
      ? list.map(g => `<li><span class="gm">${escHtml(g.minute)}</span>${escHtml(g.name)}</li>`).join("")
      : `<li style="color:var(--faint)">No goals</li>`;
    return `<div class="sh-goals-col"><h4>${team.flag} ${escHtml(team.name)}</h4><ul>${rows}</ul></div>`;
  };
  return `<div class="sh-goals"><div class="sh-goals-h">Goal scorers</div><div class="sh-goals-grid">${block(h, m.goals.filter(g => g.side === "home"))}${block(a, m.goals.filter(g => g.side === "away"))}</div></div>`;
}

function stageTag(m){
  if(m.stage==="group") return {cls:"group", txt:"Group "+m.group};
  if(m.stage==="final" && m.round==="Final") return {cls:"final", txt:"Final"};
  if(m.stage==="final" && m.round==="Third-place Play-off") return {cls:"ko", txt:"Third-place"};
  return {cls:"ko", txt:m.round};
}

function dateLong(m){
  const d=m.dateObj;
  return WDAY_FULL[d.getDay()]+", "+MONTHS_FULL[d.getMonth()]+" "+d.getDate();
}

/* ---------- State ---------- */
const SEARCH_PLACEHOLDERS={
  matches:"Search teams, groups, cities, stages\u2026",
  teams:"Search teams or groups\u2026",
  stadiums:"Search stadiums or cities\u2026",
  events:"Search venues, events, neighbourhoods\u2026",
};
let state={ view:"matches", matchView:"list", query:"", teamQuery:"", evQuery:"", stadiumQuery:"", calMonth:5, calSel:null, pendingScrollToday:null, scrollToYmd:null };

/* ---------- Live scores (FIFA API) ---------- */
const FIFA_MATCHES_URL = "https://api.fifa.com/api/v3/calendar/matches?count=500&idSeason=285023&language=en";
const LIVE_POLL_MS = 45000;
let livePollTimer = null;
let liveSyncing = false;
let goalsSyncing = false;
let anchorScrollAfterLive = false;

function isLiveStatus(st){
  return st === 3 || st === 4 || st === 5 || st === 6 || st === 7;
}

function applyLiveResults(rows){
  if(!rows || !rows.length) return false;
  const byNo = {};
  rows.forEach(r => { if(r.MatchNumber != null) byNo[r.MatchNumber] = r; });
  let changed = false;
  MATCHES.forEach(m => {
    const r = byNo[m.no];
    if(!r) return;
    const hs = r.HomeTeamScore != null ? r.HomeTeamScore : (r.Home && r.Home.Score != null ? r.Home.Score : null);
    const as = r.AwayTeamScore != null ? r.AwayTeamScore : (r.Away && r.Away.Score != null ? r.Away.Score : null);
    const st = r.MatchStatus;
    const finished = st === 0;
    const live = isLiveStatus(st);
    const patch = {
      homeScore: hs,
      awayScore: as,
      finished,
      live,
      matchMinute: live && r.MatchTime ? String(r.MatchTime).replace(/'+$/, "'") : null,
      idMatch: r.IdMatch || m.idMatch,
      homeIdTeam: r.Home?.IdTeam || m.homeIdTeam,
      awayIdTeam: r.Away?.IdTeam || m.awayIdTeam,
    };
    Object.keys(patch).forEach(k => {
      if(m[k] !== patch[k]){ m[k] = patch[k]; changed = true; }
    });
  });
  return changed;
}

async function fetchGoalsForMatch(m){
  if(!m.idMatch) return false;
  if(!m.finished && !m.live) return false;
  if((m.homeScore || 0) + (m.awayScore || 0) === 0 && !m.live) return false;
  try {
    const res = await fetch("https://api.fifa.com/api/v3/timelines/"+m.idMatch+"?language=en", { cache: "no-store" });
    if(!res.ok) return false;
    const data = await res.json();
    const goals = [];
    (data.Event || []).forEach(ev => {
      const g = parseGoalEvent(ev, m.homeIdTeam, m.awayIdTeam);
      if(g) goals.push(g);
    });
    const key = JSON.stringify(goals);
    if(key === m._goalsKey) return false;
    m._goalsKey = key;
    m.goals = goals;
    return true;
  } catch (_) {
    return false;
  }
}

async function syncGoals(){
  if(goalsSyncing) return;
  goalsSyncing = true;
  try {
    const targets = MATCHES.filter(m =>
      m.idMatch && (m.finished || m.live) && ((m.homeScore || 0) + (m.awayScore || 0) > 0 || m.live)
    );
    let changed = false;
    await Promise.all(targets.map(async m => {
      if(await fetchGoalsForMatch(m)) changed = true;
    }));
    if(changed){
      if(state.view==="events") renderTorontoEvents();
      else if(state.view==="stadiums") renderStadiums();
      else if(state.view==="teams") renderTeams();
      else if(state.view==="matches") renderMatchesContent();
    }
  } finally {
    goalsSyncing = false;
  }
}

async function fetchLiveScores(){
  if(liveSyncing) return;
  liveSyncing = true;
  try {
    const res = await fetch(FIFA_MATCHES_URL, { cache: "no-store" });
    if(!res.ok) return;
    const data = await res.json();
    const scoresChanged = applyLiveResults(data.Results);
    if(scoresChanged){
      if(state.view === "events") renderTorontoEvents();
      else if(state.view === "stadiums") renderStadiums();
      else if(state.view==="teams") renderTeams();
      else if(state.view==="matches") renderMatchesContent();
    }
    await syncGoals();
    if(anchorScrollAfterLive && state.view==="matches" && state.matchView==="list"){
      anchorScrollAfterLive=false;
      scrollToRecentMatchSection(document.getElementById("view-list"), {instant:true});
    }
  } catch (_) { /* offline or blocked — keep bundled scores */ }
  finally { liveSyncing = false; }
}

function startLiveSync(){
  fetchLiveScores();
  if(livePollTimer) clearInterval(livePollTimer);
  livePollTimer = setInterval(()=>{
    if(!document.hidden) fetchLiveScores();
  }, LIVE_POLL_MS);
  document.addEventListener("visibilitychange", ()=>{
    if(!document.hidden) fetchLiveScores();
  });
}

/* ---------- SVG icons ---------- */
const ICON_PIN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-6.5-5.5-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.5-6.5 10-6.5 10Z"/><circle cx="12" cy="11" r="2.4"/></svg>';
const ICON_CLOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const ICON_TROPHY='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 18h6M10 14.5V18M14 14.5V18M8 21h8"/></svg>';
const ICON_FLAG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>';
const ICON_MAP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-7-11a7 7 0 1 1 14 0c0 6.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const ICON_CLOSE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

function mapsDirUrl(meta){
  const dest=encodeURIComponent(meta.address);
  return "https://www.google.com/maps/dir/?api=1&destination="+dest+"&travelmode=transit";
}

/* ---------- Contextual search (scoped to active matches sub-view) ---------- */
const TEAM_ALIASES={
  tur:"türkiye turkey", cod:"congo dr congo democratic", kor:"korea south korea",
  cpv:"cabo verde cape verde", civ:"ivory coast cote ivoire", usa:"united states america",
  bih:"bosnia herzegovina", sco:"scotland", eng:"england", ger:"germany",
  ned:"netherlands holland", sui:"switzerland", cze:"czechia czech republic",
};

function matchSearchHay(m){
  const h=homeTeam(m), a=awayTeam(m), v=V[m.venue];
  return [
    h.name, h.code, h.key, TEAM_ALIASES[h.key]||"",
    a.name, a.code, a.key, TEAM_ALIASES[a.key]||"",
    v.city, v.stadium, v.country, m.venue,
    m.stage==="group" ? "group "+m.group : m.round,
    m.stage, "match "+m.no,
  ].join(" ").toLowerCase();
}

function matchMatchesQuery(m, q){
  if(!q) return true;
  return matchSearchHay(m).includes(q);
}

function teamMatchesQuery(t, g, q){
  if(!q) return true;
  return [t.name, t.code, t.key, "group "+g, TEAM_ALIASES[t.key]||""].join(" ").toLowerCase().includes(q);
}

function filtered(){
  const q=state.query.trim().toLowerCase();
  return MATCHES.filter(m=> matchMatchesQuery(m, q));
}

function updateSearchPlaceholder(){
  const input=document.getElementById("searchInput");
  if(input && state.view==="matches") input.placeholder=SEARCH_PLACEHOLDERS.matches;
}

/* ============================================================
   Rendering
   ============================================================ */
function el(html){ const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstChild; }

function matchCardHTML(m){
  const h=homeTeam(m), a=awayTeam(m), v=V[m.venue], tag=stageTag(m);
  return `
  <article class="card" data-match="${m.no}">
    <div class="meta">
      <span class="tag ${tag.cls}">${tag.txt}</span>
      <span class="mno">Match ${m.no}</span>
    </div>
    <div class="fixture">
      <div class="team ${h.tbd?'tbd':''}">
        <span class="flag">${h.flag}</span>
        <span class="nm">${h.name}</span>
      </div>
      <div class="center">
        ${matchScoreHTML(m,false)}
      </div>
      <div class="team ${a.tbd?'tbd':''}">
        <span class="flag">${a.flag}</span>
        <span class="nm">${a.name}</span>
      </div>
    </div>
    ${goalsHTML(m)}
    <div class="venue">${ICON_PIN}<span class="city">${v.city}</span><span>&middot; ${v.stadium}</span></div>
  </article>`;
}

function renderList(){
  const view=document.getElementById("view-list");
  const list=filtered().slice().sort((a,b)=>a.dateObj-b.dateObj || a.no-b.no);
  if(!list.length){ view.innerHTML=emptyHTML("No matches found","Try a different team, city or stage."); return; }
  let html="", curYmd=null;
  list.forEach(m=>{
    if(m.ymd!==curYmd){
      curYmd=m.ymd;
      const d=m.dateObj;
      const dayMatches=list.filter(x=>x.ymd===curYmd).length;
      html+=`<div class="daysep" data-ymd="${m.ymd}">
        <span class="dnum">${d.getDate()}</span>
        <span class="dwrap"><span class="dwk">${WDAY[d.getDay()]}</span><span class="dmo">${MONTHS_FULL[d.getMonth()]} 2026</span></span>
        <span class="dcount">${dayMatches} match${dayMatches>1?"es":""}</span>
      </div>`;
    }
    html+=matchCardHTML(m);
  });
  view.innerHTML=html;
  bindCards(view);
  if(state.scrollToYmd){
    const ymd = state.scrollToYmd;
    state.scrollToYmd = null;
    scrollToDateSection(view, ymd);
  } else if(state.pendingScrollToday==="list"){
    state.pendingScrollToday=null;
    scrollToRecentMatchSection(view, {instant:true});
  }
}

function emptyHTML(big,sub){
  return `<div class="empty"><div class="big">${big}</div><div>${sub}</div></div>`;
}

/* ---------- Calendar ---------- */
function renderCalendar(){
  const view=document.getElementById("view-cal");
  const list=filtered();
  const month=state.calMonth; // 5=June, 6=July
  const year=2026;
  const first=new Date(year,month,1);
  const startDow=first.getDay();
  const daysIn=new Date(year,month+1,0).getDate();

  // count matches per day for this month
  const byDay={};
  list.forEach(m=>{ if(m.dateObj.getMonth()===month) ((byDay[m.dateObj.getDate()] = byDay[m.dateObj.getDate()] || [])).push(m); });

  const today=new Date();
  const isToday=(d)=> today.getFullYear()===year && today.getMonth()===month && today.getDate()===d;

  let cells="";
  for(let i=0;i<startDow;i++) cells+=`<div class="cell empty-cell"></div>`;
  for(let d=1;d<=daysIn;d++){
    const ms=byDay[d]||[];
    const has=ms.length>0;
    const sel=state.calSel && state.calSel.month===month && state.calSel.day===d;
    const dots=Math.min(ms.length,3);
    let dotHTML="";
    for(let k=0;k<dots;k++) dotHTML+=`<span class="dot"></span>`;
    cells+=`<button class="cell ${has?'has':''} ${sel?'sel':''} ${isToday(d)?'today':''}" ${has?`data-day="${d}"`:'disabled'}>
      <span class="d">${d}</span>
      ${has?`<span class="dots">${dotHTML}</span>`:``}
      ${ms.length>3?`<span class="n">${ms.length}</span>`:``}
    </button>`;
  }

  const canPrev=month>5, canNext=month<6;
  let html=`
    <div class="calhead">
      <div class="mlabel">${MONTHS_FULL[month]} <em>2026</em></div>
      <div class="calnav">
        <button id="calPrev" ${canPrev?'':'disabled'} aria-label="Previous month"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m15 18-6-6 6-6"/></svg></button>
        <button id="calNext" ${canNext?'':'disabled'} aria-label="Next month"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
    </div>
    <div class="dow">${WDAY.map(w=>`<span>${w[0]}</span>`).join("")}</div>
    <div class="grid">${cells}</div>
    <div id="calDay"></div>`;
  view.innerHTML=html;

  document.getElementById("calPrev").onclick=()=>{ if(state.calMonth>5){state.calMonth--; state.calSel=null; renderCalendar();} };
  document.getElementById("calNext").onclick=()=>{ if(state.calMonth<6){state.calMonth++; state.calSel=null; renderCalendar();} };
  view.querySelectorAll(".cell[data-day]").forEach(c=>{
    c.onclick=()=> goToListForDate(month, +c.dataset.day);
  });

  const dayWrap=document.getElementById("calDay");
  const total=list.filter(m=>m.dateObj.getMonth()===month).length;
  dayWrap.innerHTML=`<div class="empty" style="padding:36px 20px"><div class="big">Tap a date</div><div>Opens that day\u2019s matches in the list view</div><div style="margin-top:8px;font-size:11px">${total} match${total>1?"es":""} in ${MONTHS_FULL[month]} 2026</div></div>`;
}

/* ---------- Teams ---------- */
function renderTeams(){
  const view=document.getElementById("teamsMain");
  const q=state.teamQuery.trim().toLowerCase();
  let html="";
  Object.keys(GROUPS).forEach(g=>{
    const members=GROUPS[g].map(teamObj).filter(t=> teamMatchesQuery(t,g,q));
    if(!members.length) return;
    html+=`<div class="section-label">Group ${g}</div><div class="tgrid">`;
    members.forEach(t=>{
      html+=`<button class="tcard" data-team="${t.key}">
        <span class="flag">${t.flag}</span>
        <span class="info"><span class="nm">${t.name}</span><span class="grp">Group <b>${g}</b></span></span>
      </button>`;
    });
    html+=`</div>`;
  });
  if(!html) html=emptyHTML("No teams found","Try another name.");
  view.innerHTML=html;
  view.querySelectorAll(".tcard").forEach(c=> c.onclick=()=>openTeam(c.dataset.team));
}

/* ============================================================
   Sheets (modals)
   ============================================================ */
const scrim=document.getElementById("scrim");
const sheet=document.getElementById("sheet");
function openSheet(html){
  sheet.innerHTML=`<button type="button" class="sheet-close" aria-label="Close">${ICON_CLOSE}</button><div class="sheet-scroll"><div class="grab"></div>`+html+`</div>`;
  sheet.querySelector(".sheet-close").onclick=closeSheet;
  scrim.classList.add("open");
  document.body.style.overflow="hidden";
}
function closeSheet(){ scrim.classList.remove("open"); document.body.style.overflow=""; }
scrim.addEventListener("click", e=>{ if(e.target===scrim) closeSheet(); });

function venueHero(url, caption){
  if(!url) return "";
  return `<div class="sh-hero"><img src="${url}" alt="" loading="lazy" /><div class="sh-hero-cap">${caption}</div></div>`;
}

function rosterHTML(key){
  const list=(typeof SQUADS!=="undefined" && SQUADS[key]) ? SQUADS[key] : [];
  if(!list.length) return `<div class="empty" style="padding:20px 0"><div class="big">Squad unavailable</div></div>`;
  return list.map(p=>{
    const photo=p.img
      ? `<img src="${playerPhotoUrl(p.img)}" alt="" loading="lazy" onerror="this.closest('.roster-photo').classList.add('ph')" />`
      : `<span class="ph-init">${(p.n||"?")[0]}</span>`;
    return `<div class="roster-row">
      <div class="roster-photo">${photo}</div>
      <div class="roster-body">
        <div class="roster-name">${p.n}</div>
        <div class="roster-meta"><span class="roster-no">#${p.no}</span> ${p.pos}</div>
        ${p.club?`<div class="roster-club">${p.club}</div>`:""}
      </div>
    </div>`;
  }).join("");
}

function bindTeamButtons(scope, closeFirst){
  scope.querySelectorAll("[data-team]").forEach(b=>{
    b.onclick=()=>{
      if(closeFirst) closeSheet();
      setTimeout(()=>openTeam(b.dataset.team), closeFirst?120:0);
    };
  });
}

function shTeamBlock(t, key, tappable){
  const inner=`<div class="flag">${t.flag}</div><div class="nm">${t.code}</div><div class="code">${t.name}</div>`;
  if(tappable && key) return `<button type="button" class="sh-team sh-team-btn" data-team="${key}">${inner}</button>`;
  return `<div class="sh-team ${t.tbd?"tbd":""}">${inner}</div>`;
}

function openMatch(no){
  const m=MATCHES.find(x=>x.no===+no); if(!m) return;
  if((m.finished || m.live) && !m.goals?.length && m.idMatch){
    fetchGoalsForMatch(m).then(changed => {
      if(changed && scrim.classList.contains("open")) openMatch(no);
    });
  }
  const h=homeTeam(m), a=awayTeam(m), v=V[m.venue], tag=stageTag(m);
  const html=`
    ${venueHero(v.img, v.stadium+" \u00b7 "+v.city)}
    <div class="sh-stage"><span class="tag ${tag.cls}">${tag.txt}</span></div>
    <div class="sh-fix">
      ${shTeamBlock(h, m.home, !h.tbd)}
      <div class="sh-center">${matchScoreHTML(m,true)}</div>
      ${shTeamBlock(a, m.away, !a.tbd)}
    </div>
    ${goalsDetailHTML(m)}
    <div class="sh-hint">Tap a team for squad</div>
    <div class="sh-info">
      <div class="sh-row">${ICON_CLOCK}<div><div class="l">Kick-off</div><div class="v">${dateLong(m)}, 2026 &middot; ${localTime(m)} local</div></div></div>
      <div class="sh-row">${ICON_PIN}<div><div class="l">Venue</div><div class="v">${v.stadium}</div></div></div>
      <div class="sh-row">${ICON_FLAG}<div><div class="l">Host city</div><div class="v">${v.city}, ${v.country}</div></div></div>
      <div class="sh-row">${ICON_TROPHY}<div><div class="l">Stage</div><div class="v">${m.stage==="group"?("Group "+m.group+" \u00b7 Matchday "+m.round):m.round} &middot; Match ${m.no}${m.finished?" \u00b7 Final "+m.homeScore+"\u2013"+m.awayScore:""}</div></div></div>
    </div>`;
  openSheet(html);
  bindTeamButtons(sheet, false);
}

function openTeam(key){
  const t=teamObj(key); if(!t.key) return;
  let grp=null; Object.keys(GROUPS).forEach(g=>{ if(GROUPS[g].includes(key)) grp=g; });
  const fixtures=MATCHES.filter(m=>m.stage==="group" && (m.home===key||m.away===key)).sort((a,b)=>a.dateObj-b.dateObj);
  let rows=fixtures.map(m=>{
    const opp = m.home===key ? awayTeam(m) : homeTeam(m);
    const v=V[m.venue]; const d=m.dateObj;
    return `<button class="tf-row" data-match="${m.no}">
      <div class="tf-date"><div class="dn">${d.getDate()}</div><div class="mo">${MONTHS[d.getMonth()]}</div></div>
      <div class="tf-opp"><span class="x">vs</span><span class="flag">${opp.flag}</span><span class="nm">${opp.name}</span></div>
      <div class="tf-meta"><div class="tm">${localTime(m)}</div><div class="ct">${v.city}</div></div>
    </button>`;
  }).join("");
  const html=`
    <div class="sh-team" style="text-align:center;margin-bottom:6px"><div class="flag" style="font-size:60px">${t.flag}</div></div>
    <div class="sh-title">${t.name}</div>
    <div style="text-align:center;margin:-10px 0 14px;color:var(--muted);font-size:13px">Group ${grp} &middot; 26-man squad</div>
    <div class="roster">${rosterHTML(key)}</div>
    ${fixtures.length?`<div class="sh-section">Group stage fixtures</div>${rows}`:""}`;
  openSheet(html);
  sheet.querySelectorAll(".tf-row").forEach(r=> r.onclick=()=>{ closeSheet(); setTimeout(()=>openMatch(r.dataset.match),120); });
}

function bindCards(scope){
  scope.querySelectorAll(".card[data-match]").forEach(c=> c.onclick=()=>openMatch(c.dataset.match));
}

/* ---------- Toronto events ---------- */
const VENUE_ICONS={ fanfest:"\u26bd", harbourfront:"\ud83c\udde8\ud83c\udde6", stackt:"\ud83d\udc5f", nps:"\ud83c\udfdb\ufe0f" };

function venueThumbHTML(venueId){
  const url=VENUE_IMAGES[venueId];
  if(!url) return `<div class="vicon">${VENUE_ICONS[venueId]||"\u2728"}</div>`;
  return `<div class="vicon ${venueId}"><img src="${url}" alt="" loading="lazy" /></div>`;
}

const VENUE_INFO={
  fanfest:{
    admission:"Free general admission \u2014 reserve tickets online in advance at torontofwc26.ca",
    zone:"Fort York National Historic Site & The Bentway (Main Stage, Ontario Campus, Garden Pavilion)",
    tips:"Live match broadcasts on big screens across all zones. 30+ food vendors. Premium tiers available.",
    url:"https://torontofwc26.ca/FIFAFanFestival",
  },
  harbourfront:{
    admission:"Free \u2014 walk-ups welcome; pre-register at canadasoccerhouse.ca on busy days",
    zone:"Harbourfront Centre West Campus, 235 Queens Quay W",
    tips:"Official Canada Soccer fan destination with big screens, activations, food and live entertainment.",
    url:"https://harbourfrontcentre.com/series/canada-soccer-house-2026/",
  },
  stackt:{
    admission:"Free \u2014 first-come, first-served. Closed Mondays.",
    zone:"28 Bathurst St (STACKT market outdoor screen)",
    tips:"13.5\u00d724 ft outdoor screen showing every World Cup match. adidas retail pop-up on site.",
    url:"https://stacktmarket.com/event/adidas-home-of-soccer-toronto/",
  },
  nps:{
    admission:"Free public viewing at City Hall",
    zone:"100 Queen St W \u2014 Nathan Phillips Square",
    tips:"Select live match broadcasts only (listed days). Visa mini-pitches and fan activations on site.",
    url:"https://www.toronto.ca/explore-enjoy/festivals-events/fifa-world-cup-26/match-broadcasts/",
  },
};

const CAT_DESC={
  match:"Live FIFA World Cup 26\u2122 match broadcast on venue screens. Join fellow fans for the full matchday atmosphere.",
  entertainment:"Live performance and DJ programming on the main stage as part of the festival lineup.",
  culture:"Cultural and community performance celebrating nations competing in the tournament.",
  experience:"Interactive fan activation, partner pavilion, or all-day experience at the venue.",
};

function eventCatLabel(cat){
  if(cat==="match") return "Watch Party";
  return cat;
}

let EVENT_CATALOG=null;
function getEventCatalog(){
  if(EVENT_CATALOG) return EVENT_CATALOG;
  const list=[];
  let id=0;
  TORONTO_EVENT_DAYS.forEach(day=>{
    day.venues.forEach(v=>{
      const meta=TORONTO_VENUES[v.id];
      v.events.forEach(e=>{
        list.push({id:id++, ...e, ymd:day.ymd, dayLabel:day.label, venueId:v.id, venueHours:v.hours, venueTag:v.tag||null, meta});
      });
    });
  });
  EVENT_CATALOG=list;
  return list;
}

function normName(s){
  return (s||"").toLowerCase().replace(/\s+/g," ").replace(/&/g,"and").replace(/['']/g,"").trim();
}

function teamKeyFromName(name){
  const n=normName(name);
  for(const key of Object.keys(T)){
    const [nm,,code]=T[key];
    if(normName(nm)===n || normName(code)===n) return key;
  }
  const alias={
    "bosnia and herzegovina":"BIH","bosnia herzegovina":"BIH","cote d ivoire":"CIV","ivory coast":"CIV",
    "korea republic":"KOR","south korea":"KOR","czech republic":"CZE","czechia":"CZE",
    "turkiye":"TUR","turkey":"TUR","usa":"USA","united states":"USA","iran":"IRN","ir iran":"IRN",
    "cape verde":"CPV","cabo verde":"CPV","curacao":"CUW","congo dr":"COD",
  };
  if(alias[n]) return alias[n];
  for(const key of Object.keys(T)){
    const hay=normName(T[key][0]);
    if(hay.includes(n) || n.includes(hay)) return key;
  }
  return null;
}

function parseTeamsFromTitle(title){
  let t=title.replace(/^Match Broadcast:\s*/i,"").replace(/^Doors open \u2014\s*/i,"").replace(/\s*watch party$/i,"").trim();
  if(!/\svs\.?\s/i.test(t)) return null;
  const p=t.split(/\svs\.?\s/i);
  if(p.length!==2) return null;
  return {home:teamKeyFromName(p[0].trim()), away:teamKeyFromName(p[1].trim()), label:t};
}

function findMatchForEvent(ev){
  const parsed=parseTeamsFromTitle(ev.title);
  if(parsed && parsed.home && parsed.away){
    return MATCHES.find(m=>m.home===parsed.home && m.away===parsed.away)
      || MATCHES.find(m=>m.home===parsed.away && m.away===parsed.home);
  }
  const tl=ev.title.toLowerCase();
  if(tl.includes("round of 32") || tl.includes("round of 16") || tl.includes("quarter") || tl.includes("semi") || tl.includes("final") || tl.includes("bronze") || tl.includes("championship")){
    const day=MATCHES.filter(m=>m.ymd===ev.ymd && m.venue==="TOR");
    if(day.length) return day[0];
    return MATCHES.find(m=>m.ymd===ev.ymd && (m.stage!=="group"));
  }
  return null;
}

function eventDescription(ev, linkedMatch){
  if(ev.cat==="match" && linkedMatch){
    const h=homeTeam(linkedMatch), a=awayTeam(linkedMatch);
    return `Watch ${h.name} vs ${a.name} live on the big screen. Official FIFA World Cup 26\u2122 fixture \u2014 Match ${linkedMatch.no}${linkedMatch.finished?" (Final "+linkedMatch.homeScore+"\u2013"+linkedMatch.awayScore+")":""}.`;
  }
  if(ev.cat==="match" && /watch parties|match day/i.test(ev.title)){
    return "Every World Cup match is shown on the venue screen. Drop in for the full tournament \u2014 stay for the atmosphere, food, and fan activations.";
  }
  if(ev.cat==="match") return CAT_DESC.match;
  if(ev.title.toLowerCase().includes("soundclash")) return "Kardinal Offishall\u2019s Soundclash Society \u2014 all-day DJ and artist programming on the main stage.";
  return CAT_DESC[ev.cat] || "Festival programming at "+ev.meta.name+".";
}

function openEventDetail(evId){
  const ev=getEventCatalog().find(x=>x.id===+evId);
  if(!ev) return;
  const info=VENUE_INFO[ev.venueId]||{};
  const linked=findMatchForEvent(ev);
  const dt=new Date(ev.ymd+"T12:00:00");
  let fixHTML="";
  if(linked && linked.home){
    const h=homeTeam(linked), a=awayTeam(linked);
    fixHTML=`<div class="ev-fix">
      <div class="team"><div class="flag">${h.flag}</div><div class="nm">${h.name}</div></div>
      <div class="vs">${linked.live && linked.homeScore!=null ? linked.homeScore+"\u2013"+linked.awayScore : linked.finished ? linked.homeScore+"\u2013"+linked.awayScore : "VS"}</div>
      <div class="team"><div class="flag">${a.flag}</div><div class="nm">${a.name}</div></div>
    </div>`;
  }
  const html=`
    ${venueHero(VENUE_IMAGES[ev.venueId], ev.meta.name+" \u00b7 "+ev.meta.place)}
    <div class="ev-detail-hdr">
      <span class="tag ${ev.cat==="match"?"group":"ko"}">${eventCatLabel(ev.cat)}</span>
      <div class="sh-title" style="font-size:19px;margin:8px 0 6px">${ev.title}</div>
      <div class="time">${ev.t}</div>
      <div class="date">${WDAY_FULL[dt.getDay()]}, ${MONTHS_FULL[dt.getMonth()]} ${dt.getDate()}, 2026${ev.venueTag?" \u00b7 "+ev.venueTag:""}</div>
    </div>
    ${fixHTML}
    <div class="ev-desc">${eventDescription(ev,linked)}</div>
    <div class="sh-info">
      <div class="sh-row">${ICON_PIN}<div><div class="l">Venue</div><div class="v">${ev.meta.name}</div></div></div>
      <div class="sh-row">${ICON_FLAG}<div><div class="l">Location</div><div class="v">${ev.meta.place} &middot; ${ev.meta.address}</div></div></div>
      <div class="sh-row">${ICON_CLOCK}<div><div class="l">Hours</div><div class="v">${ev.venueHours||"See festival schedule"}</div></div></div>
      <div class="sh-row">${ICON_TROPHY}<div><div class="l">Admission</div><div class="v">${info.admission||"See venue website"}</div></div></div>
      ${info.zone?`<div class="sh-row">${ICON_PIN}<div><div class="l">Zone</div><div class="v">${info.zone}</div></div></div>`:""}
      ${info.tips?`<div class="sh-row">${ICON_FLAG}<div><div class="l">Good to know</div><div class="v">${info.tips}</div></div></div>`:""}
      ${info.url?`<div class="sh-row">${ICON_CLOCK}<div><div class="l">Official info</div><div class="v"><a class="sh-link" href="${info.url}" target="_blank" rel="noopener">View on ${ev.meta.source||"website"}</a></div></div></div>`:""}
      <div class="sh-row">${ICON_MAP}<div><div class="l">Directions</div><div class="v"><a class="sh-link" href="${mapsDirUrl(ev.meta)}" target="_blank" rel="noopener">Open in Google Maps</a></div></div></div>
    </div>
    ${linked?`<button class="chip" style="width:100%;margin-top:14px;padding:12px" data-match="${linked.no}">View full match details</button>`:""}`;
  openSheet(html);
  const btn=sheet.querySelector("[data-match]");
  if(btn) btn.onclick=()=>{ closeSheet(); setTimeout(()=>openMatch(btn.dataset.match),120); };
}

function renderTorontoEvents(){
  const catalog=getEventCatalog();
  const view=document.getElementById("eventsMain");
  const q=state.evQuery.trim().toLowerCase();
  let html="";
  TORONTO_EVENT_DAYS.forEach(day=>{
    const venues=day.venues.map(v=>{
      const meta=TORONTO_VENUES[v.id];
      const events=v.events.filter(e=>{
        if(!q) return true;
        const hay=[meta.name,meta.place,meta.address,v.tag,e.title,e.t,e.cat,eventCatLabel(e.cat)].join(" ").toLowerCase();
        return hay.includes(q);
      });
      return events.length?{...v, meta, events}:null;
    }).filter(Boolean);
    if(!venues.length) return;
    const dt=new Date(day.ymd+"T12:00:00");
    html+=`<div class="ev-day" data-ymd="${day.ymd}">
      <div class="ev-dayhdr">
        <span class="dnum">${dt.getDate()}</span>
        <span class="dwrap"><span class="dwk">${WDAY[dt.getDay()]}</span><span class="dmo">${MONTHS_FULL[dt.getMonth()]} 2026</span></span>
      </div>`;
    venues.forEach(v=>{
      html+=`<article class="ev-venue">
        <div class="vhead">
          ${venueThumbHTML(v.id)}
          <div><div class="vname">${v.meta.name}</div><div class="vplace">${v.meta.place} &middot; ${v.meta.address}</div>${v.tag?`<span class="vtag">${v.tag}</span>`:""}</div>
          ${v.hours?`<div class="vhours">${v.hours}</div>`:""}
        </div>`;
      v.events.forEach(e=>{
        const evId=catalog.find(c=>c.ymd===day.ymd && c.venueId===v.id && c.t===e.t && c.title===e.title && c.cat===e.cat);
        html+=`<button type="button" class="ev-row" data-ev="${evId?evId.id:0}">
          <div class="et">${e.t}</div>
          <div><div class="etitle">${e.title}</div><span class="ecat ${e.cat}">${eventCatLabel(e.cat)}</span></div>
          <span class="chev" aria-hidden="true">\u203a</span>
        </button>`;
      });
      html+=`<div class="ev-foot"><a class="ev-map" href="${mapsDirUrl(v.meta)}" target="_blank" rel="noopener">Directions from your location</a></div>`;
      html+=`</article>`;
    });
    html+=`</div>`;
  });
  if(!html) html=emptyHTML("No events found","Try another venue or neighbourhood.");
  view.innerHTML=html;
  view.querySelectorAll(".ev-row[data-ev]").forEach(b=> b.onclick=()=>openEventDetail(b.dataset.ev));
  requestAnimationFrame(syncStickyOffsets);
  if(state.pendingScrollToday==="events"){
    state.pendingScrollToday=null;
    scrollToTodaySection(view);
  }
}

function stadiumList(){
  return Object.keys(V).map(k=>({key:k,...V[k]})).sort((a,b)=>a.stadium.localeCompare(b.stadium));
}

function stadiumMatchesQuery(s, q){
  if(!q) return true;
  const haystack=[s.stadium, s.city, s.country, s.key, s.country==="USA"?"United States":""].join(" ").toLowerCase();
  return haystack.includes(q);
}

function renderStadiumCard(s){
  const count=MATCHES.filter(m=>m.venue===s.key).length;
  const played=MATCHES.filter(m=>m.venue===s.key && m.finished).length;
  return `<button type="button" class="stadium-card" data-venue="${s.key}">
    <div class="thumb"><img src="${s.img}" alt="" loading="lazy" /></div>
    <div class="info">
      <div class="name">${s.stadium}</div>
      <div class="loc">${s.city}</div>
      <div class="meta">${count} match${count>1?"es":""}${played?` \u00b7 ${played} played`:""}</div>
    </div>
    <span class="chev" aria-hidden="true">\u203a</span>
  </button>`;
}

function renderStadiums(){
  const view=document.getElementById("stadiumsMain");
  const q=state.stadiumQuery.trim().toLowerCase();
  const filtered=stadiumList().filter(s=> stadiumMatchesQuery(s, q));
  if(!filtered.length){
    view.innerHTML=emptyHTML("No stadiums found","Try another name or city.");
    return;
  }
  let html="";
  STADIUM_COUNTRY_GROUPS.forEach(({country, label})=>{
    const list=filtered.filter(s=>s.country===country).sort((a,b)=>a.city.localeCompare(b.city));
    if(!list.length) return;
    html+=`<div class="section-label">${label}</div>`;
    list.forEach(s=>{ html+=renderStadiumCard(s); });
  });
  view.innerHTML=html;
  view.querySelectorAll(".stadium-card").forEach(b=> b.onclick=()=>openStadium(b.dataset.venue));
}

function openStadium(key){
  const v=V[key]; if(!v) return;
  const games=MATCHES.filter(m=>m.venue===key).sort((a,b)=>a.dateObj-b.dateObj || a.no-b.no);
  const played=games.filter(m=>m.finished).length;
  const rows=games.map(m=>matchCardHTML(m)).join("");
  const html=`
    ${venueHero(v.img, v.stadium+" \u00b7 "+v.city)}
    <div class="sh-title" style="font-size:20px;margin-bottom:4px">${v.stadium}</div>
    <div style="text-align:center;color:var(--muted);font-size:13px;margin-bottom:16px">${v.city}, ${v.country}</div>
    <div class="sh-info" style="margin-bottom:16px">
      <div class="sh-row">${ICON_PIN}<div><div class="l">Host city</div><div class="v">${v.city}</div></div></div>
      <div class="sh-row">${ICON_FLAG}<div><div class="l">Country</div><div class="v">${v.country}</div></div></div>
      <div class="sh-row">${ICON_TROPHY}<div><div class="l">Matches</div><div class="v">${games.length} scheduled${played?` \u00b7 ${played} completed`:""}</div></div></div>
      <div class="sh-row">${ICON_MAP}<div><div class="l">Directions</div><div class="v"><a class="sh-link" href="${mapsDirUrl({address:v.city+" "+v.stadium})}" target="_blank" rel="noopener">Open in Google Maps</a></div></div></div>
    </div>
    <div class="sh-section">All matches at this stadium</div>
    <div class="sh-matches">${rows||emptyHTML("No matches","Schedule TBD.")}</div>`;
  openSheet(html);
  bindCards(sheet.querySelector(".sh-matches")||sheet);
}

function matchesHeadEl(){
  return document.getElementById("matchesHead");
}

function activeSearchBar(){
  return document.querySelector("#matchesShell:not(.hidden) .matches-head > .topbar, #teamsShell:not(.hidden) .matches-head > .topbar, #stadiumsShell:not(.hidden) > .topbar, #eventsShell:not(.hidden) > .topbar");
}

function syncStickyOffsets(){
  const topbar=document.getElementById("mainTopbar");
  const head=matchesHeadEl();
  const root=document.documentElement;
  if(!topbar) return;

  const topH=Math.ceil(topbar.getBoundingClientRect().height);
  root.style.setProperty("--sticky-search-top", topH+"px");

  const matchesVisible=head && !document.getElementById("matchesShell").classList.contains("hidden");
  if(matchesVisible&&head){
    root.style.setProperty("--header-h", (topH+Math.ceil(head.getBoundingClientRect().height))+"px");
    return;
  }

  const searchBar=activeSearchBar();
  root.style.setProperty("--header-h", (topH+(searchBar?Math.ceil(searchBar.getBoundingClientRect().height):0))+"px");
}

function initStickyHeaderObserver(){
  if(typeof ResizeObserver==="undefined") return;
  const ro=new ResizeObserver(()=> syncStickyOffsets());
  if(initStickyHeaderObserver.ro) initStickyHeaderObserver.ro.disconnect();
  initStickyHeaderObserver.ro=ro;
  const topbar=document.getElementById("mainTopbar");
  const head=matchesHeadEl();
  if(topbar) ro.observe(topbar);
  if(head) ro.observe(head);
  document.querySelectorAll("#teamsShell .matches-head, #stadiumsShell > .topbar, #eventsShell > .topbar").forEach(el=> ro.observe(el));
}

function updateShellVisibility(){
  const onMatches=state.view==="matches";
  const onEvents=state.view==="events";
  const onStadiums=state.view==="stadiums";
  const onTeams=state.view==="teams";
  document.getElementById("matchesShell").classList.toggle("hidden", !onMatches);
  document.getElementById("stadiumsShell").classList.toggle("hidden", !onStadiums);
  document.getElementById("eventsShell").classList.toggle("hidden", !onEvents);
  document.getElementById("teamsShell").classList.toggle("hidden", !onTeams);
  document.body.classList.toggle("on-matches", onMatches);
  document.body.classList.toggle("on-events", onEvents);
  document.body.classList.remove("view-matches","view-list","view-cal","view-teams","view-stadiums","view-events");
  if(onEvents) document.body.classList.add("view-events");
  else if(onStadiums) document.body.classList.add("view-stadiums");
  else if(onTeams) document.body.classList.add("view-teams");
  else if(onMatches) document.body.classList.add("view-matches", "view-"+state.matchView);
  initStickyHeaderObserver();
  syncStickyOffsets();
}

function setMatchView(mv, opts={}){
  state.matchView=mv;
  document.getElementById("matchSeg").dataset.tab=mv;
  document.querySelectorAll("#matchSeg button").forEach(b=>b.classList.toggle("active", b.dataset.matchView===mv));
  document.querySelectorAll("#matchesMain .view").forEach(s=>s.classList.remove("active"));
  document.getElementById("view-"+mv).classList.add("active");
  document.body.classList.remove("view-list","view-cal");
  document.body.classList.add("view-"+mv);
  if(mv==="list" && !state.scrollToYmd) state.pendingScrollToday="list";
  else if(mv==="cal") syncCalendarToToday(true);
  renderMatchesContent();
  syncStickyOffsets();
  if(opts.scroll!==false && !state.scrollToYmd && mv!=="list") window.scrollTo({top:0});
}

function renderMatchesContent(){
  if(state.matchView==="list") renderList();
  else renderCalendar();
  requestAnimationFrame(syncStickyOffsets);
}

function scrollToPageTop(){
  window.scrollTo({top:0, behavior:"smooth"});
}

function handleNavTap(v){
  if(state.view===v){
    if(v==="matches" && state.matchView==="list"){
      scrollToRecentMatchSection(document.getElementById("view-list"));
      return;
    }
    scrollToPageTop();
    return;
  }
  setView(v);
}

function setView(v){
  state.view=v;
  if(v==="events"){
    state.pendingScrollToday="events";
    updateShellVisibility();
    renderTorontoEvents();
    window.scrollTo({top:0});
  } else if(v==="stadiums"){
    updateShellVisibility();
    renderStadiums();
    window.scrollTo({top:0});
  } else if(v==="teams"){
    updateShellVisibility();
    renderTeams();
    window.scrollTo({top:0});
  } else if(v==="matches"){
    updateSearchPlaceholder();
    updateShellVisibility();
    document.querySelectorAll("#matchesMain .view").forEach(s=>s.classList.remove("active"));
    document.getElementById("view-"+state.matchView).classList.add("active");
    if(state.matchView==="list" && !state.scrollToYmd) state.pendingScrollToday="list";
    else if(state.matchView==="cal") syncCalendarToToday(true);
    renderMatchesContent();
  }
  document.querySelectorAll("#bottomNav button").forEach(b=>b.classList.toggle("active", b.dataset.view===v));
}

document.querySelectorAll("#bottomNav button").forEach(b=> b.onclick=()=>handleNavTap(b.dataset.view));

const searchInput=document.getElementById("searchInput");
const searchBox=document.getElementById("searchBox");
const searchClear=document.getElementById("searchClear");
searchInput.addEventListener("input", ()=>{
  state.query=searchInput.value;
  searchBox.classList.toggle("has-value", !!searchInput.value);
  state.calSel=null;
  renderMatchesContent();
});
searchClear.addEventListener("click",(e)=>{ e.preventDefault(); searchInput.value=""; state.query=""; searchBox.classList.remove("has-value"); renderMatchesContent(); });

const evSearchInput=document.getElementById("evSearchInput");
const evSearchBox=document.getElementById("evSearchBox");
const evSearchClear=document.getElementById("evSearchClear");
evSearchInput.addEventListener("input", ()=>{
  state.evQuery=evSearchInput.value;
  evSearchBox.classList.toggle("has-value", !!evSearchInput.value);
  renderTorontoEvents();
});
evSearchClear.addEventListener("click",(e)=>{ e.preventDefault(); evSearchInput.value=""; state.evQuery=""; evSearchBox.classList.remove("has-value"); renderTorontoEvents(); });

document.querySelectorAll("#matchSeg button").forEach(b=> b.onclick=()=>{
  const mv=b.dataset.matchView;
  if(state.view==="matches" && state.matchView===mv){
    if(mv==="list") scrollToRecentMatchSection(document.getElementById("view-list"));
    else scrollToPageTop();
  }
  else setMatchView(mv);
});

window.addEventListener("resize", syncStickyOffsets, {passive:true});

const stadiumSearchInput=document.getElementById("stadiumSearchInput");
const stadiumSearchBox=document.getElementById("stadiumSearchBox");
const stadiumSearchClear=document.getElementById("stadiumSearchClear");
if(stadiumSearchInput){
  stadiumSearchInput.addEventListener("input", ()=>{
    state.stadiumQuery=stadiumSearchInput.value;
    stadiumSearchBox.classList.toggle("has-value", !!stadiumSearchInput.value);
    renderStadiums();
  });
  stadiumSearchClear.addEventListener("click",(e)=>{
    e.preventDefault();
    stadiumSearchInput.value="";
    state.stadiumQuery="";
    stadiumSearchBox.classList.remove("has-value");
    renderStadiums();
  });
}

const teamSearchInput=document.getElementById("teamSearchInput");
const teamSearchBox=document.getElementById("teamSearchBox");
const teamSearchClear=document.getElementById("teamSearchClear");
if(teamSearchInput){
  teamSearchInput.addEventListener("input", ()=>{
    state.teamQuery=teamSearchInput.value;
    teamSearchBox.classList.toggle("has-value", !!teamSearchInput.value);
    renderTeams();
  });
  teamSearchClear.addEventListener("click",(e)=>{
    e.preventDefault();
    teamSearchInput.value="";
    state.teamQuery="";
    teamSearchBox.classList.remove("has-value");
    renderTeams();
  });
}

document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeSheet(); });

/* init */
(function boot(){
  try {
    syncCalendarToToday(true);
    updateSearchPlaceholder();
    updateShellVisibility();
    state.pendingScrollToday="list";
    anchorScrollAfterLive=true;
    setView("matches");
    initStickyHeaderObserver();
    syncStickyOffsets();
    startLiveSync();
  } catch (err) {
    const msg=document.createElement("div");
    msg.style.cssText="padding:24px 16px;color:#fff;background:#3a1010;font:14px/1.5 sans-serif;";
    msg.innerHTML="<strong>App failed to start</strong><br>"+(err&&err.message?err.message:err);
    document.body.prepend(msg);
  }
})();

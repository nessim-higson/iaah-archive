#!/usr/bin/env python3
"""Mirror work.iamalwayshungry.com (Cargo 1, site 833, hegel template) to a
self-contained static folder, following the iaah-work port method:
crawl -> keep raw responses -> localize every asset -> rewrite links relative.
"""
import os, re, sys, time, urllib.parse, urllib.request, pathlib, json

BASE = "https://work.iamalwayshungry.com"
OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "2014-work")
RAW = OUT / "_port" / "raw"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      "Referer": BASE + "/"}

ASSET_HOSTS = {
    "payload.cargocollective.com": "assets/payload",
    "files.cargocollective.com": "assets/files",
    "static.cargocollective.com": "assets/static",
}

def fetch(url, binary=True, retries=3):
    req = urllib.request.Request(url, headers=UA)
    for i in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            return data
        except Exception as e:
            if i == retries - 1:
                print(f"  !! FAILED {url}: {e}")
                return None
            time.sleep(1 + i)

def save(path: pathlib.Path, data: bytes):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)

# ---------- 1. crawl pages (recursive same-origin discovery) ----------
seed = [l.strip() for l in open(sys.argv[2] if len(sys.argv) > 2 else "pages.txt")
        if l.strip().startswith("/") and not l.strip().startswith("//")]
queue = ["/"] + seed
seen_pages, pages = set(), {}   # path -> html str

EXCLUDE = re.compile(r"^/(?:_|rss|stylesheet|designs/|favicon|sitemap)")

def is_page_link(path):
    if EXCLUDE.search(path): return False
    if "." in path.rsplit("/", 1)[-1]: return False   # has extension -> asset
    return True

while queue:
    p = queue.pop(0)
    norm = p.rstrip("/") or "/"
    if norm in seen_pages: continue
    seen_pages.add(norm)
    url = BASE + ("" if norm == "/" else norm)
    print(f"page {norm}")
    data = fetch(url)
    if data is None: continue
    html = data.decode("utf-8", "replace")
    pages[norm] = html
    rawname = "home" if norm == "/" else norm.strip("/").replace("/", "__")
    save(RAW / (rawname + ".html"), data)
    # discover more same-origin pages
    for m in re.finditer(r'href="(/[^"#?]*)"', html):
        cand = urllib.parse.unquote(m.group(1)).rstrip("/") or "/"
        if is_page_link(cand) and cand not in seen_pages:
            queue.append(cand)
    # absolute self-links
    for m in re.finditer(r'href="https?://work\.iamalwayshungry\.com(/[^"#?]*)"', html):
        cand = urllib.parse.unquote(m.group(1)).rstrip("/") or "/"
        if is_page_link(cand) and cand not in seen_pages:
            queue.append(cand)

print(f"== {len(pages)} pages crawled ==")

# ---------- 2. collect asset URLs ----------
assets = set()          # absolute URLs
ATTR_RE = re.compile(r'(?:src|href|src_o|data-hi-res|data-src|data-image|poster|background)\s*=\s*["\']([^"\']+)["\']')
CSSURL_RE = re.compile(r'url\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)')

def add_asset(u, ctx_path="/"):
    u = u.strip()
    if not u or u.startswith(("data:", "mailto:", "javascript:", "#")): return
    if u.startswith("//"): u = "https:" + u
    if u.startswith("/"):
        u = BASE + u
    elif not u.startswith("http"):
        u = urllib.parse.urljoin(BASE + ctx_path, u)
    host = urllib.parse.urlparse(u).netloc
    path = urllib.parse.urlparse(u).path
    if host == "work.iamalwayshungry.com":
        if is_page_link(path): return           # page, not asset
        assets.add(u.split("?")[0].split("#")[0] + ("?stylesheet" if path == "/stylesheet" else ""))
    elif host in ASSET_HOSTS or host == "favicon.cargocollective.com":
        assets.add(u.split("?")[0].split("#")[0])

for norm, html in pages.items():
    for m in ATTR_RE.finditer(html):
        add_asset(m.group(1))
    for m in CSSURL_RE.finditer(html):          # inline style url()
        add_asset(m.group(1))

# ---------- 3. download assets; parse CSS/JS for more ----------
def local_path_for(url):
    pu = urllib.parse.urlparse(url)
    if pu.netloc == "work.iamalwayshungry.com":
        if pu.path == "/stylesheet": return OUT / "stylesheet.css"
        return OUT / pu.path.lstrip("/")
    if pu.netloc == "favicon.cargocollective.com":
        return OUT / "favicon.ico"
    return OUT / ASSET_HOSTS[pu.netloc] / pu.path.lstrip("/")

done = set()
def grab(url, depth=0):
    key = url.split("?")[0]
    if key in done: return
    done.add(key)
    lp = local_path_for(key if not url.endswith("?stylesheet") else url.replace("?stylesheet",""))
    real = key
    data = fetch(real)
    if data is None: return
    save(lp, data)
    if lp.suffix in (".css",) or lp.name == "stylesheet.css":
        txt = data.decode("utf-8", "replace")
        for m in CSSURL_RE.finditer(txt):
            u = m.group(1)
            if not u.startswith("data:"):
                add_asset(u, urllib.parse.urlparse(real).path)
    elif lp.suffix == ".js":
        txt = data.decode("utf-8", "replace")
        for m in re.finditer(r'["\'](/_gfx/[^"\']+?\.(?:png|gif|jpg|jpeg))["\']', txt):
            add_asset(m.group(1))

rounds = 0
while True:
    todo = [a for a in assets if a.split("?")[0] not in done]
    if not todo or rounds > 4: break
    rounds += 1
    print(f"== asset round {rounds}: {len(todo)} to fetch ==")
    for a in sorted(todo):
        grab(a)

print(f"== {len(done)} assets fetched ==")
json.dump(sorted(done), open(OUT / "_port" / "asset_urls.json", "w"), indent=1)
print("CRAWL COMPLETE")

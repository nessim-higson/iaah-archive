#!/usr/bin/env python3
"""Static rebuild of iaah.work from the harvested Cargo content model.

Reads:  harvest/model.json, harvest/layout_live.json, harvest/base_css_dump.css,
        member.css, harvest/asset_map.json, harvest/assets/, harvest/fonts/
Writes: <repo>/sites/iaah-work/  (homepage + 39 project pages + css/assets/fonts)
"""
import json, re, os, shutil, html as htmlmod

SP = os.path.dirname(os.path.abspath(__file__))
H = os.path.join(SP, "harvest")
OUT = "/Users/nessimhigson/CLAUDE/projects/prototypes/iaah-revival/sites/iaah-work"

model = json.load(open(os.path.join(H, "model.json")))
layout = json.load(open(os.path.join(H, "layout_live.json")))
asset_map = json.load(open(os.path.join(H, "asset_map.json")))  # full url -> local filename

# hash -> local filename (rendition-agnostic rewriting)
hash_map = {}
for url, fn in asset_map.items():
    m = re.search(r"/i/([0-9a-f]{16,})/", url)
    if m:
        hash_map[m.group(1)] = fn

FREIGHT = re.compile(r"(?:https?:)?//freight\.cargo\.site/[^\s\"'<>\\)]*?/i/([0-9a-f]{16,})/([^\s\"'<>\\)]+)")

def localize(s, depth):
    """Rewrite freight URLs to local asset paths. depth = dir depth of the page."""
    prefix = "../" * depth
    def sub(m):
        h = m.group(1)
        if h in hash_map:
            return prefix + "assets/" + hash_map[h]
        return m.group(0)
    return FREIGHT.sub(sub, s)

PAGE_URLS = {p["url"] for p in model["pages"]}

def fix_links(s, depth):
    """Internal page links -> folder-relative; strip SPA rel attrs."""
    prefix = "../" * depth
    def sub(m):
        quote, target = m.group(1), m.group(2)
        if target in PAGE_URLS:
            if target == "Home":
                return f'href={quote}{prefix if depth else "./"}{quote}' if depth else f'href={quote}./{quote}'
            return f"href={quote}{prefix}{target}/{quote}"
        return m.group(0)
    s = re.sub(r'href=(["\'])([^"\'#][^"\']*)\1', sub, s)
    s = s.replace(' rel="history"', "")
    return s

def render_page_container(content, did, classes, style=""):
    style_attr = f' style="{style}"' if style else ""
    return f'''<div class="page_container {classes}" local-style="{did}"{style_attr}>
  <div class="page container container_width clearfix" data-container="content" data-id="{did}">
    <bodycopy class="bodycopy content content_padding">
      <div class="page_content clearfix">{content}</div>
    </bodycopy>
  </div>
  <div class="page_background"></div>
</div>'''

def img_src_swap(s):
    """data-src -> src, add lazy loading."""
    s = re.sub(r'<img([^>]*?)\sdata-src="([^"]+)"', r'<img\1 loading="lazy" src="\2"', s)
    return s

# ---- thumbnail rows from live geometry ----
rows, cur, cur_top = [], [], None
for t in layout["all"]:
    if cur_top is None or abs(t["top"] - cur_top) < 60:
        cur.append(t)
        cur_top = t["top"] if cur_top is None else cur_top
    else:
        rows.append(cur); cur = [t]; cur_top = t["top"]
if cur: rows.append(cur)

wrap_widths = {}   # href -> exact cargo width value from live wrapper style
for t in layout["all"]:
    m = re.search(r"width:\s*([\d.]+)%", t.get("parentStyle") or "")
    wrap_widths[t["href"]] = m.group(1) if m else "50"

thumbs_by_url = {p["url"]: p for p in model["projects_index"]}

def thumb_grid(depth):
    prefix = "../" * depth
    out = ['<div class="thumbnails" data-view="Thumbnail"><div class="container thumbnails_width clearfix">']
    for row in rows:
        out.append('<div class="trow">')
        for t in row:
            pr = thumbs_by_url.get(t["href"])
            if not pr or not pr["thumb"]["hash"]:
                continue
            fn = hash_map.get(pr["thumb"]["hash"])
            w, hgt = pr["thumb"]["width"], pr["thumb"]["height"]
            out.append(
                f'<div class="thumbnail" style="width:{wrap_widths[t["href"]]}%">'
                f'<a class="image-link" href="{prefix}{t["href"]}/" title="{htmlmod.escape(pr["title_no_html"])}">'
                f'<img src="{prefix}assets/{fn}" width="{w}" height="{hgt}" loading="lazy" alt="{htmlmod.escape(pr["title_no_html"])}"></a></div>')
        out.append("</div>")
    out.append("</div></div>")
    return "\n".join(out)

# ---- pins ----
pins = model["pins"]
def pin_html(name, depth, extra=None):
    c = pins[name]["content"]
    c = localize(c, depth)
    c = fix_links(c, depth)
    c = img_src_swap(c)
    if extra:
        c = extra(c)
    return c

PROJECTS = [p for p in model["pages"] if not p["is_homepage"]]
ORDER = [p["url"] for p in PROJECTS]

def page_nav_for(idx, depth):
    nxt = ORDER[(idx + 1) % len(ORDER)]
    prefix = "../" * depth
    def rewire(c):
        c = re.sub(r'href="[^"]*"(\s+rel="home_page")', f'href="{prefix}"\\1', c)
        c = re.sub(r'href="[^"]*"(\s+rel="next_page")', f'href="{prefix}{nxt}/"\\1', c)
        return c
    return rewire

# ---- local css from page_options ----
def local_css(obj):
    po = obj.get("page_options") or {}
    css = po.get("local_css") or ""
    return css

HEAD_TMPL = '''<!DOCTYPE html>
<html lang="en" data-predefined-style="true" data-css-presets="true">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{prefix}assets/{ogimg}">
<link href="{prefix}assets/{favicon}" rel="shortcut icon">
<link href="{prefix}css/site.css" rel="stylesheet" type="text/css">
{local_css_block}
</head>
<body{bodyclass}>
<div class="main_container">
<div class="pinned pinned_top" data-view="pinned_top" style="height:0px">
{logo}
{topnav}
</div>
<div class="content_container">
<div data-view="Content"><div>
{content}
</div></div>
{thumbs}
</div>
<div class="pinned pinned_bottom" data-view="pinned_bottom">
{pagenav}
{footer}
</div>
</div>
</body>
</html>
'''

DESC = "A design studio focused on visual identity, creative direction, print design, websites and branding."
FAVICON = hash_map["9665ff5d40e8955150e0192fcc320f7595dc5228b8370f941704137ba0a31446"]
OGIMG = hash_map["74f8c9b794a92a7fc0d81eeb48d08dc5a332815bc2f534638ab20d3c5d908842"]

def build_page(page, idx=None):
    depth = 0 if page["is_homepage"] else 1
    prefix = "../" * depth
    content = page["content"]
    content = localize(content, depth)
    content = fix_links(content, depth)
    content = img_src_swap(content)
    body = render_page_container(content, page["id"], "")

    lc = []
    for src in [page] + [pins[k] for k in pins]:
        c = local_css(src)
        if c:
            lc.append(localize(c, depth))
    lcb = f"<style>{'\n'.join(lc)}</style>" if lc else ""

    logo = render_page_container(pin_html("Logo", depth), pins["Logo"]["id"],
                                 "overlay accommodate pin-top", "top:0;z-index:5")
    topnav = render_page_container(pin_html("Top Nav", depth), pins["Top Nav"]["id"],
                                   "overlay accommodate pin-top", "top:0;z-index:6")
    footer = render_page_container(pin_html("Footer", depth), pins["Footer"]["id"], "accommodate")
    pagenav = ""
    if idx is not None:
        pagenav = render_page_container(pin_html("Page Nav", depth, page_nav_for(idx, depth)),
                                        pins["Page Nav"]["id"], "accommodate")
    thumbs = thumb_grid(depth) if page["is_homepage"] else ""
    title = "IAAH" if page["is_homepage"] else f'{page["title"]} - IAAH'

    return HEAD_TMPL.format(
        title=htmlmod.escape(title), desc=DESC, prefix=prefix,
        ogimg=OGIMG, favicon=FAVICON, local_css_block=lcb,
        bodyclass=' class="homepage"' if page["is_homepage"] else "",
        logo=logo, topnav=topnav, content=body, thumbs=thumbs,
        pagenav=pagenav, footer=footer)

# ================= write output =================
os.makedirs(OUT, exist_ok=True)
for d in ("css", "assets", "fonts"):
    os.makedirs(os.path.join(OUT, d), exist_ok=True)

# css: base dump + member, cargo hosts rewritten to local
base = open(os.path.join(H, "base_css_dump.css")).read()
member = open(os.path.join(SP, "member.css")).read()
css = base + "\n\n/* ===== member stylesheet ===== */\n\n" + member
css = re.sub(r'https?://type\.cargo\.site/files/', "../fonts/", css)
css = re.sub(r'https?://static\.cargo\.site/assets/social/IconFont-Regular-[0-9.]+\.woff2',
             "../fonts/IconFont-Regular.woff2", css)
css = css.replace("https://static.cargo.site/assets/images/select-arrows.svg",
                  "../assets/select-arrows.svg")
css = localize(css, 1)

PORT_CSS = """
/* ===== port layer (replaces Cargo runtime layout JS) ===== */
html { font-size: 81%; }
@media (max-width: 900px) { html { font-size: 85%; } }
@media (max-width: 480px) { html { font-size: 66%; } }
html, body { background: rgb(0,0,0); }
body { font-size: 1rem; }
bodycopy.content_padding { padding: 1.9rem; }
.pinned_top { position: relative; }
.pinned_top .page_container { position: absolute; left: 0; right: 0; }
.pinned_bottom .page_container { position: relative; }
/* accommodate: overlay pins reserve space at the top of the content page */
div[data-view="Content"] .page_container { padding-top: 5.646rem; }
.page_content img { max-width: 100%; height: auto; }
.page_content [grid-col] img, .page_content > img { width: 100%; height: auto; }
.page_content iframe { max-width: 100%; }
.header-image img { width: 100%; height: auto; display: block; }
.thumbnails { position: relative; }
.thumbnails .trow { display: flex; justify-content: center; align-items: center; }
.thumbnails .thumbnail { box-sizing: border-box; padding: 0.9% 1.3%; }
.thumbnails .thumbnail img { width: 100%; height: auto; display: block; }
.thumbnails a.image-link { display: block; }
@media (max-width: 700px) {
  .thumbnails .trow { display: block; }
  .thumbnails .thumbnail { width: 100% !important; padding: 2.6% 1.3%; }
}
"""
open(os.path.join(OUT, "css", "site.css"), "w").write(css + PORT_CSS)

# assets + fonts
for fn in os.listdir(os.path.join(H, "assets")):
    shutil.copy2(os.path.join(H, "assets", fn), os.path.join(OUT, "assets", fn))
for fn in os.listdir(os.path.join(H, "fonts")):
    shutil.copy2(os.path.join(H, "fonts", fn), os.path.join(OUT, "fonts", fn))

# pages
home = next(p for p in model["pages"] if p["is_homepage"])
open(os.path.join(OUT, "index.html"), "w").write(build_page(home))
for i, p in enumerate(PROJECTS):
    d = os.path.join(OUT, p["url"])
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w").write(build_page(p, idx=i))

# /Home -> site root redirect (original URL existed)
os.makedirs(os.path.join(OUT, "Home"), exist_ok=True)
open(os.path.join(OUT, "Home", "index.html"), "w").write(
    '<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=../">'
    '<link rel="canonical" href="../"><title>IAAH</title>')

print("built:", OUT)
print("pages:", 1 + len(PROJECTS), "+ /Home redirect")

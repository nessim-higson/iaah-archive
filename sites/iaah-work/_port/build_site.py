#!/usr/bin/env python3
"""Static rebuild of iaah.work from the harvested Cargo content model.

Reads:  harvest/model.json, harvest/layout_live.json, harvest/base_css_dump.css,
        member.css, harvest/asset_map.json, harvest/assets/, harvest/fonts/
Writes: <repo>/sites/iaah-work/  (homepage + 39 project pages + css/assets/fonts)
"""
import json, re, os, shutil, html as htmlmod, urllib.parse

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

# freight renditions fetched alongside originals: content pages serve w1500
# (originals stay in assets/ as the archival copy), collage thumbs serve w750
rend = json.load(open(os.path.join(H, "renditions.json")))
w1500_map = {h: f"w1500/{h[:8]}-{n}" for h, n in rend["w1500"].items()}
w750_map = {h: f"w750/{h[:8]}-{n}" for h, n in rend["w750"].items()}

FREIGHT = re.compile(r"(?:https?:)?//freight\.cargo\.site/[^\s\"'<>\\)]*?/i/([0-9a-f]{16,})/([^\s\"'<>\\)]+)")

def localize(s, depth, renditions=False):
    """Rewrite freight URLs to local asset paths. depth = dir depth of the page.
    renditions=True prefers the w1500 copy where one exists."""
    prefix = "../" * depth
    def sub(m):
        h = m.group(1)
        if renditions and h in w1500_map:
            return prefix + "assets/" + w1500_map[h]
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
    """data-src -> src + lazy loading, then Cargo's sizing rules:
    - data-scale=N  -> width N% of container, never upscaled past natural
    - otherwise     -> width = min(container, natural)  (Cargo elementresizer)
    Tags that already carry a style= (set by the gallery renderer) are left
    untouched — gallery placement supersedes these rules."""
    s = re.sub(r'<img([^>]*?)\sdata-src="([^"]+)"', r'<img\1 loading="lazy" src="\2"', s)
    def size(m):
        tag = m.group(0)
        if 'style="' in tag:
            return tag
        ds = re.search(r'data-scale="(\d+)"', tag)
        wo = re.search(r'width_o="(\d+)"', tag)
        if ds:
            cap = f';max-width:{wo.group(1)}px' if wo else ""
            style = f"width:{ds.group(1)}%{cap}"
        elif wo:
            style = f"width:100%;max-width:{wo.group(1)}px;height:auto"
        else:
            return tag
        return re.sub(r"\s*/?>$", f' style="{style}">', tag)
    s = re.sub(r"<img[^>]*>", size, s)
    return s

def render_galleries(s):
    """Replace Cargo <div class="image-gallery" data-gallery="..."> blocks
    (laid out by Cargo JS on the live site) with statically positioned markup.
    meta_data percentages are relative to the gallery container; y and the
    container height share width-relative units."""
    out, pos = [], 0
    for g in re.finditer(r'<div class="image-gallery" data-gallery="([^"]+)">', s):
        d = json.loads(urllib.parse.unquote(g.group(1)))
        close = s.index("</div>", g.end())
        inner = s[g.end():close]
        imgs = re.findall(r"<img[^>]*>", inner)
        out.append(s[pos:g.start()])
        out.append(render_gallery(d, imgs))
        pos = close + len("</div>")
    out.append(s[pos:])
    return "".join(out)

def gal_img(tag, style):
    """Prepare a gallery child img: gallery placement owns sizing, so strip
    data-scale and pin an explicit style (img_src_swap skips styled tags)."""
    tag = re.sub(r'\s*data-scale="\d+"', "", tag)
    return re.sub(r"\s*/?>$", f' style="{style}">', tag)

def render_gallery(d, imgs):
    data = d.get("data") or {}
    md = data.get("meta_data") or {}
    mode = d.get("mode_id")
    has_xy = any(("x" in v or "y" in v) for v in md.values())
    if mode in (4, 5) and md and has_xy:  # montessori: absolute % placement
        maxy = data.get("max_y") or data.get("height") or 100
        kids = []
        for i, tag in enumerate(imgs):
            m0 = md.get(str(i)) or {}
            w, x, y = m0.get("width", 100), m0.get("x", 0), m0.get("y", 0)
            top = (y / maxy * 100) if maxy else 0
            kids.append(f'<div class="gal-item" style="position:absolute;'
                        f'left:{x:.4f}%;top:{top:.4f}%;width:{w:.4f}%;'
                        f'z-index:{m0.get("z", i + 1)}">'
                        + gal_img(tag, "width:100%;max-width:none;height:auto;display:block")
                        + "</div>")
        return (f'<div class="image-gallery initialized ported" style="position:relative;'
                f'height:0;padding-bottom:{maxy:.4f}%">' + "".join(kids) + "</div>")
    if mode == 5:  # responsive freeform: stacked rows at natural image size,
        # bleeding past the content column and clipped at the viewport (as live)
        pad = float(str(data.get("image_padding") or 2))
        kids = []
        for t in imgs:
            t = t.replace("assets/w1500/", "assets/")  # natural size needs the original
            wo = re.search(r'width_o="(\d+)"', t)
            w = f"width:{wo.group(1)}px" if wo else "width:auto"
            kids.append(f'<div class="gal-item" style="margin-bottom:{pad}%">'
                        + gal_img(t, f"{w};max-width:none;height:auto;display:block")
                        + "</div>")
        kids = "".join(kids)
        return ('<div class="image-gallery initialized ported-rows" style="text-align:left">'
                + kids + "</div>")
    # columns mode (2): N per row, gaps between columns only
    cols = int(str(data.get("columns") or 2))
    pad = float(str(data.get("image_padding") or 1))
    iw = (100 - pad * (cols - 1)) / cols
    kids = "".join(f'<div class="gal-item" style="width:{iw:.4f}%;'
                   f'margin-bottom:{pad}%">'
                   + gal_img(t, "width:100%;max-width:none;height:auto;display:block")
                   + "</div>" for t in imgs)
    return ('<div class="image-gallery initialized ported" style="display:flex;'
            'flex-wrap:wrap;justify-content:space-between">' + kids + "</div>")

# ---- thumbnail collage: absolute placement from live-captured geometry ----
# The live homepage is a staggered freeform canvas (items overlap vertical
# bands); everything scales proportionally with viewport width, so the
# captured 1440px rects convert directly to container-relative percentages.
CONT_W = layout["contW"]
CONT_H = layout["contH"]

thumbs_by_url = {p["url"]: p for p in model["projects_index"]}

def thumb_grid(depth):
    prefix = "../" * depth
    out = [f'<div class="thumbnails" data-view="Thumbnail">'
           f'<div class="pgrid" style="position:relative;height:0;'
           f'padding-bottom:{CONT_H / CONT_W * 100:.3f}%">']
    for t in layout["all"]:
        pr = thumbs_by_url.get(t["href"])
        if not pr or not pr["thumb"]["hash"]:
            continue
        fn = w750_map.get(pr["thumb"]["hash"]) or hash_map.get(pr["thumb"]["hash"])
        w, hgt = pr["thumb"]["width"], pr["thumb"]["height"]
        l_pct = t["left"] / CONT_W * 100
        t_pct = t["top"] / CONT_H * 100  # CSS top:% resolves against container height
        w_pct = t["w"] / CONT_W * 100
        title = htmlmod.escape(pr["title_no_html"])
        out.append(
            f'<div class="pthumb" style="position:absolute;left:{l_pct:.4f}%;'
            f'top:{t_pct:.4f}%;width:{w_pct:.4f}%">'
            f'<a href="{prefix}{t["href"]}/" title="{title}">'
            f'<img src="{prefix}assets/{fn}" width="{w}" height="{hgt}" '
            f'loading="lazy" alt="{title}"></a></div>')
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
<link href="{prefix}css/site.css?v={cssv}" rel="stylesheet" type="text/css">
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
<script>
/* Cargo scroll transition: imagery below the fold fades/rises in on scroll */
(function () {{
  var els = document.querySelectorAll('.page_content img, .pthumb');
  var vh = window.innerHeight;
  var pend = [];
  els.forEach(function (el) {{
    if (el.getBoundingClientRect().top > vh) {{
      el.classList.add('scroll-transition-fade', 'below-viewport');
      pend.push(el);
    }}
  }});
  if (!('IntersectionObserver' in window)) {{
    pend.forEach(function (e) {{ e.classList.remove('below-viewport'); }});
    return;
  }}
  var io = new IntersectionObserver(function (entries) {{
    entries.forEach(function (en) {{
      if (en.isIntersecting) {{
        en.target.classList.remove('below-viewport');
        io.unobserve(en.target);
      }}
    }});
  }}, {{ rootMargin: '0px 0px -60px 0px' }});
  pend.forEach(function (e) {{ io.observe(e); }});
}})();
</script>
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
    content = localize(content, depth, renditions=True)
    content = fix_links(content, depth)
    content = render_galleries(content)
    content = img_src_swap(content)
    # the first image is the hero — load it eagerly, everything else stays lazy
    content = content.replace('loading="lazy"', 'loading="eager" fetchpriority="high"', 1)
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
    # Cargo "project scroll": the full index collage is appended below every
    # project too, so scrolling past a project loops back to the landing grid.
    thumbs = thumb_grid(depth)
    title = "IAAH" if page["is_homepage"] else f'{page["title"]} - IAAH'

    return HEAD_TMPL.format(
        title=htmlmod.escape(title), desc=DESC, prefix=prefix, cssv=CSS_VERSION,
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
.page_content iframe { max-width: 100%; }
.content_container { overflow-x: clip; }
.header-image img { width: 100%; height: auto; display: block; }
/* collage grid — port-owned class names so Cargo's base CSS (.container,
   .thumbnail, .image-link are all live Cargo classnames) cannot interfere.
   Absolute staggered placement captured from the live 1440px render; all
   values are %-of-width so the canvas scales proportionally, as live does. */
.thumbnails { position: relative; }
.pthumb a { display: block; }
.pthumb img { width: 100%; height: auto; display: block; }
@media (max-width: 700px) {
  .pgrid { height: auto !important; padding-bottom: 0 !important; }
  .pthumb { position: static !important; width: 100% !important; margin: 0 0 4%; }
}
/* scroll transition, unscoped so it also covers the collage thumbnails */
.scroll-transition-fade { transition: transform 1s ease-in-out, opacity 0.8s ease-in-out; }
.scroll-transition-fade.below-viewport { opacity: 0; transform: translateY(40px); }
/* statically ported Cargo galleries (base CSS hides raw gallery children) */
.image-gallery.ported img { display: block; width: 100%; height: auto; }
@media (max-width: 700px) {
  .image-gallery.ported { height: auto !important; padding-bottom: 0 !important;
    display: block !important; }
  .image-gallery.ported .gal-item { position: static !important;
    width: 100% !important; margin: 0 0 4% !important; }
}
"""
full_css = css + PORT_CSS
import hashlib
CSS_VERSION = hashlib.sha1(full_css.encode()).hexdigest()[:8]
open(os.path.join(OUT, "css", "site.css"), "w").write(full_css)

# assets + fonts (+ rendition tiers)
for fn in os.listdir(os.path.join(H, "assets")):
    shutil.copy2(os.path.join(H, "assets", fn), os.path.join(OUT, "assets", fn))
for tier in ("w1500", "w750"):
    os.makedirs(os.path.join(OUT, "assets", tier), exist_ok=True)
    for fn in os.listdir(os.path.join(H, tier)):
        shutil.copy2(os.path.join(H, tier, fn), os.path.join(OUT, "assets", tier, fn))
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

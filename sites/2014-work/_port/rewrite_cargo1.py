#!/usr/bin/env python3
"""Rewrite the crawled Cargo 1 pages into a self-contained relative-URL site.
Home -> index.html, /Project -> Project/index.html. All cargocollective +
typekit refs localized; trackers (mint, GA flag, FB, Twitter, Pinterest,
chartbeat var) stripped. Vimeo iframes stay external by design."""
import re, sys, pathlib, urllib.parse

OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "2014-work")
RAW = OUT / "_port" / "raw"

def rewrite(html: str, prefix: str) -> str:
    # 1. kill <base>
    html = re.sub(r'\s*<base [^>]*/?>', '', html)

    # 2. typekit -> local css (script pair + inline load)
    html = re.sub(
        r'<script[^>]*src="https://use\.typekit\.com/[^"]*"></script>\s*'
        r'<script[^>]*>try\{Typekit\.load\(\);\}catch\(e\)\{\}</script>',
        f'<link rel="stylesheet" href="{prefix}fonts/typekit.css" />', html)

    # 3. trackers / social widgets
    html = re.sub(r'<script[^>]*src="https://www\.iamalwayshungry\.com/mint/[^"]*"[^>]*>\s*</script>', '', html)
    html = re.sub(r'<script[^>]*src="[^"]*platform\.twitter\.com[^"]*"[^>]*>\s*</script>', '', html)
    html = re.sub(r'<script[^>]*src="[^"]*assets\.pinterest\.com[^"]*"[^>]*>\s*</script>', '', html)
    html = re.sub(r'<!-- Facebook Widget -->.*?</script>\s*(?=<)', '', html, flags=re.S)
    html = html.replace('var _use_google_analytics=1', 'var _use_google_analytics=0')

    # 4. cargocollective hosts -> local
    html = re.sub(r'(?:https?:)?//payload\.cargocollective\.com/', f'{prefix}assets/payload/', html)
    html = re.sub(r'(?:https?:)?//files\.cargocollective\.com/', f'{prefix}assets/files/', html)
    html = re.sub(r'(?:https?:)?//static\.cargocollective\.com/', f'{prefix}assets/static/', html)
    html = re.sub(r'href="(?:https?:)?//favicon\.cargocollective\.com/[^"]*"', f'href="{prefix}favicon.ico"', html)

    # 5. absolute self-URLs -> relative
    html = re.sub(r'(href|src)="(?:https?:)?//work\.iamalwayshungry\.com/?"', rf'\1="{prefix or "./"}"', html)
    html = re.sub(r'(href|src)="(?:https?:)?//work\.iamalwayshungry\.com/', rf'\1="/', html)

    # 6. root-relative -> prefix-relative
    def rootrel(m):
        attr, path = m.group(1), m.group(2)
        if path.startswith("//"):          # protocol-relative external, leave
            return m.group(0)
        clean = path.split("?")[0]
        if clean == "/stylesheet":
            return f'{attr}="{prefix}stylesheet.css"'
        if clean.startswith(("/_", "/designs/", "/images/", "/rss")):
            return f'{attr}="{prefix}{clean.lstrip("/")}"'
        # page link
        page = clean.strip("/")
        if not page:
            return f'{attr}="{prefix or "./"}"'
        return f'{attr}="{prefix}{page}/"'
    html = re.sub(r'(href|src|src_o|data-hi-res)="(/[^"]*)"', rootrel, html)
    html = re.sub(r"(href|src|src_o|data-hi-res)='(/[^']*)'",
                  lambda m: rootrel(m).replace('"', "'"), html)

    # 7. inline style url(/...)
    html = re.sub(r'url\(\s*[\'"]?/(?!/)', f'url({prefix}', html)

    # 8. fonts render without typekit's wf-active gate
    html = html.replace('<html>', '<html class="wf-active">', 1)
    return html

pages = sorted(RAW.glob("*.html"))
for raw in pages:
    name = raw.stem
    html = raw.read_text(encoding="utf-8", errors="replace")
    if name == "home":
        out, prefix = OUT / "index.html", ""
    else:
        out, prefix = OUT / name.replace("__", "/") / "index.html", "../" * (name.count("__") + 1)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(rewrite(html, prefix), encoding="utf-8")
print(f"rewrote {len(pages)} pages")

# ---- CSS files: root-relative url(/...) -> relative to css file depth ----
for css in list(OUT.rglob("*.css")):
    if "assets/" in str(css) or "fonts/" in str(css): continue
    depth = len(css.relative_to(OUT).parts) - 1
    pfx = "../" * depth
    txt = css.read_text(encoding="utf-8", errors="replace")
    txt2 = re.sub(r'url\(\s*([\'"]?)/(?!/)', rf'url(\1{pfx}', txt)
    txt2 = txt2.replace("//payload.cargocollective.com/", f"{pfx}assets/payload/")
    txt2 = txt2.replace("//files.cargocollective.com/", f"{pfx}assets/files/")
    if txt2 != txt:
        css.write_text(txt2, encoding="utf-8")
        print(f"css fixed: {css.relative_to(OUT)}")
print("REWRITE COMPLETE")

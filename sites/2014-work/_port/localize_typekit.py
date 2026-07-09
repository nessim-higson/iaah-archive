#!/usr/bin/env python3
"""Localize Typekit kit ffg6iny (futura-pt + nimbus-sans): download the kit
CSS + every font binary, rewrite URLs to fonts/files/*."""
import re, sys, pathlib, urllib.request

OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "2014-work") / "fonts"
KIT = "https://use.typekit.net/ffg6iny.css"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      "Referer": "https://work.iamalwayshungry.com/"}

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

css = fetch(KIT).decode("utf-8")
(OUT / "files").mkdir(parents=True, exist_ok=True)

EXT = {"woff2": "woff2", "woff": "woff", "opentype": "otf", "truetype": "ttf"}
seen = {}
def repl(m):
    url, fmt = m.group(1), m.group(2)
    if url.startswith("//"): url = "https:" + url
    key = (url, fmt)
    if key not in seen:
        # unique name from the /af/<hash>/<id>/ path segments + fvd variant
        parts = urllib.parse_path = re.findall(r'/af/([0-9a-f]+)/(\w+)/', url)
        fvd = re.search(r'fvd=([a-z]\d)', url)
        name = f"{parts[0][0][:8]}-{fvd.group(1) if fvd else 'x'}.{EXT.get(fmt, fmt)}"
        data = fetch(url)
        (OUT / "files" / name).write_bytes(data)
        print(f"  {name}  {len(data)} bytes")
        seen[key] = name
    return f'url("files/{seen[key]}") format("{fmt}")'

css2 = re.sub(r'url\("?([^")]+)"?\)\s*format\("(\w+)"\)', repl, css)
(OUT / "typekit.css").write_text(css2, encoding="utf-8")
print(f"kit css written, {len(seen)} font files")

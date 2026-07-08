# iaah.work — static port (2026-07-08)

The live Cargo 2 site at https://iaah.work, ported in its entirety to static
files with zero Cargo dependency.

## Method

1. **Crawl** — all 40 URLs (Home + 39 projects). Cargo 2 embeds each page's
   content HTML in JSON blobs inside the served page; `raw-crawl-*.tar.gz`
   holds the untouched responses.
2. **Extract** — content model (pages, pins, project index, design options)
   parsed into `model.json`.
3. **Assets** — 293 images/GIFs pulled from freight.cargo.site (originals),
   Quiosco + Cargo icon fonts from type/static.cargo.site. Freight requires
   browser UA + referer headers.
4. **CSS** — Cargo's runtime-injected base stylesheet (551 rules) serialized
   from the live CSSOM headlessly, concatenated with the member stylesheet;
   all remote URLs rewritten local. Root `font-size: 81%` and the
   overlay-pin "accommodate" padding replicated in a small port layer.
5. **Homepage collage** — the freeform thumbnail layout captured from the
   rendered live DOM (`layout_live.json`) and rebuilt as centered flex rows
   using Cargo's own per-thumb width percentages. Verified sub-pixel
   identical at 1440px.
6. **Generate** — `build_site.py` renders index.html + 39 project folders.
   Page Nav "Index / Next" links baked per page (Next wraps at the end).

Vimeo embeds (7) stay external. Everything else is served from this folder.

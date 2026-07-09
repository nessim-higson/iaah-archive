# work.iamalwayshungry.com — static port (2026-07-09)

The 2011–2014 studio site, live on Cargo 1 (cargocollective site #833,
"hegel" template, last updated April 2014), ported in its entirety to
static files with zero Cargo dependency. The live original still runs at
https://work.iamalwayshungry.com (DNS A record → Cargo's Rackspace box).

## Method

1. **Crawl** — `mirror_cargo1.py`. 58 pages (home + Profile + 56 projects),
   discovered from the homepage nav and followed recursively.
   Cargo 1 serves complete server-rendered HTML, so each page is kept
   byte-for-byte; `raw-crawl-2026-07-09.tar.gz` holds the untouched
   responses.
2. **Assets** — 1,021 files (~180MB): every `_900` rendition *and* every
   `_o` hi-res original from payload.cargocollective.com, the member JS
   bundles from files.cargocollective.com, the favicon, and the site's own
   `_js/_css/_gfx/_jsapps/designs` tree. Numbered CDN shards
   (payload47.…) are folded into the same `assets/payload/` tree.
3. **Fonts** — `localize_typekit.py`. Typekit kit `ffg6iny` (futura-pt +
   nimbus-sans) still resolves; kit CSS + 18 font binaries now live in
   `fonts/`, the kit JS include replaced with a plain stylesheet link.
4. **Rewrite** — `rewrite_cargo1.py`. `<base>` tag removed, every URL made
   depth-relative (`/Batman` → `../Batman/`), payload/files/favicon hosts
   localized, version query strings dropped.
5. **De-tracking** — Mint, the inline Twitter widgets loader, the Facebook
   SDK block and Pinterest script are stripped; the member GA snippet
   (UA-32406095-1, jquery-google-analytics in `cargo-all-concat.js`) and
   Cargo's toolset JSONP (`cargo.site.package.js`) are disabled in place
   with `// archived 2026` markers. Cargo's own analytics were already
   gated off by `_use_google_analytics=0`.
6. **templates.js** — the splash-panel and share-widget image URLs are
   rewritten at runtime via an injected `__iaahPayloadBase` that resolves
   the site's mount path, so they work both locally and under
   `/sites/2014-work/` on the archive domain.

Vimeo embeds (the reels) stay external. Everything else — all 58 pages,
1,021 assets, both typefaces — is served from this folder. Verified: zero
external requests on home/project/Profile pages, zero broken images.

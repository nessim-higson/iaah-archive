# IAAH™ — The Flash Years

**[archive.iamalwayshungry.com](https://archive.iamalwayshungry.com)**

Four generations of the iamalwayshungry studio site (2005–2009), recovered from
the original archive and running again in modern browsers via
[Ruffle](https://ruffle.rs) — a Flash Player emulator compiled to WebAssembly.
Nothing to install; these are the original, unmodified SWFs.

| Year | Site | Era |
|------|------|-----|
| 2005 | [IAAH v5](https://archive.iamalwayshungry.com/sites/v5/) | Flash 8 · AS2 |
| 2007 | [IAAH v7](https://archive.iamalwayshungry.com/sites/v7/) | Flash 9 · draggable canvas (ourvice) |

Two more builds are deployed but unlisted, being duplicates of the above:
[v6](https://archive.iamalwayshungry.com/sites/v6/) is v5 with later content
(same design, revised nav.xml), and [v8](https://archive.iamalwayshungry.com/sites/v8/)
is the same ourvice canvas as v7 in a later Flash 10 build — the site itself
introduces ourvice as "a seventh iteration."

## The deep archive

Four more snapshots pulled from the backup folders (`:: IAAH_Site`,
`IAAH-ORGANIZE`) — the HTML years before the Flash canon. (Three Flash-era
working builds — the 2006 `app.swf`/`use_this` builds and the 2009 ourvice
delivery_d — were exhibited briefly and culled as too close to the canon;
they live on in git history.)

| Year | Site | Source in archive |
|------|------|-------------------|
| 2003 | [For Temporary Use Only](https://archive.iamalwayshungry.com/sites/2003-temp/) · [splash](https://archive.iamalwayshungry.com/sites/2003-temp/splash/) · [remastered probe](https://archive.iamalwayshungry.com/sites/2003-temp/remastered/) | `…/IAAH-web/Temporary site/IAAH-Cut/working` |
| 2004 | [REFRESH](https://archive.iamalwayshungry.com/sites/2004-refresh/) — 73-page HTML site w/ old-work vault | `…/FUCKITY FUCK - SITE/REFRESH` |
| 2005 | [SITE.UPDATE 9.27.05](https://archive.iamalwayshungry.com/sites/2005-fall/) — Katrina-era front | `…/SITE.UPDATE.9.27.05/nessDelivery/latest` |
| 2005 | [New Orleans piece](https://archive.iamalwayshungry.com/sites/2005-nola/) — 47-page photo essay | `…/CURRENT-IAAH-9.4.06/NEW-ORLEANS-PIECE/HTML` |

## The client files

| Year | Site | Source |
|------|------|--------|
| 2007 | [Lee Crum](https://archive.iamalwayshungry.com/sites/leecrum/) — New Orleans photographer, studio-engine site (main.swf/app.swf/gallery.xml, 12 galleries · 306 photos as SWFs) | `~/Desktop/LEE_CRUM_WORKING_SITE` |
| 2026 | [LEE Ⓒ RUM — rebuilt](https://archive.iamalwayshungry.com/leecrum/) — the same site as a native web page: 260 photographs mined out of the SWF containers, layouts driven by the original 2007 `gallery.xml` | `leecrum/` (see its README) |

Lee Crum notes: expect a long dark intro (~30s) before the LEE ⊙ RUM masthead
and the AUTO PLAY / ENTER gate appear. The working folder's `portraitgallery/`
subfolder is an unrelated HTML gallery export that shipped without its image
renditions — kept as-is, not linked. The `welcome.html` GoDaddy placeholder is
kept too.

Reconstruction notes: the 2005 front page (`index.html`) was reunited with its
site body (`nessDelivery/latest/`); its `includes/` came from the same
snapshot's `NEW/` section, and the katrina page's PDFs/movies were mirrored
into `NEW/` where it expects them (`funk.html`/`human.mov` recovered from the
snapshot's `videoStuff/`). The NOLA index had its `thoughts/` prefix flattened,
a 2005 `<style>`-for-`<script>` typo fixed (blanks modern parsers; original
preserved as `index-original.html`), and its "back" links pointed at the
museum's 2005 site. The 2004 site's `latest/` section was un-nested from
`new/latest/` so the splash's links resolve; `shirt1/2.html` restored from the
old-work vault. A dozen 2004-era lowercase
references to uppercase files (`news.html`→`NEWS.html`, `la1.jpg`→`LA1.jpg`…)
are handled by `_redirects` — macOS forgives case, Cloudflare Pages doesn't,
and a case-insensitive filesystem can't hold both spellings. The 2003/04
sites' "Recent Work" gallery and News popup were classic-ASP pages
(`recent_index.asp`, `index_newspop.asp`); the original ASP source survived in
the archive, so both were resurrected as static pages with the three-line
server logic moved client-side (`recent_index.html`, `index_newspop.html`) —
same 34-section gallery, same three hardcoded December 2003 news items.
Everything else is byte-for-byte; PSD/FLA working files were left behind in
the source archive, which remains untouched.

Best experienced on a desktop, as it was in 2006.

## The Cargo years

| Year | Site | Source |
|------|------|--------|
| 2022 | [iaah.work](https://archive.iamalwayshungry.com/sites/iaah-work/) — the current studio site, ported off Cargo in its entirety (39 projects + reel, 293 assets, Quiosco + icon fonts, freeform collage homepage) | live crawl of iaah.work, 2026-07-08 |

The port is fully static and self-contained — Cargo's runtime CSS was
serialized from the live DOM, the freeform homepage layout captured from
rendered geometry (verified sub-pixel identical), and every image and font is
served locally. Only the Vimeo embeds stay external. Method + content model in
[`sites/iaah-work/_port/`](sites/iaah-work/_port/README.md).

## Structure

- `index.html` — the museum hub
- `sites/v5…v8/` — each site build, byte-for-byte from the archive; the
  2006-era swfobject embed pages are preserved as `index-swfobject-original.html`
- `ruffle/` — self-hosted Ruffle player (`@ruffle-rs/ruffle`)

*Emulate to remember, rebuild to continue.*

# IAAH™ — The Flash Years

**[archive.iamalwayshungry.com](https://archive.iamalwayshungry.com)**

Four generations of the iamalwayshungry studio site (2005–2009), recovered from
the original archive and running again in modern browsers via
[Ruffle](https://ruffle.rs) — a Flash Player emulator compiled to WebAssembly.
Nothing to install; these are the original, unmodified SWFs.

| Gen | Site | Era |
|-----|------|-----|
| 05 | [IAAH v5](https://archive.iamalwayshungry.com/sites/v5/) | Flash 8 · AS2 |
| 06 | [IAAH v6](https://archive.iamalwayshungry.com/sites/v6/) | Flash 8 · AS2 |
| 07 | [IAAH v7](https://archive.iamalwayshungry.com/sites/v7/) | Flash 9 · draggable canvas |
| 08 | [\\\\ ourvice // v8](https://archive.iamalwayshungry.com/sites/v8/) | Flash 10 · AS3 |

## The deep archive

Seven more snapshots pulled from the backup folders (`:: IAAH_Site`,
`IAAH-ORGANIZE`, `BACKUP-12.1.08`) — temporary fronts, working builds, and
client deliveries that never made the canon:

| Year | Site | Source in archive |
|------|------|-------------------|
| 2003 | [For Temporary Use Only](https://archive.iamalwayshungry.com/sites/2003-temp/) · [splash](https://archive.iamalwayshungry.com/sites/2003-temp/splash/) | `…/IAAH-web/Temporary site/IAAH-Cut/working` |
| 2004 | [REFRESH](https://archive.iamalwayshungry.com/sites/2004-refresh/) — 73-page HTML site w/ old-work vault | `…/FUCKITY FUCK - SITE/REFRESH` |
| 2005 | [SITE.UPDATE 9.27.05](https://archive.iamalwayshungry.com/sites/2005-fall/) — Katrina-era front | `…/SITE.UPDATE.9.27.05/nessDelivery/latest` |
| 2005 | [New Orleans piece](https://archive.iamalwayshungry.com/sites/2005-nola/) — 47-page photo essay | `…/CURRENT-IAAH-9.4.06/NEW-ORLEANS-PIECE/HTML` |
| 2006 | [IAAH_site spring build](https://archive.iamalwayshungry.com/sites/2006-app/) — unreleased `app.swf` | `…/BCKP/IAAH_site` |
| 2006 | [use_this 9.4.06](https://archive.iamalwayshungry.com/sites/2006-fall/) — working `main.swf` | `…/CURRENT-IAAH-9.4.06/use_this` |
| 2009 | [ourvice final delivery](https://archive.iamalwayshungry.com/sites/2009-ourvice/) — delivery_d, 4.24.09 | `…/BACKUP-12.1.08/IAAH-V7/IAAH-WORKING/delivery_d` |

Reconstruction notes: the 2005 front page (`index.html`) was reunited with its
site body (`nessDelivery/latest/`); its `includes/` came from the same
snapshot's `NEW/` section. The NOLA index had its `thoughts/` prefix flattened
and its "back" link pointed at the museum's 2005 site (original preserved as
`index-original.html`). `scaleBrowser.js` for the 2009 delivery was recovered
from `IAAH-ORGANIZE/::IAAH/IAAH:07`. Everything else is byte-for-byte; PSD/FLA
working files were left behind in the source archive, which remains untouched.

Best experienced on a desktop, as it was in 2006.

## Structure

- `index.html` — the museum hub
- `sites/v5…v8/` — each site build, byte-for-byte from the archive; the
  2006-era swfobject embed pages are preserved as `index-swfobject-original.html`
- `ruffle/` — self-hosted Ruffle player (`@ruffle-rs/ruffle`)

*Emulate to remember, rebuild to continue.*

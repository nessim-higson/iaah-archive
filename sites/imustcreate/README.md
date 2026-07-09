# I Must Create (imustcreate.com, 2002)

Bryant Fernandez's self-promotion site — "the pantone chips" — built by Bryant
Fernandez, Jared Lyvers, Matt Cross and Nessim Higson. Launched 9/28/2002
(per the 2002 news.txt); props from Communication Arts Interactive Annual,
K10K, Newstoday, Surfstation, FWA et al.

**Source:** `~/Desktop/Bryant's site/Site 8:12/HTML docs/` (final build, files
dated Aug 15 2002) — byte-identical copy also lives on the MT server archive at
`~/Archives/mediatemple-server/iamalwayshungry.com/files/public_html/CLIENTS/IMC.zip`.
Full .fla sources survive in both places.

**Wiring:** stage.swf (700×550, Flash 5 loader stub) → base.swf →
one/two/three.swf + sound2.swf (music); two.swf → print/tv/misc.swf.
Work details open as sized popups (NewWindow1–18 in Start.html).

**Changes made for the archive (originals untouched):**
- `index.html` — new splash gateway (imustcreate.jpg, click boots Ruffle inline
  so the music autoplays). Original entry kept as `index-original.html`;
  `splash1.html`, `detect.html`, `Start.html`, `Start2.html` kept as found.
- `sound2.swf` copied in from the parent working folder — base.swf requires it
  but the HTML docs folder shipped without it.
- `minivan.html`, `chick.html`, `little.html` — popup pages reconstructed from
  the surviving template (their images survived; marked with a comment).
- `images/dogs.jpg` — lost from every copy of the build; reconstructed from
  Bryant's own full-size JPEG (`~/Desktop/BF-site/Bryant's Jpegs/LostDogs.jpg`,
  535×800) downscaled to 372×556 to sit in the original 392×560 popup.
- Popup fallback: if the browser blocks the 2002 window.open, the same page
  opens in an in-page frame.
- `NewWindow19()` (t-shirts section) was never defined in any surviving Start
  page — kept as a no-op.
- `enders/end1–5.html` (the pages detect.html left behind the popup) are lost.

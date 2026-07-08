# LEE Ⓒ RUM — rebuilt

The 2007 Flash site for photographer Lee Crum (New Orleans), rebuilt on the
open web. Same photographs, same scattered layouts — the engine consumes the
data mined from the original `gallery.xml` (every photo's x/y/scale/rotation
as authored in 2007), rendered with plain HTML/CSS transforms instead of
ActionScript.

- `manifest.json` — the 2007 gallery.xml (live galleries only, comments
  stripped) converted to JSON: 10 galleries, 260 photographs + layout data
- `assets/` — the photographs, mined out of the per-photo SWF containers
  (DefineBitsJPEG2/3 tags; 92 needed the classic Flash `FFD9FFD8` splice
  excised before browsers would decode them). Frames are baked into the
  photos as shipped in 2007. Full source resolution — the SWFs carried
  ~2× the pixels they displayed, so the rebuild is retina-crisp for free.
- `index.html` — the whole engine, camera-canvas like the 2007 original:
  photographs affixed at their unique points on one canvas; click a photo
  and the camera glides to frame it; AUTO PLAY steps photo-to-photo; drag
  pans directly. Entry gate recreates the original AUTO PLAY ON/OFF · ENTER
  screen — entering starts the music (a user gesture, so browsers allow it).
- `audio/` — the original 17-track soundtrack, extracted from the site's
  FLV audio streams (ffmpeg, codec copy — no re-encode).

Source of truth: `iaah-revival/sites/leecrum/` (the emulated original) and
`~/Desktop/LEE_CRUM_WORKING_SITE` (untouched). Dev server: `leecrum-modern`,
port 4203.

*Emulate to remember, rebuild to continue.*

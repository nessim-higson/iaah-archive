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
- `index.html` — the whole engine. Drag to pan the wall (direct control,
  no inertia), click a photo to focus, Esc/click to dismiss. Masthead
  recreated typographically (Didot + double-ring Ⓒ).

Source of truth: `iaah-revival/sites/leecrum/` (the emulated original) and
`~/Desktop/LEE_CRUM_WORKING_SITE` (untouched). Dev server: `leecrum-modern`,
port 4203.

*Emulate to remember, rebuild to continue.*

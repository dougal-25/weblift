# Feature — Dynamic Animation System

**Status:** built v1 — 2026-05-29
**Goal:** replicate cheapwebdesign.co.uk's signature motion — blue marker underlines/circles that **draw themselves** as you scroll, plus fade/rise reveals on every section.

## How it works (vanilla, no libraries)
- `css/animations.css` holds the *states*; `js/reveal.js` holds the *logic*. One `IntersectionObserver` drives everything.
- **Scroll reveals:** any element with `data-reveal` starts hidden (`opacity:0` + offset) and gets `.revealed` when it scrolls into view. Variants: `data-reveal="left|right|scale"`. Containers with `data-stagger="0.12"` delay their children in sequence.
- **Draw-on-scroll underline/circle:** a `<span class="draw draw--underline">` or `draw--circle` gets an inline SVG injected by JS. The path's `stroke-dasharray`/`stroke-dashoffset` are set to the measured length, so it's invisible; on intersect, `dashoffset` animates to 0 → the stroke "draws" in.
- Key fix: `vector-effect: non-scaling-stroke` keeps the marker line a constant thin width even though the SVG is stretched to fit the word (without it, the circle stroke thickened into a filled blob). Circle uses a taller viewBox (300×70) so the stretched ellipse keeps its shape.
- **Accessibility:** `prefers-reduced-motion` shows everything immediately, no movement. No-JS / old browsers: everything shows (graceful).

## How to use in markup
```html
<h2>Loved by owners that <span class="draw draw--underline">hate DIY</span></h2>
<h1>Take your website to <span class="draw draw--circle">the next level</span></h1>
<div data-reveal>fades up on scroll</div>
<div data-stagger="0.12"> <a data-reveal>1</a><a data-reveal>2</a> </div>
```

## Files
- `css/animations.css` · `js/reveal.js`
- Shared across all pages (index, about, pricing, portfolio, contact).

## "Logo draws itself, then assembles" — branding tile (added 2026-06-02)
The **Logos & branding** feature row on the home page (was a `loremflickr` placeholder) is now a self-contained animated SVG that reuses this same draw-on language — a logo being *made* live, then assembling into the full lockup, to sell the branding service.
- Markup: `index.html` `.feature__media--brand` holds an inline `<svg class="brandanim">` — a `.brandanim__mark` group (rounded-square `.brandanim__box` + upward "lift" arrow `.brandanim__arrow`, same geometry as the real logo mark) plus a `.brandanim__word` `<text>` ("Web" white + "Lift" sky). Box/arrow use `pathLength="1"` so `stroke-dasharray:1` / `stroke-dashoffset:1→0` draws any shape on a normalised 0→1 scale (no JS length-measuring needed here — fixed shapes, unlike the scroll markers).
- Motion: pure CSS, one shared **6.5s loop** (`css/home.css`). Timeline — box draws (0–16%), arrow draws (13–32%), brand colour fills (`ba-fill`, 32–44%), then the **mark slides left** (`ba-shift`, translateX 0→−100px, 46–62%) while the **wordmark emerges from the right** (`ba-word-in`, opacity + translateX 34px→0, 46–62%) to complete the lockup; holds, then `ba-fade` fades the group (88–97%) and it restarts undrawn/centred. Earlier version had a wavy underline instead of the wordmark assembly — Doug swapped it 2026-06-02 for the slide-left + wordmark-in. Navy panel (`--grad-deep`) so the light mark + wordmark pop.
- Accessibility: `prefers-reduced-motion` pins it to the final drawn+filled state, no looping.
- **Favicon** (added same day): `assets/favicon.svg` = the logo's arrow-mark only (navy square + white arrow, no wordmark), linked from all 6 pages' `<head>`.
- **Raster fallbacks** (added 2026-06-04): old browsers ignore SVG favicons and iOS ignores SVG `apple-touch-icon`, so all 6 heads now also link `favicon-32.png`, `favicon.ico` (16/32/48), and `favicon-180.png` (apple-touch). The rasters are generated from the *same* geometry by `assets/favicon-gen.py` (pure stdlib — hand-drawn pixels + `zlib` PNG, no deps/build step) so they stay in sync if the brand colours change; re-run `python3 assets/favicon-gen.py`.

## Open / todo
- Tune draw speed/easing once Doug sees it live.
- Consider drawing the circle slightly *over* the text baseline vs centred per word.
- ~~`.ico`/`.png` favicon fallbacks for old browsers — currently SVG-only~~ — done 2026-06-04 (see "Raster fallbacks" above).

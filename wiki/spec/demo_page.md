# Demo page (weblift-demos) — UI spec

**Status:** framing answered by defaults 2026-06-11 (Doug said "we need to build out the demo page" — defaults presented in chat, not objected to; confirm at screenshot stage).

**References:** the luxury end of the 5 target niches themselves (high-end kitchen showroom sites); WebLift kit aesthetic for the footer bar only. No specific screenshots supplied.
**Mood/feel:** premium, calm, editorial. Big imagery, generous whitespace, serif display headlines (Fraunces) over clean sans (Outfit). Feels like a £20k kitchen brochure, not a £750 template — the contrast with their current site IS the pitch.
**Hero moment:** the load-in. The prospect's business name drawn over their own best photo, full-bleed, slow ken-burns drift. The first 3 seconds sell it (also what the Kling clip animates).
**Anti-examples:** Checkatrade/directory look, trust-badge soup, stock-photo-with-blue-overlay agency template.
**Constraints:** mobile-first (owners open email on phones). Light palette, one accent per theme (kitchen copper / bathroom teal / garden green / driveway graphite-amber / pool azure). Must look premium with one mediocre photo — gradient fallback tiles, photo onerror swap. WebLift-branded footer CTA bar. Self-contained folder (own tokens.css; kit not linked — kit is WebLift's navy brand, demo pages are prospect-branded).

## How it personalises
One static page, populated by `demo.js` from URL params (all optional, graceful fallbacks):
`?biz=<name>&theme=kitchen|bathroom|garden|driveway|pool&loc=<area>&img1..img4=<photo URLs>`
Params are injected via `textContent` (no HTML injection); image URLs accepted only if http(s).

## Build notes
- Sections: slim "WebLift concept for {biz}" bar → hero (ken-burns, name, tagline, CTAs) → trust strip → 3 niche service cards → gallery (their 4 Google photos) → pull-quote band → contact mock → WebLift footer CTA bar.
- Reveal-on-scroll via IntersectionObserver; respects prefers-reduced-motion.
- Deployed to Vercel as `weblift-demos` from `projects/weblift/demos/` (self-contained, no bundle step).

# MWorks UK mockup — UI spec

Prospect redesign mockup. Pipeline status lives in `mockups/mworks/prospect.md`; this page is
the **UI framing** (ui-change-protocol). Workflow precedent: `decisions/0001_shared_kit_per_prospect_mockups.md`.

**References:** Doug's judgement — channel premium *independent* specialist-workshop sites
(big photography, warm rustic texture, confident type). Internal bar = GS Garage mockup quality,
but multi-page + new palette.

**Mood/feel:** Clean **rustic** — warm, honest, hands-on workshop. Simple yet dynamic and
animated. Trustworthy local specialist with 20 yrs experience, not a faceless chain. Their real
home is a brick railway-arch unit — lean into that texture.

**Hero moment:** Full-bleed photo of their **real brick-arch workshop** (car on the MOT ramp),
warm dark overlay, the **enhanced MWorks logo enlarged + offset to one side**, headline + a
clear **"Book your MOT"** CTA, and the verified **4.9★ · 160 Google reviews** badge. Fixes the
"no clear MOT booking link" gap on their current site.

**Anti-examples:** NOT their current **yellow** WordPress template; NOT a cold corporate
dealership; NOT cheap/cluttered (no clipart, neon, crammed layouts); NOT a generic AI look
(no default gradients, emoji bullets, everything-centered).

**Constraints:**
- Mobile-first responsive, **light** (warm cream) base. Font: Outfit (kit).
- **Palette — Workshop Rustic** (override kit tokens in mockup `style.css` `:root` only, never
  fork the kit): cream `#F4EFE7` bg · charcoal `#1F1B18` ink · oxblood-rust `#9E3B2E` accent/CTA
  · brushed-steel `#6B6256` muted · warm hairline `#E6DECF` · espresso `#26201C` dark bands ·
  ochre `#D9952B` stars only. **No yellow.**
- Keep their **navy logo** as-is (it sits fine with rust+cream); rust is the site accent.
- Kit linked via `../../kit/` (tokens, base, animations, reveal.js). Add a small mockup-level
  `nav.js` for the mobile menu (kit has no real toggle).
- **No decorative `.draw--underline` scribbles** (Doug removed them on GS Garage; clash with the
  "not generic AI" steer). Animation = scroll reveals (`data-reveal`/`data-stagger`) + tasteful
  image hover/zoom only.

## Pages (5, shared nav + mobile menu)
- **index** (Home): hero → trust strip (4.9★/20yrs/MOT approved) → services overview (3–4 cards)
  → "why MWorks" + real engine/Porsche photo → review block (real Google quotes) → map+hours
  teaser → Book-MOT CTA band.
- **services**: MOT · Servicing · **Bodyshop** (respray, dent/scratch, bumper scuff, alloy
  refurb, accident damage, smart repair) · modification/fabrication, audio. Card grid + detail.
- **gallery**: real workshop + before/after-style bodywork grid (workshop-arch, engine-bmw,
  stripped-front, porsche-brakes, tools + 2 stock). ⚠️ real before/after photos would be stronger.
- **about**: 20 yrs story, E2 / off Hackney Rd, the team (staff "Fahim" named in a review),
  values, trust.
- **contact**: both phone lines, email, hours (Mon–Sat 10–7, Sun closed), live Google Map embed
  (295 Clare St E2 9HD), enquiry form (non-functional stub — wire to Formspree before handoff).

## Verified facts (Google listing supplied by Doug)
- **MWorks MOT and Repairs · 4.9★ · 160 reviews** (verified on Google — safe to show).
- 295 Clare St, London E2 9HD · 07595 596851 (bodyshop) / 07415 092975 (MOT & service) ·
  info@mworksuk.co.uk · Mon–Sat 10am–7pm, Sun closed.
- Real review quotes: Cdr (5★, "almost written off… got the car SPOTLESS… good price"),
  Mahbubur Rahman (5★, "my usual garage… reliable and reasonably priced").

## v3 direction — conversion + old-school (Doug, 2026-06-03)
**Mood (revised):** "really cool, old-school, impressive business" — vintage East-London garage.
Imagery, colour, accents and **font** should read old-school; **add texture** (film grain / worn
paper). Premium real photos (Morgan, Aston, Rolls, classics) carry the "impressive" half.
**Hero moment (revised):** split hero — headline left, **quick-booking card on the right**
(vertical: reg → service → Get started), higher up the image. Conversion-first.
**Conversion asks:** centered header (logo in line with centred tabs) + **Book your MOT** button
right; **pricing must move UP** the services page and be clearer (it was buried).
**Type:** add **Oswald** (condensed signage) as the display font for headings/numbers; Outfit stays
for body. **Texture:** subtle SVG film-grain overlay site-wide + warm vintage accents.
**Gallery:** keep mixed sizes but **collage/masonry** them tighter.
**About:** add a **team** section (real first names from reviews: Fahim = service/MOT, Hassan =
bodyshop) — placeholder avatars until real team photos arrive.

## Build notes
- Logo background removed via Pillow (`logo.png` dark-on-transparent + `logo-white.png` knockout);
  do NOT use the kit's `.nav--on-dark` content-swap (its `../assets/` path points at the business
  site, not the mockup). Use a solid cream sticky nav (dark logo) + white logo in the dark hero.
- Assets in `mockups/mworks/assets/` (raw originals kept in `assets/raw/`).

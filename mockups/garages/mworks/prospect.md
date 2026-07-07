# MWorks UK — prospect

**Status:** cold → called → interested → `mockup (built)` → pitched (design sent) → won / lost
<!-- update the status word above as the prospect moves through the pipeline -->

- **Business:** MWorks UK (Google: "MWorks MOT and Repairs") — "Total Vehicle Solutions"
- **What they do:** Independent MOT centre + servicing garage + **bodyshop**. MOT, full/interim
  servicing, brakes/suspension/diagnostics, accident & collision repair, dent/scratch/scuff,
  full resprays, alloy refurb, modification/fabrication, audio installs, caliper refinishing,
  detailing, restoration. ~20 yrs experience; known for high-standard finishing & detailing.
- **Area:** 290 & 295 Clare St, London E2 9HD — just off Hackney Road, by Cambridge Heath (railway-arch unit).
- **Current site:** http://www.mworksuk.co.uk/ (generic WordPress "go-x" template — yellow accent,
  placeholder email, no clear MOT booking, content buried).
- **Contact:** 07595 596851 (bodyshop, the Google-listed number) · 07415 092975 (MOT & service) ·
  info@mworksuk.co.uk
- **Hours:** Mon–Sat 10:00–19:00, Sun closed (Google listing + their own Contact page agree).
- **Google:** **4.9★ from 160 reviews** — VERIFIED on the listing Doug supplied (safe to show).
  Listing: https://maps.app.goo.gl/5yuX4v7EUUAR2x6U7

## Call log
- **2026-06-03** — Cold prospect. Doug wants a redesign mockup to send with a Loom + live link.
  Brief: multi-page, enhance/bg-remove logo, Google reviews + map + hours + photos, drop the
  yellow, "clean rustic, simple yet dynamic and animated".

## Mockup
- **Built:** 2026-06-03 · **Local:** `cd mockups/mworks && python3 -m http.server 8755`
- **Format:** 5-page site (first multi-page mockup on the shared kit) —
  **Home** (real workshop-arch photo hero, logo offset, 4.9★, services overview, why-us, reviews,
  map+hours teaser, CTA) · **Services** (MOT / Servicing / Bodyshop / extras) · **Gallery**
  (real photos) · **About** (20-yr story, values, reviews) · **Contact** (both phone lines, hours,
  live Google Map embed, enquiry form stub).
- **Brand — "Workshop Rustic":** warm cream `#F4EFE7`, charcoal `#1F1B18`, **oxblood-rust
  `#9E3B2E`** accent, brushed-steel `#6B6256`, espresso dark bands, ochre stars only. No yellow.
  Set via `:root` overrides in `style.css` only — kit never forked.
- **Logo:** pulled from live site, **white background removed** via Pillow → `assets/logo.png`
  (dark, transparent) + `assets/logo-white.png` (knockout, for dark hero/footer).
- **Images:** real MWorks photos pulled from their site — `workshop-arch` (brick-arch MOT bay,
  the hero), `engine-bmw`, `stripped-front` (accident repair), `porsche-brakes`, `tools`. Plus 2
  stock from their template (`bodyshop-mask`, `engine-rustic`). Originals kept in `assets/raw/`.
- **Reviews:** real Google quotes (Cdr; Mahbubur Rahman) + verified 4.9★/160.

## v2 (2026-06-03) — Doug feedback round
- **Logo:** autocropped tight (`logo-crop.png`, 576×288→453×105) and enlarged in the nav (68px) so
  the "Total Vehicle Solutions" tagline is readable. Removed the redundant white hero logo (the big
  nav logo now does that job — was a double-wordmark).
- **Top utility bar** added above the nav on all 5 pages: 📞 phone · 🕒 hours · 📍 location · ★ 4.9
  (160) on the left, **Book your MOT** button top-right. Phone/CTA moved out of the nav.
- **Hero quick-booking widget:** reg-number input + service dropdown + "Get started" (demo →
  contact form). ⚠️ reg input is **number-plate yellow** (plate convention, not branding) — flagged
  to Doug; swap to neutral if he objects to any yellow.
- **Reviews reworked:** readable dark text (was faint grey), rust avatar initials, Google "G" badge,
  and **6 real Google reviews** on home (Cdr, Chloé, Rukon, Amar, Mo, Jasmine) + 3 on about
  (Mahbubur, Ali, Rukon) — all genuine, pulled from the listing.
- **Services pricing** section added: MOT £45 (featured), Interim £99, Full £169, Bodywork "Free
  quote". ⚠️ **PRICES ARE PLACEHOLDERS** — confirm real figures with the owner before sending.
- **8 real premium photos** supplied by Doug (Google listing) pulled in: Morgan, AMG G63,
  Rolls-Royce Wraith, Bentley + classic Merc, Aston DB11 (×2), busy workshop, BMW M4 wheel.
  Gallery rebuilt around them (10 real shots); Morgan now anchors the home "why us". This
  **removed all stock images** (bodyshop-mask/engine-rustic/tools deleted).

## ⚠️ Still before sending
- **Confirm which phone leads "Book your MOT"** — MOT/service 07415 092975 vs bodyshop 07595 596851
  (bodyshop number used as the headline, as it's the Google-listed one).
- **Confirm pricing figures** — currently placeholder "from" prices.
- **Enquiry form + booking widget are non-functional stubs** — wire to Formspree/email before handoff.

## Outcome
- _(pending — mockup built 2026-06-03, not yet deployed/sent)_

## v3 (2026-06-03) — conversion + old-school
- Moved to `mockups/garages/mworks/` (kit links → `../../../kit/`).
- Old-school restyle: Oswald signage font, film-grain + brushed-grey texture, **red + gunmetal-grey** accents from the logo (accent now vintage red `#C0392B`; dark bands gunmetal grey, textured).
- Centred header (logo in line with tabs) + Book MOT right. Split hero (headline left, vertical booking card right). Reg field = vintage **black/silver plate** (no more yellow).
- Services **pricing moved to top**. Gallery = masonry collage. About = **team** (Fahim, Hassan, crew — monogram avatars, real photos TBC).
- Local: `http://localhost:8755/mockups/garages/mworks/index.html`.

## Deployed (2026-06-03)
- **Live preview:** https://mworks-preview.vercel.app (Vercel prod, scope `douglaswoolfenden-bytes-projects`). Verified public — 200, no auth wall, all kit + assets load, renders identical to local.
- **Deploy method:** self-contained bundle in gitignored `scratch/mworks-preview/` (kit inlined, `../../../kit/` → `kit/`); deployed only that dir via `cd scratch/mworks-preview && npx vercel deploy --prod --yes --name mworks-preview`. Rebuild bundle from `mockups/garages/mworks/` if changed, then redeploy.
- ⏳ **Take down ~2026-06-10** (week-max preview): `cd scratch/mworks-preview && npx vercel remove mworks-preview --yes` (or remove via Vercel dashboard).
- Ready for Doug's Loom + send. Outstanding before a real sale: real prices, confirm booking phone, wire form/booking stub.

# Log

Append-only. Most recent at bottom.

## [YYYY-MM-DD] init | wiki scaffolded
- Created from `_template/`

## [2026-05-29] build | spec + full landing page
- Defined Web Lift: done-for-you website redesigns for local SMBs, flat fee from £750.
- Wrote spec/overview, local_smb persona, delivery_process + outreach feature pages.
- Studied reference cheapwebdesign.co.uk (homepage/pricing/contact) via browser; sampled exact colours + font (Outfit).
- Built landing page (index.html + tokens.css + style.css + script.js): announcement bar, nav, scribble hero, before/after drag slider, how-it-works, two pricing cards (£750 / £950), testimonials, FAQ, quote form, footer. Mobile + desktop screenshot-confirmed.
- Domain: web-lift.co.uk (123-reg); Google Workspace email setup in progress.
- OPEN: client-site delivery stack, geographic focus, niche-down vertical (see spec).

## [2026-05-29] build | multi-page direction + dynamic animation engine
- Doug shared full cheapwebdesign.co.uk page set (home/about/pricing/portfolio/contact) as the look to replicate; saved all 6 reference screenshots to wiki/design_references.
- Key new requirement: dynamic motion — blue marker underlines/circles that draw themselves on scroll. Built it: css/animations.css + js/reveal.js (IntersectionObserver; SVG stroke-dashoffset draw; non-scaling-stroke fix; reduced-motion safe). See features/animation_system.md.
- Restructured CSS into css/ (base, animations, home) and js/ (reveal, slider); deleted old single style.css/script.js. Reason: keep files under 500-line limit + reusable across pages.
- Rebuilt homepage (index.html) to match reference layout: avatar hero w/ animated circle, USP 3-cards, alternating feature rows, "what makes us different", trust band, before/after slider (kept), diagonal stripe, packages (£750/£950), FAQ, CTA, full footer. Screenshot-confirmed hero circle + reveals render correctly.
- NEXT: clone system to about.html, pricing.html, portfolio.html, contact.html (pending Doug's feel-check + change list).

## [2026-05-29] research | ingested Jack Roberts wireframe-first video
- Transcribed https://www.youtube.com/watch?v=zTuV3chQCus via docs/tools/transcriber and added research/jack_roberts_wireframe_workflow.md (distilled takeaways + full transcript folded).
- Core takeaway for Web Lift: "substance first, then style" — 5 visitor-focused intake questions + research→wireframe→build→animate→host pipeline. Maps onto our delivery_process; candidate to formalise sitemap sign-off as a client deliverable.
- Tools cited (Firecrawl/Relume/Kie API/Higgsfield) noted but flagged as a promo stack — methodology is the keeper, not the tools.

## [2026-05-29] build | logo, palette shift, full multi-page site
- Inserted Doug's logo (assets/logo.svg) in nav + footer; redesigned to single-line "Web Lift", bigger/bolder, navy-gradient box + chunky arrow. Light variant (logo-light.svg) for dark heroes.
- Palette shift OFF the cheapwebdesign clone ONTO Web Lift logo tones: navy #13306B/#1B3F87, blue #2E8BFF, soft #9CC9FF. Recoloured dark sections, stripe, announce bar (maroon→navy), example/case gradients. Reason: Doug wants it distinct from the inspiration. tokens.css is the single source.
- Marker geometry fix: circles now COMPLETE loops (pen-overshoot path) + larger so letters sit inside; underlines lower (not touching) + bolder (stroke 5.5); marker colour = vibrant blue. Applied site-wide via .draw.
- Hero faces enlarged + pushed to corners (negative offsets), away from text.
- Homepage reorder: "What makes us different" moved directly under hero. Packages kept on home (Doug: don't move to pricing).
- Added bottom-of-home: case-studies grid + horizontal auto-scroll marquee (placeholder examples for Doug to swap).
- BUILT the 4 missing pages (were 404): about.html, pricing.html (3 tiers £750/£950/£1500, Growth featured), portfolio.html (dark hero + work grid), contact.html (dark hero + call card + form). Shared css/pages.css. All return 200, screenshot-confirmed.
- CSS restructured: css/{base,animations,home,pages}.css; all files <500 lines. scratch/ gitignored.
- NOT YET: real client examples (placeholders), forms are stubs (no backend), Doug's feel-check on v2.

## [2026-05-29] build | v3 polish pass (12 feedback items)
- Markers: circles now complete closed loops with pen-overshoot; tightened so they hug the word (no longer bleed onto neighbour like "us" or the line above). Hero headline line-height bumped to 1.18 to give the circle room. Underlines lowered + widened to 116% so "local businesses" is fully covered.
- Fixed real bug: `overflow-x:hidden` on <body> computed to `overflow: hidden auto`, turning body into its own scroll container (broke window scroll / anchors / reveal observer). Moved to <html>.
- Hero faces already at corners; example category cards now have themed photos (loremflickr) behind brand tint.
- Built layered device showcase in Websites feature: desktop frame (back) + phone (front), js/showcase.js flicks through 3 example screens in sync. Logos feature got an image; "Get found on Google" row removed.
- Reorder: before/after slider moved to directly below the "What makes us different" section. Removed duplicate "Local businesses we've lifted" stats section.
- Pricing: tiers equal-height + CTA pinned to bottom (aligned); clearer "Everything in X, plus" structure; fixed orphaned "+" on Premium.
- FAQs bulked out (home 11, pricing 7). Contact page: phone number removed, email-only (hello@web-lift.co.uk).
- OPEN/ASK: exact package contents (Starter/Growth/Premium) need Doug's confirmation — current split is a sensible guess.

## [2026-05-29] build | v4 tweaks + real before/after
- Pricing confirmed by Doug: keep 3 tiers (£750 / £950 / £1,500+).
- Team: renamed Marcus→Laura (Designer); all team photos now grayscale (consistent B&W set).
- Removed "Talk to us" link from the announcement bar on all pages.
- Circle marker now a fully CLOSED ellipse (Z path, no overshoot tail) — fixes "incomplete circle"; applies site-wide.
- Before/after slider now uses REAL screenshots (HosPortal old vs new — assets/ba-before.png, ba-after.png) via an image-comparison clip-path (slider.js sets clip-path; images line up pixel-for-pixel). Replaced the CSS mock panels.
- Note: dev-server CSS caching can mask edits in headless checks — bust with a ?v= query; real users get fresh CSS.

## [2026-05-29] fix | circle marker now fits any word length (root-cause)
- BUG (recurring, never actually fixed): the hand-drawn circle was ONE fixed SVG path stretched per-word via `preserveAspectRatio="none"`. Short words ("different") stretched into a fine ellipse; wide phrases ("the next level") stretched the SAME path into a long shallow oval whose arcs cut through the letters. No coordinate tweak could satisfy both word widths — structural, not cosmetic. This is why every prior "fix" still looked broken on screenshots.
- FIX: js/reveal.js now MEASURES each .draw--circle word's rendered box (getBoundingClientRect) and generates a fresh closed hand-drawn ellipse (4 cubic-bezier arcs + slight tilt, ellipsePath()) sized to that box, with a real-aspect viewBox (no distortion). Re-fits on document.fonts.ready, window load, and resize so it never goes stale. Underline logic unchanged.
- Verified via Playwright: "the next level" + "different" both render as complete loops enclosing the full phrase. Only console error is favicon 404 (harmless).

## [2026-05-29] fix | v5 batch — markers, packages, showcase dots, nav (Doug feedback)
- REMOVED circle markers entirely (Doug: circling is annoying + never fit wide phrases). Every `.draw--circle` across all 5 pages → `.draw--underline`. reveal.js simplified: ellipse generator deleted, now only underline (1 stroke) + new `scribble` (2 offset wavy strokes) variants.
- "the next level" hero → `draw--scribble` (double-stroke) as a FIRST PASS; Doug to send a reference screenshot to match exactly.
- Underline consistency: all underlines 5.5px non-scaling-stroke. Tightened overshoot to left:-2%/width:104% (was -8%/116%) — fixes the "Trusted by local businesses" line extending past the word.
- Nav "Get a Quote" `btn--black` → `btn--royal` (electric blue) on all 5 pages.
- Top-right hero avatar (avatar--2) top:-4% → 7% so the sticky nav no longer clips the face.
- Homepage packages: replaced 2 ad-hoc price-cards with the full 3-tier grid (Starter £750 / Growth £950 featured / Premium £1,500+), reusing pricing.html's `.tier`/`tier-grid` (loaded css/pages.css on index). Removed the now-redundant "need a shop?" callout (Premium covers it).
- Device showcase: the 3 browser-bar dots now act as a progress indicator — active dot stretches to a pill and fills royal over the 2.8s slide (js/showcase.js drives is-on/filling; home.css @keyframes dotfill). Reads as "loading", one example at a time.
- Marquee items: gradient-only backgrounds → real generic trade photos (loremflickr: plumbing/cafe/gym/dental/salon/electrical) with a navy tint overlay for label legibility.
- STILL PLACEHOLDER: showcase desktop+mobile screens (loremflickr) await Doug's 3 real examples. Verified via Playwright across home + pricing, 0 console errors.

## [2026-05-29] fix | hero scribble finalised to match Doug's reference
- Doug sent a reference: the "double squiggle" is ONE continuous lightning "Z" (long low bottom sweep → steep diagonal back up-left → short top sweep), not two parallel lines.
- reveal.js scribble = single path 'M20,54 L290,46 L150,14 L256,24' in a taller 300x66 viewBox (≈4.5:1) so the diagonal reads steep.
- Key fix: scribble no longer stretched full-width (that flattened the diagonal). preserveAspectRatio set to 'xMidYMid meet' for scribble only (underline still 'none'); rendered as a compact fixed-aspect accent centred under the phrase (css: left:32%; width:36%; height:auto; bottom:-0.30em) so it can't collide with the lead paragraph. Verified in browser, 0 console errors.

## [2026-05-29] feat | v6 — FAQ page, markers, real showcase, work imagery
- Scribble (hero "the next level"): now a single stroke = top line spanning next->level + a squiggle returning beneath. Sized via measured text (Range API): "next level" sits at left 28%/width 72% of the span, so scribble box = left 27% / width 74%. preserveAspectRatio back to none (top line spans the phrase exactly).
- Band underline "local businesses": root cause was CONTRAST, not length — royal marker vanished into the navy band so it READ as ending mid-word. Fix: `.band .draw__svg, .phero--dark .draw__svg { color: var(--color-soft) }`. Geometry was already full-width (104%, confirmed via Range measurement).
- FAQ: created standalone faq.html (3 categorised sections, 13 built-out answers, CTA). Removed the FAQ section from index.html. Repointed all nav "FAQ" links from index.html#faq -> faq.html (5 pages). Pricing page keeps its own pricing-FAQ. Home keeps final CTA + packages (Doug: leave those).
- Device showcase: replaced the fake desktop+phone frames with a browser-framed CAROUSEL of Doug's 3 real example mockups (assets/showcase-1..3.png = PrimalTraining/Etran/Area, each already shows desktop+mobile). Kept the 3 progress dots (now sit in the browser bar, fill in sync via showcase.js).
- "Our work" imagery: portfolio tiles + home case-cards now carry images. IMPORTANT lesson: loremflickr keyword search is unreliable (returned a skull for "clinic", a cat statue for several "webdesign,X" combos). Switched all placeholder imagery to picsum.photos/seed/<name> — always clean, never morbid. These are PLACEHOLDERS; swap for real client screenshots. (Marquee left on locked loremflickr trade photos — rendered fine.)
- Verified across home + faq + portfolio in browser; 0 console errors.

## [2026-05-29] decision | pricing tier features refined
- Tuned the three-tier feature lists in both `pricing.html` and the `index.html` home teaser.
- Page counts raised: Starter 3→**5 pages**, Growth 6→**8 pages**, Premium unlimited (unchanged).
- Priority support **time-boxed to 30 days** (was open-ended). Rationale: open-ended support on a one-off fee = unpriced forever-liability; ongoing now routes to the optional care plan (already in FAQ).
- Premium kept **Online shop / e-commerce** + **Custom features & integrations** despite Doug being lukewarm on custom. Defensible because every Premium job is "Get a Quote" at **£1,500+** — nothing is fixed-price, so the tier copy is a door-opener and the quote call is where scope/risk is controlled.
- Reviews & gallery (Growth) stays: it's a page section; client supplies the photos/reviews, so no media-chasing burden on Doug.
- Screenshot-confirmed both pages render correctly.

## [2026-05-29] edit | pricing tiers reworked (Doug)
- Renamed Starter -> **Basic** (pricing.html + index.html teaser + spec).
- Basic: removed "Contact / enquiry form" and "Mobile-first design" (mobile-first MOVED up to Growth per Doug's "push mobile-first onto growth" — flagged the move for confirmation).
- Growth: removed "Set up to be found on Google", "Booking / quote form", "Pay in stages available"; added "Mobile-first design"; "Everything in Starter" -> "Everything in Basic".
- Premium unchanged. Page counts (5/8) + "30 days priority support" were already synced from the spec edit.
- OPEN/flagged to Doug: pay-in-stages still referenced in pricing.html FAQ + faq.html "How do I pay?" — now contradicts Growth feature list. Awaiting decision (stages = Premium only?).

## [2026-05-29] feat | showcase = desktop browser + phone (cropped from composites)
- Doug: keep the desktop website as-is, lift the mobile (thin left column of each composite) into a phone mockup — the previous two-device look, now with real images.
- Cropping: no PIL/ImageMagick available, so used the browser canvas. Detected each composite's mobile/desktop content bounds via a column/row content scan (saturation+darkness vs the grey/white bg), then drawImage-cropped into assets/desktop-1..3.png (≈556x600) + mobile-1..3.png (≈260x600). Per-image boxes (Area/showcase-3 is tighter than the other two).
- Layout: .showcase__desktop (white browser card, 80% width, bar dots) shows the desktop crop (aspect 556/604); .showcase__phone (dark frame, 32%, overlaps front-right) shows the mobile crop (aspect 260/604). showcase.js unchanged — it already syncs both screen sets + drives the dots. Verified desktop + mobile (390px), 0 console errors.
- Source composites (assets/showcase-1..3.png) kept as the crop source (no longer referenced by the page).

## [2026-05-29] fix | hero scribble → clean 3-tier funnel
- Doug: the prior single-stroke scribble under "the next level" read as a messy lopsided swoosh. Wanted a clean, even squiggle of 3 tiers — widest at top, each tier narrower, bottom finishing as a point.
- Tried a continuous tapering serpentine first (one stroke) — still read as a 2-line swoosh, not distinct tiers. Switched to THREE separate centred lines (reveal.js SHAPES.scribble = 3 paths), each narrower than the one above, stacked into a symmetric funnel. Reuses the existing multi-path stagger so they draw top→bottom on scroll-in.
- viewBox 0 0 300 36; tiers centred on x=150 (6–294 / 66–234 / 120–180). CSS .draw--scribble: left:0 width:100% (full phrase, centred), bottom:-0.50em height:0.78em — lifted slightly so the bottom tier clears the lead paragraph.
- Verified in browser (Playwright, 1200px): 3 even tiers, no overlap, 0 console errors.

## [2026-05-29] fix | scribble dropped — hero uses plain underline
- Doug: scrap the special scribble under "the next level", just use one line like everywhere else.
- index.html hero span draw--scribble → draw--underline. Removed all now-dead scribble code: SHAPES.scribble + the type-branch in buildDraw (reveal.js), and the .draw--scribble rules (animations.css). One marker style site-wide now (underline only).
- Verified in browser, single wavy underline draws in correctly.

## [2026-05-29] fix | hero "the next level" — no marker
- Doug: remove the underline too. Hero phrase is now plain text (dropped the .draw--underline span). Underline marker code stays in place for the other headings; just not used on the hero.

## [2026-05-29] feat | portfolio "Our work" — real example designs, names removed
- Doug supplied 9 real website-design examples (one per category). Mapped each to its work-tile and copied to assets/work-{plumbing,cafe,gym,dental,salon,electrician,garden,restaurant,physio}.{png,jpg,jpeg,webp}.
- Removed the (fictional) business-name <strong> from every tile for anonymity — kept only the category·type <small> line.
- .work-tile: background-position top center (shows each site's hero/nav); ::after tint lightened to transparent-top -> dark-bottom so the design stays visible and only the label strip darkens.
- NOTE: these are real OTHER companies' sites used as design examples under "businesses we've lifted" — copy still flags them as placeholders; swap for genuine client work (or reframe heading to "designs we love") before launch to avoid misrepresentation.
- Verified portfolio grid in browser (9 tiles, all real images, 0 errors beyond favicon).

## [2026-05-29] feat | portfolio hover-to-reveal-whole-design
- Problem: landscape site screenshots in portrait tiles got cover-cropped to a "random middle" sliver.
- Fix: work-tiles -> 4/3 landscape (read as website previews); default background-size:cover + position:top center shows each site's top cleanly. Added a per-tile <img class="work-tile__full"> (object-fit:contain over navy, opacity 0) that fades in on hover to show the ENTIRE design; the category label + bottom tint fade out on hover. Pure CSS, degrades fine on touch (no hover = thumbnail + label).
- Verified default grid + hovered tile (full Hilton design revealed), 0 console errors.

## [2026-05-29] content | case studies + full cross-page consistency pass
- Home "Recent case studies": swapped the 3 fake cards (Plumbing Co./Corner Cafe/FitZone Gym) for Doug's real clients — PrimalTraining (desktop-1), Etran (desktop-2), Area (desktop-3) — using the real screenshots as card images, with fitting tags (Fitness/Fintech/Tech). Subheading "Real local businesses… (Swap these…)" → "Real businesses, real redesigns." PENDING: result-metric line shows "↑ [stat — Doug to confirm]" on each — Doug to supply 3 real numbers. (Auto-scroll strip + portfolio tiles still placeholders — left per Doug.)
- Cross-page text audit (pricing.html = source of truth). Fixed drift:
  - Tier name "Starter" → "Basic" (faq ×2, pricing ×1).
  - FAQ page counts: 3→5 (Basic), 6→8 (Growth) to match tier cards.
  - "one-page site" blurb (index + pricing) contradicted "Up to 5 pages" → "Great for getting a smart, simple site live fast."
  - FAQ claimed Growth includes "Google setup" — that's Premium-only ("Advanced Google setup"); removed.
- DECISION (Doug): mobile-first is UNIVERSAL, not a tier feature. Removed "Mobile-first design" from the Growth bullet (index + pricing), replaced with "Contact & enquiry form" (distinct from Premium's transactional bookings). FAQ/homepage "every site is mobile-first" now non-contradictory.
- DECISION (Doug): Web Lift presents as a small TEAM, not solo. Rewrote all "one person / the person building your site" copy (about hero, about-card, about meta, home "what makes us different") to team voice while keeping the "deal directly, no account managers, no runaround" selling point. (Note: project CLAUDE.md still says "Doug delivers end-to-end / one person" — site now diverges by Doug's explicit choice.)
- BUG fix: FAQ "What's *not* included in the price?" summary — the <em>not</em> made it a 3rd flex child, so `summary{justify-content:space-between}` gap-spaced "What's / not / included". Wrapped the question in a <span> (one flex item again). No global CSS change. Screenshot-confirmed.
- Verified pricing, about, faq render correctly in browser.

## [2026-06-02] launch-prep | forms wired to Formspree + deploy plan
- Both quote forms (home CTA + contact page) were front-end stubs (`onsubmit="return false;"`, no field names). Wired to Formspree endpoint `mlgvqpwb` (POST, named fields, `_subject` per page). Enquiries land in the hello@web-lift.co.uk inbox. NOTE: first-ever submission triggers Formspree's one-time activation email — Doug must click it once, then verify a real test submission arrives (ship-check: real-flow not yet fired).
- Deploy target: Vercel (static site, no build). Awaiting Doug's one-time `npx vercel login`, then `vercel deploy --prod`. Custom domain web-lift.co.uk to be pointed at Vercel via 123-reg DNS afterwards.
- Portfolio: Doug's explicit call to KEEP the example designs as-is for now (passing-off risk flagged; swap for real client work once first job lands).

## [2026-06-02] launch | site live on web-lift.co.uk
- Deployed to Vercel via CLI (`vercel deploy --prod`) from the site subfolder — uploads only weblift/, NOT the whole dwcw workspace. Git auto-deploy deliberately SKIPPED (would mean pushing the full workspace + root .env keys to GitHub; needs private repo + gitleaks first). Added .vercelignore to keep wiki/scratch/CLAUDE.md off the live site.
- Custom domain: added web-lift.co.uk + www to the Vercel project. DNS lives on GoDaddy nameservers (ns75/76.domaincontrol.com), reached via 123-reg. Chose A-record route (apex + www → 76.76.21.21) over nameserver change — deliberately, to avoid moving MX/TXT and breaking Workspace email. Doug deleted the old `A @ Parked` + `CNAME www` records that conflicted. Verified: both domains HTTP/2 200, HTTPS cert issued, DNS resolves on authoritative + public resolver.
- OUTSTANDING (ship-check, not yet passed): forms wired but real-flow NOT fired — Doug must submit once, click Formspree's activation email, confirm enquiry lands. Visual render not screenshot-confirmed this session (browser tool locked); Doug to eyeball live site.
- Workspace/email (separate from site): consolidating two paid seats (Doug@ + hello@) down to one — keep hello@ as sole mailbox + admin, Doug@ becomes a free alias, downgrade plan to Business Starter to cut the £28/mo bill. Admin actions are Doug's (not tool-accessible).

## [2026-06-02] feat | animated "logo draws itself" branding tile + favicon
- Doug wanted the home **Logos & branding** tile (was a `loremflickr` placeholder img) to be a fresh animated logo that represents the branding service. Gave him 3 concepts via picker (logo-draws-itself / brand-identity-card / morphing-marks) — he chose **logo-draws-itself**.
- Built pure SVG/CSS, zero deps, brand palette only. `.feature__media--brand` in index.html holds inline `<svg class="brandanim">`: rounded-square + the real logo's upward arrow + a wavy underline, all `pathLength="1"` so `stroke-dashoffset` draws them on a normalised scale. One 6s CSS loop (home.css): box draws → arrow draws → brand colour fills → underline sweeps → hold → fade → restart. Navy `--grad-deep` panel so the light mark pops. `prefers-reduced-motion` pins to final state. Net −1 broken loremflickr request (placeholder removed).
- **Favicon**: none existed site-wide. Made `assets/favicon.svg` = arrow-mark only (navy square + white arrow, no wordmark) from the existing logo; wired `<link rel="icon">` + `apple-touch-icon` into all 6 pages' heads.
- Verified in browser (Playwright, localhost): mid-draw frame (square outline + arrow tracing, hollow) and filled frame both correct; WAAPI seek confirmed fill-opacity/dashoffset timing is real, not snapped. Favicon loads 200. The 9 console errors are pre-existing loremflickr 500s elsewhere (auto-scroll strip Doug kept), none from this change.
- NOT yet done: live-site verification — these changes are local only, not yet deployed to Vercel.

## [2026-06-02] tweak | branding tile — drop underline, assemble into Web Lift lockup
- Doug: loved the animation but wanted the squiggly underline gone, the mark vertically centred, and a new ending — mark slides LEFT while "Web Lift" comes in from the RIGHT to form the full logo.
- Removed `.brandanim__line` (markup + CSS + `ba-line-draw`). Wrapped mark in a `.brandanim__mark` group; added `.brandanim__word` `<text>` ("Web" #fff / "Lift" #57A6FF). New keyframes `ba-shift` (mark translateX 0→−100px) + `ba-word-in` (word fade + slide from +34px), both firing 46–62% after the fill. Loop bumped 6s→6.5s for the extra phase. viewBox 300→200 tall so the mark sits centred with the line gone. reduced-motion pins to the final lockup.
- Verified both phases in browser (Playwright + WAAPI seek): centred draw frame and assembled lockup both correct, well-balanced.

## [2026-06-02] infra | extracted to its own repo + renamed to WebLift
- Project moved out of the dwcw monorepo into a standalone **private** GitHub repo: `douglaswoolfenden-byte/weblift`. Folder renamed `website_revamp_business` → `weblift`.
- dwcw no longer tracks this project (added to dwcw root `.gitignore` under the "per-project repos" block, same pattern as thesoundcave). Wiki travels with the repo, still inside the Obsidian vault on disk.
- Fresh git history (initial commit; old monorepo commits not carried over). gitleaks scan clean before first push. `.vercel` link untouched — CLI deploys still work.
- Follow-up (not done): connect this GitHub repo to Vercel for git-based deploys if desired; currently deploys via `vercel deploy --prod` CLI.

## [2026-06-03] site + architecture | removed false rating; extracted shared kit + mockup workflow
- **Removed the unverified "4.9 ★ Google rating"** from the business site (Doug: it's not true). Stripped the announce-bar rating on all 6 pages + the hero "Rated 4.9/5" trust line. Header screenshot-confirmed clean. (Left the About-page testimonial quotes — separate placeholder content.)
- **Extracted a shared `kit/`** as the single source of truth for the foundation: `git mv` of `tokens.css`, `css/base.css`, `css/animations.css`, `js/reveal.js` → `kit/`. Re-pointed all 6 business-site pages' `<link>`/`<script>` hrefs. Verified live site renders + **0 new 404s** (only pre-existing loremflickr 500s).
- **Mockup workflow established:** prospects now built from `mockups/_starter/` (`cp -r`) — a working blank template (nav/hero/services/about/contact/footer) that *links* the kit via `../../kit/…` and carries only a small `style.css` + a `prospect.md` status tracker. Starter screenshot-confirmed: kit loads from a mockup folder (Outfit font, palette, pill buttons, hand-drawn underline all render).
- **Why captured** in `wiki/decisions/0001_shared_kit_per_prospect_mockups.md`: storage isn't the constraint (git is the archive; `git rm` dead prospects), forked CSS is — so one linked kit, many thin mockups. CLAUDE.md got the imperative convention block.
- **Predates the kit, migrate later (not now):** the Homerton mockup + business-site `css/home.css`/`css/pages.css` still hold their own component CSS. Component layer (`kit/components.css`) to be promoted only when a 2nd mockup reuses a pattern.

## [2026-06-03] build | first prospect mockup — G.S Garage (gs-garage)
- New cold prospect: G.S Garage Services & MOT Ltd (Stratford, E15) — strong reputation, no real website (bare Google Site). ~20% close estimate.
- Scaffolded `mockups/gs-garage/` from `_starter` (kit linked via `../../kit/`, never forked). First real mockup on the shared-kit workflow.
- Single long page: animated hero → reviews (4.9★/800+) → 8 services → gallery (placeholder tiles) → location+hours+live Google Map → booking-form stub → footer. Built only `index.html` + `style.css` + `prospect.md`.
- Brand: rugged charcoal `#1A1C1F` + amber `#F5A623`, set via `:root` overrides in the mockup's `style.css` only (`--color-royal`/`--color-navy`/`--color-bg`/etc.). Old-school workshop feel per Doug.
- Hero moment: self-drawing line-art **car on a 2-post lift** — inline SVG, `pathLength="1"` + `stroke-dashoffset` 1→0 via a pure-CSS `gs-draw` keyframe with staggered `animation-delay`s. No external API (Higgs Field declined — kept it free/quick). Reduced-motion pins to the finished drawing. Reuses the kit's draw-on language but is self-contained (kit `reveal.js` only handles the `.draw` underlines + `data-reveal`).
- Desktop + mobile (390px) screenshot-confirmed: hero, all sections, live map pin on 26 Maryland Road, mobile stack all good.
- ⚠️ Before sending (also in prospect.md): VERIFY 4.9★/800+ figure with owner (marked `<!-- VERIFY -->`; we removed an unverified rating from our own site before — commit 808ef1e); swap placeholder testimonials + gallery photos for real ones; booking form is a non-functional stub.

## [2026-06-03] revise | GS Garage v2 — their blue, real photos, simpler
- Doug feedback after v1: remove all decorative draw-underlines; match THEIR colour tone; use real images from their Google Site; "more basic, more garage, simple".
- Pulled their brand + photos via Playwright: their Google Site header is steel-blue (#226E93) and their real signage is a blue board — so switched palette from amber/charcoal to **GS Garage blue #1F5C97 on white** (dark slate #16293A for hero overlay/footer). Removed every `.draw--underline` span.
- Image grab was fiddly: googleusercontent `sitesv` URLs 403 on curl and block crossOrigin canvas, but render fine as plain <img>. Worked around it — injected all 32 site images into the page, screenshotted a contact sheet to choose, then element-screenshotted the chosen 8 at w1100 into `mockups/gs-garage/assets/` (sips-compressed to ~1.3MB total).
- Replaced the line-art car hero with a **real workshop photo hero** (workshop-4 + dark-blue overlay) and the placeholder gallery tiles with **6 real photos** (incl. their actual blue signage). Flattened gradients/removed amber glow for a more basic, garage-honest feel.
- Desktop + mobile screenshot-confirmed (hero, reviews, services, gallery, mobile stack). Testimonials still placeholder; rating still needs owner verification.

## [2026-06-03] ship + park | GS Garage preview deployed + design sent
- Deployed a self-contained bundle (kit + real photos inlined, `../../kit/` paths rewritten to `kit/`) to Vercel prod under `douglaswoolfenden-byte`: **https://gs-garage-preview.vercel.app** (clean alias, public, no auth wall — verified live end-to-end). Bundle lives in gitignored `scratch/gs-garage-preview/`; rebuild from `mockups/gs-garage/`.
- Deploy method note (reusable): only the bundle dir is deployed via `npx vercel deploy --prod --yes` from inside it — NOT the repo root — so the wiki/scratch/other prospects stay private. CLI was already authed.
- Sharing strategy agreed: live link + Doug records a Loom (control narrative, see watch analytics, theft-proof pitch); expiring link = urgency.
- Week-max guardrail: Google Calendar reminder set for 2026-06-10 09:00 to take the preview down (or `npx vercel remove gs-garage-preview --yes`).
- **Design sent to owner; prospect parked** (busy, likely no). Outstanding if revived: verify 4.9★/800+, swap placeholder review quotes for real ones, wire booking form. First end-to-end run of the shared-kit → per-prospect-mockup → deploy workflow.

## [2026-06-03] build | second prospect mockup — MWorks UK (mworks), FIRST multi-page mockup
- New cold prospect: **MWorks UK** ("MWorks MOT and Repairs") — independent MOT centre + servicing garage + **bodyshop**, 290 & 295 Clare St, London E2 9HD (railway-arch unit off Hackney Rd). ~20 yrs. Their current site = generic yellow WordPress "go-x" template, no clear MOT booking. Doug's brief: multi-page, enhance/bg-remove logo, Google reviews + map + hours + photos, drop the yellow, "clean rustic, simple yet dynamic and animated".
- **First MULTI-PAGE mockup** (GS Garage was single long page). 5 pages — Home / Services / Gallery / About / Contact — with a shared cream sticky nav (active state per page) + a small mockup-level `nav.js` for the mobile drawer (the kit has no menu toggle, only a stub comment). Kit linked via `../../kit/`, never forked.
- **Brand "Workshop Rustic"** (Doug picked via palette picker): warm cream `#F4EFE7`, charcoal `#1F1B18`, **oxblood-rust `#9E3B2E`** accent, brushed-steel `#6B6256`, espresso dark bands, ochre stars only. No yellow. Set entirely via `:root` overrides in `mockups/mworks/style.css`. Skipped the kit's `.draw--underline` scribbles (Doug removed them on GS) — animation = scroll reveals + image hover-zoom only.
- **Verified real data** from the Google listing Doug supplied: **4.9★ / 160 reviews** (safe to show — unlike GS's unverified figure), real review quotes (Cdr; Mahbubur Rahman), Mon–Sat 10–7 hours (corrected Doug's earlier 9–6 pick — Google + their own site both say 10–7), both phone lines. Live Google Map embed confirmed loading (network: place + tiles 200; pin on 295 Clare St).
- **Logo:** pulled from live site, **white background removed via Pillow** (no ImageMagick on box) → `assets/logo.png` (dark, transparent) + `assets/logo-white.png` (knockout for dark hero/footer). Did NOT use the kit's `.nav--on-dark` content-swap (its `../assets/` path points at the business site, not a mockup).
- **Images:** real MWorks photos pulled + compressed (`workshop-arch` brick-arch MOT bay = hero, `engine-bmw`, `stripped-front`, `porsche-brakes`, `tools`) + 2 stock from their template (`bodyshop-mask`, `engine-rustic`). Originals kept in `assets/raw/`. ~1.7MB total.
- **Screenshot-confirmed** desktop (1280) + mobile (390): hero, trust strip, services, why-split, reviews, map, gallery grid, contact form+map, mobile burger drawer all good.
- UI framing saved in `wiki/spec/mockup_mworks.md`; pipeline in `mockups/mworks/prospect.md`.
- **NOT yet deployed** (awaiting Doug go-ahead — outward-facing). Open asks: real before/after bodywork photos for the gallery; confirm which phone leads "Book your MOT"; wire the enquiry-form stub to Formspree before real handoff.

## [2026-06-03] revise | MWorks v2 — Doug feedback (logo, header, booking widget, reviews, pricing, real photos)
- **Logo** autocropped (Pillow `getbbox`) → `logo-crop.png` and enlarged in nav (68px) so the tagline reads; removed redundant white hero logo (was a double wordmark with the now-big nav logo).
- **Top utility bar** above nav on all 5 pages (📞 phone · 🕒 hours · 📍 location · ★4.9(160) left; **Book your MOT** right); phone/CTA moved out of the nav.
- **Hero quick-booking widget** (reg input + service select + Get started → contact). Reg field styled UK-number-plate yellow (plate convention, not branding) — flagged to Doug given his no-yellow rule.
- **Reviews** fixed (text was faint grey → dark/readable) + rust avatar initials + Google "G" badge; pulled **8 real 5★ Google reviews** off the listing (Cdr, Chloé Palmer, Rukon Miah, Amar Sharif, Mo Ahmed, Jasmine Brown, Mahbubur Rahman, Ali) — 6 on home, 3 on about.
- **Pricing** section on services (MOT £45 featured / Interim £99 / Full £169 / Bodywork free quote) — figures are PLACEHOLDERS, flagged to confirm with owner.
- **8 real premium photos** Doug supplied via Google-listing share links (resolved goo.gl→lh3 URLs by curl, bumped to w1600, compressed): Morgan on ramp, AMG G63, Rolls Wraith, classic Merc+Bentley, Aston DB11 ×2, busy workshop, BMW M4 wheel. Gallery rebuilt to 10 real shots; Morgan anchors home "why us". Deleted the 3 stock images — site is now 100% real photos. Assets 3.3MB.
- Screenshot-confirmed desktop (1366) + mobile (390): header/logo, booking widget (incl. mobile stack), reviews, pricing, gallery. 0 broken image refs. NOT yet deployed (awaiting go-ahead).

## [2026-06-03] revise | MWorks v3 — conversion + old-school restyle; folder reorg
- **Note:** mockups reorganised by Doug into `mockups/garages/<prospect>/` (mworks, gs-garage, homerton-car-repairs, _demo-garage); kit links updated to `../../../kit/`. All v3 edits intact post-move. New local URL: `/mockups/garages/mworks/index.html`.
- **Old-school restyle:** added **Oswald** (condensed signage) as display font for hero/section titles/numbers (uppercase); global SVG **film-grain** overlay + brushed texture on the grey bands.
- **Logo-derived theme:** shifted accent oxblood→**vintage red** `#C0392B` (CTAs/links + thin red top rule); dark bands espresso→**gunmetal grey** `#2B2D31` (textured) — Doug: "use the grey and the red, add texture into the grey."
- **Centred header:** logo in line with centred tabs, **Book your MOT** red button pinned right (desktop); topbar = info-only on desktop, Book MOT shows in topbar on mobile; drawer breakpoint 1024.
- **Split hero (conversion):** headline left, **quick-booking card on the right**, vertical (reg → service → Get started), raised to centre. Stacks on mobile.
- **Reg input → vintage black/silver pressed plate** (was number-plate yellow) — kills the only yellow + leans old-school.
- **Services pricing moved to the top** (right under the header) + clearer heading — was buried.
- **Gallery → masonry collage** (CSS columns, varied heights).
- **About: team section** (Fahim = service/MOT, Hassan = bodyshop, + crew) with monogram avatars; "photos coming soon" flagged.
- Screenshot-confirmed desktop (1440) + mobile (390): centred header, split hero, vintage plate, grey-textured bands, pricing-top, collage gallery, team. 0 broken refs at new path.

## [2026-06-03] revise | MWorks v4 — header re-lay, grey palette, full-width
- **Header:** logo → LEFT (aligned to hero headline), tabs → CENTRED (page-centred via 1fr/auto/1fr grid), Book MOT red pinned RIGHT; **topbar info (phone/hours/location) centred**.
- **Whole page → monochrome GREY** (`--color-bg #E7E7E4`, surface `#F2F2EF`) + red accent — Doug: "almost all one grey colour with the red accent." Dark bands stay gunmetal; grain texture kept.
- **Full-width:** `--maxw` 1200 → 1360. Booking card right-aligned (justify-self end) so its right edge lines up with the top Book MOT button.
- **Reg field reverted to number-plate YELLOW** (Doug: "I liked it yellow like a plate") — kept the plate styling.
- Screenshot-confirmed desktop (1440) + mobile (390): logo-left/tabs-centred header, centred topbar, grey page, yellow plate, right-aligned booking card.

## [2026-06-03] ship | MWorks preview deployed to Vercel
- Live at **https://mworks-preview.vercel.app** (prod, scope douglaswoolfenden-bytes-projects). Self-contained bundle in gitignored `scratch/mworks-preview/` (kit inlined, paths rewritten kit/), deployed via `npx vercel deploy --prod --yes --name mworks-preview` from inside the bundle (repo/wiki/other prospects stay private). Verified live: 200, public (no auth wall), kit+assets 200, renders identical to local (desktop screenshot-confirmed). Takedown ~2026-06-10 (`npx vercel remove mworks-preview --yes`). Ready for Loom + send.

## [2026-06-04] research + restructure | niche pivot to home-improvement trades
- Garages produced live leads but zero conversions. Researched (3 parallel angles: lead-buying, web-presence, cold-call reachability) the best UK niche for a cold-call redesign motion. Wrote wiki/research/niche_selection.md.
- DECISION: pivot primary niche garages → **high-ticket home-improvement trades** (kitchen/bathroom fitters, extension/loft builders, landscapers/driveways, roofers). Deciding filter: *do they already buy leads?* Garages don't (locality + word-of-mouth + repeat → no "leads=money" belief). Trades do (£600–£1,500/yr Checkatrade/Bark/MyBuilder) → ROI pitch pre-sold; one job pays the site 3–15×; owner answers the phone himself. Secondary: wedding suppliers (off-season only). Avoid: clinics/solicitors/accountants (gatekept), dentists/estate agents (over-served), restaurants/salons (weak ROI).
- Compliance flag for the future scraping pipeline: screen every number vs TPS *and* CTPS (sole-trader trades sit on consumer TPS); ICO fines to £500k.
- RESTRUCTURE: mockups now segment by niche — `mockups/<niche>/<slug>/`. git mv'd the 4 garage mockups into `mockups/garages/`; created `mockups/home-improvement/` (with README). Assets segment by niche automatically (live inside each prospect folder).
- Depth fix (the silent-break risk): nesting one level deeper changed kit links `../../kit/` → `../../../kit/` and root-asset links `../../assets/` → `../../../assets/` (homerton favicon). Rewrote all garage mockups + recalibrated `_starter` to niche-nested depth. Amended decision 0001; updated project CLAUDE.md new-prospect command.
- Verified: served locally, gs-garage returns 200, kit/tokens.css 200, internal asset 200; Playwright render confirms full kit styling at new depth (Outfit font, navy palette, nav/hero/footer all load). Only console error = harmless favicon.ico 404.

## [2026-06-10] spec | Outbound Lead Machine — n8n pipeline specced (not yet built)
- Doug brought an n8n outbound lead-gen plan from a chatbot; turned it into a WebLift-fit spec + build guide. Decisions locked via picker: outbound-first, **review-queue output (no auto-send)**, n8n Cloud 14-day trial → Railway (~$5/mo) after, Apollo as lead source (with caveat), Haiku 4.5 for both AI steps, Google Sheets queue.
- 6-stage pipeline: Manual Trigger → Set(config) → Apollo search → IF has-website (no→auto-qualify) → Firecrawl fetch → Claude audit (JSON) → IF bad (false→drop) → Claude pitch → Sheets append → Slack ping.
- **Corrected the chatbot plan:** dropped its "AI Agent + Window Buffer Memory" node (audit is one-shot/stateless — memory = cost for nothing); dropped its Phase-4 auto-email (PECR risk on sole-trader trades + domain reputation); updated "Claude 3.5 Sonnet" → Haiku 4.5 (`claude-haiku-4-5-20251001`); added a real Firecrawl fetch step + a no-website auto-qualify branch (no-site = hottest leads).
- Compliance gate baked in: `tps_ctps_checked` Sheet column — no number dialled until screened vs TPS+CTPS (sole traders on consumer TPS; ICO £500k). Lifted from niche_selection.md.
- Honest Apollo flag: weak on one-man trades; fallback = manual CSV or Apify Google Maps, swapping only the source node.
- Files: `automation/build_guide.md` (vibe-coder node-by-node), `automation/prompts.md` (audit + pitch prompts), `wiki/features/outbound_lead_machine.md` (spec); linked from outreach.md. Importable workflow JSON deferred (node-version risk).
- NEXT: build it in n8n; first real test = does Apollo's API return usable local trades on Doug's plan?

## [2026-06-10] build | Outbound Lead Machine — workflow BUILT in n8n via MCP (not yet tested)
- n8n MCP re-authed; built the full 19-node "WebLift Lead Machine" programmatically via the n8n Workflow SDK and pushed to n8n Cloud: https://dougal.app.n8n.cloud/workflow/EcTXui207L8aIhoW (personal project). SDK source kept at `automation/lead_machine_workflow.ts`.
- Upgrades over the build_guide plan while porting: Structured Output Parser sub-nodes on both Claude steps (replaces the fragile Code-node `JSON.parse` — n8n validates + retries malformed JSON itself); a `Normalize Lead` Set node pinning company/website_url/phone to a stable shape right after Apollo (audit + Sheet read from it via `$('Normalize Lead')`, so Apollo response-shape quirks can't break downstream); homepage text truncated to 6k chars in the prompt (token cap); both triggers wired now (Manual for testing + daily 9am Schedule, inert until workflow is activated — no swap step later).
- Spec invariants kept: review-queue only (no auto-send), bad-site FALSE branch drops silently, no-website branch auto-qualifies (score 1, "No website at all"), `tps_ctps_checked` blank + `status` NEW on every row, Haiku 4.5 both AI steps, max_leads 3 in Settings.
- NOT yet runnable — Doug's two manual steps: (1) create 4 credentials in n8n vault (Anthropic / Apollo header X-Api-Key / Firecrawl Bearer / Google Sheets OAuth) and pick them in the 6 nodes; (2) create "WebLift Leads" Sheet with the 9-column header row and select it in the Sheets node. Then first test = "Test step" on Search Apollo alone (the known-risk node — may 403 or return only big firms on Doug's plan; fallback = manual CSV or Apify, swap only that node).

## [2026-06-11] ship | Outbound Lead Machine — FIRST CLEAN END-TO-END RUN ✅
- Execution 11 green: Maps search → normalize → Firecrawl scrape → Haiku audit → gate → Haiku pitch → 3 rows appended to "WebLift Leads" Sheet (doug@weblift.co.uk Workspace). First real output: Ace Kitchens 3/10 (no phone on homepage), Icon Kitchen Designs 5/10 (buried contact), Price Kitchens 4/10 (zero trust signals) — each with on-voice draft pitch + 3 call talking points, tps_ctps_checked blank, status NEW.
- **Apollo → Apify swap (decision):** Apollo free plan 403s the company-search endpoint and is thin on one-man trades; swapped node 1 to Apify `compass~crawler-google-places` run-sync-get-dataset-items (free $5/mo credit). Google Maps data proved ideal — name/phone/website per listing. Split Companies node removed (Apify returns per-item already). APIFY_API_TOKEN added to .env.
- **Credential debugging war (10 failed runs, lessons):** (1) n8n Header Auth two-field form is a foot-gun — Doug pasted token into Name field / bare key without Bearer prefix repeatedly; (2) Firecrawl 401 fingerprinting via curl pinned it: "Unauthorized"=no header, "Unauthorized: Token missing"=missing Bearer prefix; (3) fix = switch HTTP nodes to **Bearer Auth** type (n8n adds prefix itself) + load Doug's clipboard via `pbcopy` from .env so the paste is exact. Scrape Website node now httpBearerAuth like Search Google Maps. Pattern for all future n8n cred setup: prefer Bearer Auth type; pbcopy the value; create FRESH credential, never edit masked fields.
- Sheet header typo `wesbite`→`website` (C1) was the final blocker — Sheets node validates live headers against its schema.
- Remaining before daily use: Doug reviews the 3 pitches (read-aloud test), TPS/CTPS screening before any call, Firecrawl free-plan concurrency throttles at 2 (fine at max_leads 3), schedule trigger exists but workflow NOT activated — activate only after pitch quality is proven.

## [2026-06-11] build + ship | Lead Machine v2 (multi-niche, qualify-mode) + weblift-demos LIVE
- **Workflow v2 via n8n MCP** (19→30 nodes, two atomic update batches): 5 premium niches in ONE Apify Maps call (`searchStringsArray` ×5, `scrapeContacts: true`, `maxImages: 4`; leads self-tag from `searchString`); email = Apify enrichment || Haiku audit `contact_email`; free MX verification via dns.google → `email_verified`; demo-asset chain (Build Demo URL → Firecrawl screenshot `&capture=1` → Kling o3 fal-queue poll loop w/ no-expiry lifecycle header, ~$0.42/clip) → Haiku writes pitch+email copy in ONE call (merged, not two) → deterministic HTML template → Gmail **draft** w/ snapshot attached → Sheet.
- **Qualify/outreach split (Doug's call — nothing outward until proven):** outreach tail BYPASSED. Active path: Prep Pitch → Verify Email MX → Write Pitch → Build Email HTML (defensive try/catch lookbacks) → Sheet. Re-enable = 2 connections (documented in outbound_lead_machine.md). Qualify-mode needs no new creds — testable today.
- **weblift-demos.vercel.app LIVE**: one premium template ×5 themes, personalised by URL params, gradient fallbacks, param injection via textContent only. Screenshot-confirmed kitchen desktop+mobile / garden no-photos / driveway palette / prod e2e. Bug found+fixed: IntersectionObserver reveals = blank sections in headless captures; `navigator.webdriver` detection FAILED (Playwright MCP spoofs it false) → explicit `?capture=1` param, appended by the n8n screenshot node. UI spec wiki/spec/demo_page.md (framing answered by stated defaults — confirm look with Doug at outreach test).
- **MCP friction logged:** update_workflow validator refuses ANY credential attach on httpRequest nodes (even valid generic-auth ones the UI accepts) → creds must be picked in the n8n UI. setWorkflowMetadata description caps at 255 chars. GOOGLE_REFRESH_TOKEN in .env is empty — Sheets API via local curl dead-ended; Sheet header/Stats setup parked in temp workflow jUf5dBft177IPPIy (Doug: pick cred ×3 nodes, run, delete).
- **Doug's checklist before outreach-mode:** (1) run TEMP Sheet-setup workflow; (2) create fal Header Auth cred (`Authorization` / `Key <FAL_KEY>` — NOT Bearer, pbcopy from .env) + pick in Submit/Check/Fetch Kling; (3) create Gmail OAuth2 cred + pick in Create Gmail Draft; (4) pick Firecrawl Bearer in Screenshot Demo; (5) qualify-mode test run + read pitches aloud. Schedule stays OFF.
- Costs at 15 leads/day full outreach: ~$6.50/day (Kling dominates). Qualify-mode: pennies. Volume dial = Settings `max_leads` (per niche per day).

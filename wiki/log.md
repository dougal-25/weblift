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

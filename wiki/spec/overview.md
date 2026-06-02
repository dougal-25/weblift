# Web Lift — Spec Overview

**Domain:** web-lift.co.uk (registered via 123-reg). Google Workspace email being set up on this domain.

## One-liner
Done-for-you website redesigns for local small businesses. We take a tired, slow, or embarrassing website and turn it into something that wins customers — for a single flat fee, no jargon, no hassle.

## The problem
Most local SMBs (plumbers, cafes, gyms, dentists, trades) have one of three website situations:
1. **No real site** — a Facebook page or a half-finished Wix from 2015.
2. **An old site** — dated design, broken on mobile, slow, no clear way to contact or book.
3. **A site they're embarrassed by** but have no time, skill, or appetite to fix.

They know it's costing them customers. They don't know how to fix it, fear it'll be expensive, and dread dealing with a "web agency" that talks down to them.

## The offer
- **Done-for-you redesign.** Doug handles everything: audit, copy, design, build, launch.
- **Fixed package fee.** Price quoted upfront, no hourly billing or surprise invoices. Three tiers (confirmed 2026-05-29): **Basic £750** (up to 5 pages — renamed from "Starter"), **Growth £950** (up to 8 pages, mobile-first design, logo, reviews/gallery — the popular one), **Premium £1,500+** (unlimited pages, e-commerce, custom features, advanced Google setup, 30 days priority support). Support is **time-boxed (30 days)** to protect the one-off-fee model; ongoing = optional care plan. E-commerce/custom kept as door-openers — every Premium job is quoted individually, so nothing is fixed-price. **Removed from Growth 2026-05-29:** Google setup, booking/quote form, pay-in-stages (Google setup now Premium-only; mobile-first moved up from Basic to Growth). Live in `pricing.html` and the home-page teaser in `index.html`.
- **Fast turnaround.** A small business site is days, not months.
- **Plain English.** No tech jargon. The client describes their business; we deliver a site that works.

## Who it's for
Local SMBs — see [Local SMB persona](local_smb.md). Owner-operators who are great at their trade and have no interest in becoming web people.

## Who it's NOT for
- Enterprises / large companies with in-house marketing.
- Startups needing complex web apps, dashboards, or custom software.
- Anyone wanting ongoing dev work — Web Lift is a **fixed-scope redesign**, not a retainer dev shop (a "care plan" upsell may come later, but it's not the core).
- E-commerce stores with hundreds of SKUs (out of scope for v1; simple "book/contact us" sites only).

## How we win
- **No-agency feel.** Friendly, direct, fast. The anti-agency.
- **Flat fee removes the #1 fear** SMBs have about web work: unpredictable cost.
- **Show, don't tell.** Before/after demos, real local examples.
- **Speed.** We turn it around while a traditional agency is still scheduling the kickoff call.

## Success looks like
- First paying client delivered end-to-end.
- A repeatable [delivery process](delivery_process.md) so each job takes less effort than the last.
- A landing page that converts cold local-SMB traffic into enquiries.

## Open questions
- **Tech stack for delivered client sites** — hand-coded vanilla, a site builder (Webflow/Framer), or a template system? Affects margin and turnaround. _(This is about what we deliver to clients — separate from Web Lift's own marketing site, which is vanilla HTML/CSS/JS.)_
- **Geographic focus** — London-only first, or remote/UK-wide?
- **Niche-down** — one trade vertical first (e.g. only trades, or only hospitality) vs. all local SMBs?
- **RESOLVED 2026-05-29:** pricing = 3 fixed tiers (£750 / £950 / £1,500+).

## The marketing site (web-lift.co.uk)
Built as a 6-page vanilla HTML/CSS/JS site, palette derived from the logo (navy + blue), with a draw-on-scroll animation system. Pages: **index** (home), **about**, **pricing**, **portfolio** (our work), **faq**, **contact**. Markers are underline-only across the site (circles removed) plus a one-off "scribble" on the hero. See [Landing page UI spec](landing_page.md) and [Animation system](animation_system.md).

**Logos & branding tile (DONE 2026-06-02):** the home "Logos & branding" feature row is now an animated "logo draws itself" SVG (pure CSS, brand palette) instead of a loremflickr placeholder — see [Animation system](animation_system.md). A favicon (`assets/favicon.svg`, the arrow-mark) was also added to all 6 pages. Both are LOCAL only — not yet redeployed to Vercel.

**Still to do before launch:** the device showcase uses 3 real example mockups (assets/showcase-1..3.png) and the portfolio "Our work" tiles now use 9 real example site designs (assets/work-*, anonymised — category labels only). These are other companies' sites used as design examples, so before launch either swap for genuine Web Lift client work or reframe the "businesses we've lifted" heading as inspiration. Home case-cards + example cards still use picsum placeholders. ~~Wire the contact/quote forms to a backend~~ DONE (2026-06-02): both forms POST to Formspree `mlgvqpwb` → hello@web-lift.co.uk. Still to do: fire one real test submission + click Formspree's activation email; point web-lift.co.uk DNS at the host once deployed.

## Status
**LIVE (2026-06-02)** at https://web-lift.co.uk (+ www), hosted on Vercel (project `website_revamp_business`, deployed via CLI from the site subfolder — not git-connected). Apex + www on A records → 76.76.21.21 (DNS at GoDaddy/domaincontrol nameservers; NS change avoided to protect Workspace MX). HTTPS issued. Spec + full 6-page site (v6), pricing locked. Forms wired to Formspree `mlgvqpwb` but NOT yet proven end-to-end (Doug's test submission + one-time activation click pending). Still open: swap portfolio examples for real client work; clear scratch/.

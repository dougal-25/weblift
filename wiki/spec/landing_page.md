# Landing Page — UI spec

**References:** cheapwebdesign.co.uk (homepage, /pricing, /contact-us). Doug's explicit instruction: "replicate the look of this website." Studied live 2026-05-29 via browser; colours/fonts sampled from computed styles.

**Mood/feel:** The anti-agency. Bold, friendly, plain-spoken, fast, trustworthy. Big confident headlines, cheerful emoji, real customer faces. Approachable to a 50-year-old plumber — never a slick design-studio that talks down to them. "Cheap & cheerful but clearly professional."

**Hero moment:** Huge bold headline with a hand-drawn blue marker scribble circling one key word (mirrors the reference). Dual pill CTAs (solid blue "Get a Quote" + outlined "See Pricing"), Google 4.9★ trust row, floating circular customer avatars around the headline. _(Optional differentiator considered: before/after drag slider — parked unless Doug wants it; reference site doesn't use one.)_

**Anti-examples:** Jargon-heavy corporate web agency. Over-designed Awwwards site that confuses normal people. Cheap Fiverr-looking template. Dark/techy SaaS aesthetic.

**Constraints:** Mobile-first, light theme. Vanilla HTML/CSS/JS (no framework). Single web-font dependency (Outfit via Google Fonts) is acceptable.

## Design tokens (sampled from reference)
- Royal blue (primary): `#2F3FF7`
- Sky blue (secondary CTA): `#22B5FC`
- Black (nav / quote pill): `#0A0A0A`
- Maroon (announcement bar): `#9C1F06`
- Page background: `#F3F5F9`
- Surface white: `#FFFFFF`
- Text: `#1A1A1A` · muted `#6B6B6B`
- Star/accent gold: `#FBB014`
- Font: **Outfit** (headings 600–800 weight, body 400–500)
- Radius: pills fully rounded; cards ~20px
- Signature motif: hand-drawn blue SVG scribble underline/circle on key words

## Page sections (homepage)
1. Maroon announcement bar (offer + Google rating + phone)
2. White nav: logo, links, black "Get Quote" pill
3. Hero: scribbled headline, subhead with "from £___", dual CTA, Google row, floating avatars
4. Trust strip ("Loved by business owners who hate DIY")
5. What makes us better / how it works
6. Pricing: two big rounded cards (blue + white), huge price, star-emoji bullets
7. Testimonials / happy customers
8. FAQ ("Your questions, answered")
9. Footer

## Build notes
- Web Lift flat-fee price: **from £750** (decided 2026-05-29).
- Decision 2026-05-29: replicate reference look closely **+ add a before/after drag slider** as the hero centrepiece (Web Lift differentiator — demonstrates the value prop in one gesture).
- Before/after slider uses two CSS-rendered mock site panels (old vs new) so it works with zero image assets; swap for real client screenshots later.
- Logo: text wordmark "Web Lift" + simple mark for v1 (no logo asset yet).
- Replicate layout/feel, not copy content verbatim — write Web-Lift-specific copy for local-SMB redesigns.

# G.S Garage Services & MOT Ltd — prospect

**Status:** cold → called → interested → mockup → `pitched (design sent)` → won / lost
<!-- update the status word above as the prospect moves through the pipeline -->

- **Business:** G.S Garage Services & MOT Ltd
- **What they do / trade:** Independent family-run garage — MOT (classes 4,5,7), servicing, brakes, suspension, exhausts, engine, electrical, batteries. All vehicles incl. classics, sports cars, vans, trucks.
- **Area:** Stratford, East London — Unit 4a, Maryland Industrial Estate, 26 Maryland Road, London E15 1JW
- **Current site:** https://sites.google.com/view/gsgarage/home (bare Google Site — no real website)
- **Contact:** 0208 534 5941 · gsgarage@live.co.uk

## Call log
- **2026-06-03** — Identified as a cold prospect. Strong reputation (Doug: 4.9★ over 800+ reviews) but effectively no web presence. Built a mockup to send. Est. ~20% close.
- **2026-06-03** — Mockup built, revised to their blue + real photos, deployed to Vercel, and **design/link sent to the owner**. Owner seemed busy and Doug rates them unlikely to proceed. **Parked — awaiting any response.** Preview link stays live until 2026-06-10 takedown.

## Mockup
- **Built:** 2026-06-03 · **Live preview:** https://gs-garage-preview.vercel.app (Vercel, deployed 2026-06-03 under `douglaswoolfenden-byte`)
  - ⏳ **Take down by 2026-06-10** (week-max preview; calendar reminder set). Takedown: `cd scratch/gs-garage-preview && npx vercel remove gs-garage-preview --yes`. Deploy bundle (kit inlined, paths rewritten) lives in `scratch/gs-garage-preview/` — rebuild from `mockups/gs-garage/` if needed.
  - Local: `mockups/gs-garage/index.html` via `python3 -m http.server`.
- **Format:** single long page — hero (real workshop photo) → reviews → services → gallery → location/hours → booking stub → footer.
- **Brand notes:** GS Garage **blue** `#1F5C97` (taken from their real signage) on white — matches their Google Site's steel-blue header. Dark slate `#16293A` for hero overlay/footer. No amber. Set via `:root` overrides in `style.css` only; kit CSS untouched.
- **Images:** real photos pulled from their Google Site, saved in `assets/` (hero = `workshop-4.jpg`; gallery = workshop 1/3/5/6/7 + `signage.jpg`). Earlier amber + line-art-car version and decorative underlines were removed at Doug's request (more basic / garage-honest).

## ⚠️ Before sending — TODO
- **VERIFY the 4.9★ / 800+ figure** with the owner / Google listing. Not shown on their Google Site; supplied by Doug. (Web Lift previously removed an unverified rating from its own site — don't repeat.) Marked with `<!-- VERIFY -->` in index.html.
- **Swap testimonials:** the 3 review quotes are still illustrative placeholders — replace with real Google review quotes. (Gallery photos are now real.)
- **Booking form is a non-functional stub** — wire to email/Formspree before any real handoff.

## Outcome
- **Parked (2026-06-03)** — design sent, low expectation of reply. Not chased further for now. If they bite: verify the rating, swap in real review quotes, wire the booking form, and move to a real build. If no reply by ~2026-06-10, let the preview expire and mark `lost`.

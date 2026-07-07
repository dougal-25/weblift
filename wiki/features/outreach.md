# Feature — Outreach / Lead-gen

**Status:** draft v1 — 2026-05-29
**Goal:** a repeatable way to find local SMBs with bad websites and start a conversation.

## The core insight
Web Lift's pitch is uniquely **demonstrable**. You can literally show a prospect their own outdated site next to what it could be. No other sales hook is needed. The whole strategy is: *find bad sites, show the gap.*

## Finding prospects (the list)
- **Google Maps / local search** for a trade + area ("plumber Croydon", "cafe Peckham"). Click through to each website.
- **Filter for pain:** no site, no mobile version, no HTTPS, slow, visibly dated, broken links.
- These are your hottest leads — the problem is self-evident.
- Local Facebook business groups, directories (Yell, Checkatrade), Chamber of Commerce lists.

## The pitch (show, don't tell)
- **The "audit gift" approach:** record a 60-second Loom walking through what's wrong with their current site + a rough mock of the fix. Send it free, no ask.
- This flips cold outreach from "buy my service" to "here's a free thing that helps you" — far higher reply rate.
- Lead with the customer's loss, not features: "you're probably losing calls because the number's hard to find on mobile."

## Channels (in priority order)
1. **Direct email / contact form** with the free audit Loom. Most scalable.
2. **Phone / walk-in** for local high-street businesses — old-school but trades respond to it.
3. **Referrals** — every happy client is asked for one at handoff (see [delivery process](delivery_process.md)).
4. **Local Facebook groups** — answer "anyone know a web person?" posts.

## Cadence (lightweight v1)
- Build a list of 20–30 local businesses with bad sites.
- Send 5–10 personalised free-audit Looms per week. Quality over volume.
- Follow up once after a few days. Then move on.

## Metrics to watch
- Audits sent → replies → calls booked → clients won.
- Which trade vertical responds best (informs the niche-down decision in the spec).

## Open questions
- ~~Which vertical to target first?~~ **RESOLVED 2026-06-04:** high-ticket home-improvement trades (they already buy leads, so the ROI pitch is pre-sold). Garages tried first → live leads, no conversions. Full rationale: [niche selection research](../research/niche_selection.md).
- Build the prospecting list manually first, or tool it up (scrape Maps/LinkedIn) once the pitch is proven? **Direction:** prove the home-improvement pitch by hand first, then automate scraping — and bake TPS/CTPS screening into that pipeline (see compliance note in the research page). **Automation now specced:** [Outbound Lead Machine (n8n)](outbound_lead_machine.md) — sources trades → Claude audit → review queue (never auto-sends).
- Loom audits are time-intensive — at what volume do we templatise or semi-automate them?

# Feature — Outbound Lead Machine (n8n)

**Status:** v2 BUILT 2026-06-11, running in **qualify-mode** (30 nodes; outreach tail wired but
bypassed). v1 ran clean end-to-end 2026-06-11 (see log). Spec below is the v1 spec, still valid
for the qualification core.

## v2 (2026-06-11) — multi-niche + qualify/outreach split

- **5 premium niches in one run** (luxury kitchen design, bathroom refurb, garden
  design/landscaping, patio/driveway, swimming pools) — ONE Apify Google Maps call with 5 search
  strings; each lead self-tagged via Apify's `searchString` field. The niche travels on the lead
  item; copies of the workflow were rejected (5× maintenance, zero capability).
- **Email extraction two ways**: Apify `scrapeContacts` enrichment + `contact_email` added to the
  Haiku audit output (it already reads the homepage) — final email = Apify || audit.
- **Email MX verification**: free Google DNS-over-HTTPS lookup (`Verify Email MX` node) →
  `email_verified` column. Catches dead domains/typos; mailbox-level checks deliberately skipped.
- **Two modes** (the safety split Doug asked for — nothing outward until proven):
  - **Qualify-mode (NOW):** `…Prep Pitch → Verify Email MX → Write Pitch → Build Email HTML →
    Save to Leads Sheet`. Fills the Sheet only. Needs NO new credentials.
  - **Outreach-mode (LATER):** re-add 2 connections (`Verify Email MX → Build Demo URL`,
    `Build Email HTML → Download Screenshot`) to activate: demo URL → Firecrawl screenshot
    (`&capture=1`) → Kling 5s clip (fal queue, poll loop, no-expiry header) → Gmail HTML **draft**
    (review queue — still never auto-sends) with snapshot attached. Needs: fal Header Auth cred
    (`Authorization: Key <FAL_KEY>` — NOT Bearer), Gmail OAuth2 cred, Firecrawl cred picked on
    `Screenshot Demo`.
- **Sheet = morning dashboard**: new columns `niche, email, email_verified, demo_url,
  screenshot_url, video_url, draft_created` + a **Stats tab** (per-niche COUNTIFs:
  leads/drafted/sent/replied/meeting/won) — Doug's double-down readout. Setup is a one-off temp
  workflow ("TEMP - WebLift Sheet Setup", id jUf5dBft177IPPIy): pick the Sheets cred in its 3
  nodes, run once, delete. Status flow: `NEW`/`CALL_ONLY` → `SENT` → `REPLIED` → `MEETING` → `WON`.
- Demo assets: see [demo_machine.md](demo_machine.md). `automation/lead_machine_workflow.ts` is
  the v1 mirror and now STALE — the live workflow is source of truth.
**Goal:** automate the *finding* half of the outreach motion — source local trades, audit their site
with Claude, and land qualified prospects in a review queue for Doug to call/email. **Never
auto-sends.** Build files: `../../automation/build_guide.md` + `../../automation/prompts.md`.

## Why this, why now

The outreach motion ([outreach.md](outreach.md)) is proven by hand but manual: finding bad-website
trades one at a time is the bottleneck. This automates sourcing + auditing — the repetitive part —
while keeping the human in charge of every contact. It directly executes the existing direction in
`outreach.md`: *"prove the pitch by hand first, then automate scraping — and bake TPS/CTPS screening
into that pipeline."*

It's also a **deliberate test build to learn n8n** (Doug's stated goal). Cost-minimal by design.

## Decisions (locked 2026-06-10 via picker)

| Decision | Choice | Why |
|---|---|---|
| Direction | Outbound first (not inbound) | The real bottleneck is *finding* prospects; form traffic is low today. |
| Output | **Review queue, no auto-send** | Cold-call motion + PECR risk on sole traders. Doug reads every pitch before contact. |
| Hosting | n8n Cloud 14-day trial → Railway (~$5/mo) | No subscription while testing; everything transfers to self-host. |
| Lead source | Apollo.io (with caveat) | Key already in hand, free to wire up. Fallback ready if coverage is thin. |
| Models | Claude **Haiku 4.5** (`claude-haiku-4-5-20251001`) for both AI steps | Audit + short pitch don't need a bigger model; keeps per-lead cost near zero. |
| Review queue target | Google Sheets | Simplest, most reliable n8n node; tabular fits. Notion is the swap if preferred. |

## Architecture (6 stages)

```
Manual Trigger → Set(config) → Apollo search → IF has-website?
   ├─ no  → auto-qualify (flaw="no website at all") ────────────┐
   └─ yes → Firecrawl fetch → Claude audit (JSON) → IF bad? ─────┤ (false → drop, saves money)
                                                                 ↓ true
                                              Claude pitch → Google Sheets append → Slack ping
```

**Design rationale:** deterministic scrape so the LLM never invents company data; LLM used only for
the two things it's genuinely good at — *judging* a page and *writing* copy. The IF-after-audit is the
cost/quality gate (good sites drop, no pitch wasted). The Sheet is the **safety switch** — drafts are
read before any human sees them. (Dropped from the source chatbot plan: the "AI Agent + memory" node —
an audit is one-shot and stateless, memory adds cost for nothing; and Phase-4 auto-email — illegal at
worst, reputation-damaging at best for this audience.)

## ⚠️ Compliance gate (not skippable)

Before **any** number is dialled, screen it against **TPS and CTPS** (sole traders sit on consumer
TPS). The Sheet's `tps_ctps_checked` column is the gate — no tick, no call. ICO fines to £500k. Full
reasoning in [niche_selection.md](../research/niche_selection.md). Kept manual at test scale (no cheap
screening API worth wiring in yet).

## The Apollo caveat (honest flag)

Apollo's data skews to Ltd companies with a LinkedIn footprint — it's thin on one-man kitchen fitters
/ roofers, the actual target. Acceptable for a *learning* test (key in hand, free). If the first run
returns empty or big-firm-heavy, swap **only the Apollo node** for: (a) manual CSV import, or (b) Apify
Google Maps Scraper (~$5–10 / few-thousand listings, far better local coverage — the likely real
source once the pitch is proven). Rest of the pipeline is unchanged.

## Verification (end-to-end before "done")

1. Manual run, `max_leads=3`, niche "kitchen fitters", London.
2. Apollo returns real rows (or fallback runs).
3. Firecrawl returns text for a site; no-website branch fires for one without.
4. Audit emits valid JSON; IF-filter drops a "good" site.
5. 3 qualified rows in the Sheet with sane pitch + talking points; Slack pings.
6. Read one pitch aloud — WebLift voice, no fluff.
7. Only then: Manual Trigger → Schedule Trigger (9am daily, small batch).

## Open / next

- Build it in n8n (guide is ready). First real test = does Apollo's API even return usable local
  trades on Doug's plan?
- An importable workflow JSON is deferred — hand-authored n8n JSON can fail import across node
  versions; better to generate once Doug's n8n instance + node versions are known.
- If proven: move Cloud → Railway before the trial ends; raise `max_leads`; consider an inbound
  form-handler variant (shares the audit + enrich stages).

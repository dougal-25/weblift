# Niche — Home-improvement trades

Primary target niche (chosen 2026-06-03, replacing garages as the lead niche).

**Who:** kitchen & bathroom fitters, extension/loft builders, landscapers & driveway
companies, roofers. High-ticket (£3k–£50k+ per job), owner-operated, **already buy leads**
(Checkatrade / Bark / MyBuilder), so "your site generates these leads for free, and one job
pays for it" lands on a belief they already hold. See `wiki/research/niche_selection.md` for
the full rationale and the "do they buy leads?" filter that ruled garages out.

## Adding a prospect

Each prospect is a thin folder built from the shared starter — the kit is **linked, never
forked** (see `wiki/decisions/0001_shared_kit_per_prospect_mockups.md`):

```bash
cp -r ../_starter <prospect-slug>      # run from inside mockups/home-improvement/
```

Then fill in prospect content + brand overrides in that folder's `style.css`, drop their
photos in `<slug>/assets/`, and track pipeline status in `<slug>/prospect.md`.

**Path note:** prospects here sit two levels under `mockups/`, so they link the kit as
`../../../kit/...` (not `../../kit/`). The `_starter` copied in already uses the correct depth
once placed here — double-check the `<link>`/`<script>` kit paths resolve.

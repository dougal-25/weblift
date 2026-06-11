# Feature — Demo Machine (personalised demo page + email assets)

**Status:** v1 LIVE 2026-06-11 — https://weblift-demos.vercel.app (Vercel project `weblift-demos`,
deployed from `demos/`, self-contained). UI spec: [demo_page.md](../spec/demo_page.md).

## What it is

The "show, don't tell" half of the outreach motion. One static premium page, five niche themes,
personalised per lead entirely by URL params — no per-prospect deploys:

```
https://weblift-demos.vercel.app/?biz=<name>&theme=kitchen|bathroom|garden|driveway|pool&loc=<area>&img1..img4=<their Google photos>
```

The n8n Lead Machine builds this link per lead (`Build Demo URL` node). Downstream (outreach
mode only): Firecrawl screenshots it (`&capture=1` — reveals everything instantly so captures
never show blank sections), Kling 3.0 on Fal animates the screenshot into a 5s preview clip
(`X-Fal-Object-Lifecycle-Preference` no-expiry header — default fal links die in ~7 days), and
the email embeds link + snapshot + clip.

## Key decisions

- **One template, five themes** — copy + accent palette swap via `data-theme`; adding a niche
  is ~20 lines in `demo.js`, not a new page.
- **Self-contained, kit NOT linked** — the kit is WebLift's navy brand; demo pages are
  prospect-branded (copper/teal/green/graphite-amber/azure). Deviation from the original plan,
  deliberate.
- **Fallbacks everywhere** — no photos → premium gradient tiles; broken photo URLs are probed
  with an Image() preload before swapping backgrounds; missing `loc` removes the line cleanly.
  The page must look £20k with one mediocre photo, because that contrast IS the pitch.
- **Params injected via `textContent` only**; image URLs accepted only if http(s) — no HTML/JS
  injection through the query string.
- **Kling over Higgsfield** — no Higgsfield API key exists, it's a UI-first product; Kling
  `o3/standard` on the existing Fal account is ~$0.42 per 5s clip.

## Verification done (2026-06-11)

Playwright screenshot-confirmed: kitchen desktop+mobile with photos, garden desktop with zero
photos (fallback), driveway viewport (palette/contrast), prod URL end-to-end. Only console
error: harmless favicon 404.

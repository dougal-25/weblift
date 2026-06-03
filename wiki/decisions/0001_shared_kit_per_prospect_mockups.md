# 0001 — Shared kit + per-prospect mockup folders

**Date:** 2026-06-03
**Status:** Accepted

## Context

Web Lift's sales motion is: cold-call local businesses → if interested, build a redesign
mockup → show it → if they like it, they buy. That means we'll accumulate **many** prospect
mockups over time, most of which never convert. Two worries surfaced:

1. **Storage** — won't saving dozens of redesigns bloat the repo?
2. **Maintenance** — each mockup was being built by *forking* the business site's CSS
   (the Homerton mockup has its own copy of `style.css` + `pages.css`).

## Decision

**Storage is a non-issue; the real risk is forked CSS. So: one shared kit, many thin mockups.**

- A `kit/` folder holds the reusable foundation — `tokens.css`, `base.css`, `animations.css`,
  `reveal.js` — as the **single source of truth**. The business site and every mockup *link*
  these files; nobody copies them.
- Each prospect is a folder `mockups/<slug>/` built from `mockups/_starter/` (`cp -r`). It
  carries only prospect-specific content + a small `style.css` of component/brand overrides,
  plus a `prospect.md` tracking pipeline status (cold → called → interested → mockup → pitched
  → won/lost).
- No deletion policy. Git history is the archive: when a prospect dies, `git rm` the folder —
  it leaves the working tree but stays recoverable forever.

## Why

- **Storage was the wrong constraint.** A whole mockup folder is <1MB, mostly one hero image;
  the HTML/CSS is ~50KB. 1,000 mockups would still be under 1GB. Deleting to "save space"
  buys nothing and risks losing work.
- **Forking the foundation is the actual rot.** 50 prospects × a forked stylesheet = 50
  diverging sources of truth, and every improvement has to be hand-copied. A linked kit means
  one fix propagates everywhere.
- **Three layers, each holding its natural slice:** `CLAUDE.md` = the imperative rule we follow
  each session; this decision page = the *why* (so it isn't re-litigated); `kit/_starter/` =
  the executable template. Matches Doug's global layering model (rule / intent / code).

## Rejected alternatives

- **Save template, delete the rest on completion** (the original instinct) — solves a
  storage problem that doesn't exist, and throws away recoverable work. Git already does the
  archiving for free.
- **A separate "instructions" folder** — a third place to keep in sync; duplicates what
  `CLAUDE.md` (rule) + this page (why) + `_starter/` (template) already cover.
- **Extract a full `kit/components.css` now** — premature. The component layer (nav/hero/cards)
  stays per-site until a *second* mockup demands the same pattern (rule of three). Extracting
  for a reuse that hasn't happened is speculative refactoring.

## Consequences / follow-ups

- The Homerton mockup and the business site's `css/home.css` + `css/pages.css` **predate** the
  kit. They work; migrate them onto the kit opportunistically, not in a big-bang refactor.
- When mockup #2 reuses a component, promote it to `kit/components.css` and update this page.

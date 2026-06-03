# Web Lift

## What this is
Done-for-you website redesigns for local small businesses. One flat fee (from £750), no jargon, no hassle. Service business; Doug delivers end-to-end. Domain: web-lift.co.uk.

## Tech stack
- Vanilla HTML/CSS/JS (no framework). Font: Outfit (Google Fonts).
- **Shared kit** (`kit/`) = single source of truth for the foundation: `tokens.css`, `base.css`, `animations.css`, `reveal.js`. The business site **and** every mockup link these — never copy/fork them.
- Business-site pages link the kit + their own `css/home.css` + `css/pages.css`.

## Prospect mockup workflow
We cold-call local businesses; interested ones get a redesign mockup, then pitch → buy.
- **New prospect:** `cp -r mockups/_starter mockups/<slug>` — the template links the kit with correct paths.
- A mockup carries only prospect content + a small `style.css` (component/brand overrides) + a `prospect.md` (pipeline status).
- **Never fork the kit CSS** into a mockup — override variables in the mockup's `style.css` instead.
- **No deleting to save space** — storage isn't the constraint; git history is the archive. When a prospect dies, `git rm` the folder.
- Why this structure: `wiki/decisions/0001_shared_kit_per_prospect_mockups.md`.

## Commands
```bash
# Preview the landing page locally
cd projects/weblift
python3 -m http.server 8753
# then open http://localhost:8753/index.html
```

## Environment
- Dependencies: none (static site).
- Env vars needed: none yet (quote form is a non-functional stub — wire to email/Formspree later).

## Wiki-first rule
**Before writing or editing code in this project, read the wiki.** Start with:
1. `wiki/index.md` — what exists in the wiki
2. `wiki/spec/overview.md` — what we're building and why
3. `wiki/spec/landing_page.md` — the UI spec + design tokens
4. Any recent `wiki/decisions/` entries

If the wiki is silent on what's being built, STOP and write the spec/decision page first. Get Doug's approval. Then code.

After any non-trivial change: append to `wiki/log.md` and update the relevant pages BEFORE saying done.

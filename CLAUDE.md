# Web Lift

## What this is
Done-for-you website redesigns for local small businesses. One flat fee (from £750), no jargon, no hassle. Service business; Doug delivers end-to-end. Domain: web-lift.co.uk.

## Tech stack
- Landing page: vanilla HTML/CSS/JS (no framework). `index.html` + `tokens.css` + `style.css` + `script.js`.
- Font: Outfit (Google Fonts). Design replicates cheapwebdesign.co.uk.

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

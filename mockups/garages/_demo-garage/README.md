# _demo-garage — anonymous showcase demo

A **de-branded clone** of the GS Garage mockup. It carries no real business name,
phone, email, address, rating, review names or photos — every image slot is a grey
"your photo here" placeholder. Safe to show **any** local auto/garage lead without
revealing who an existing client is.

- **Not a prospect.** No `prospect.md`, no pipeline status. It's a reusable sales asset.
- **Evergreen.** Because it's anonymous, the deployed preview can stay up indefinitely —
  no takedown reminder needed (unlike a real prospect preview).
- **Wears the neutral Web Lift blue.** No brand-colour overrides in `style.css`; it
  inherits the kit defaults so it never looks like one specific garage.
- **Kit is linked, never forked** — `../../../kit/tokens.css`, `base.css`, `animations.css`,
  `reveal.js`. Same rule as every mockup.

## Preview locally
```bash
cd mockups/_demo-garage
python3 -m http.server 8754
# open http://localhost:8754/index.html
```

## Reuse as a starting point for a real prospect
`cp -r mockups/_demo-garage mockups/<slug>`, then fill in the real business's name,
contact details, hours and photos, and add a `prospect.md` (copy from `mockups/_starter/`).

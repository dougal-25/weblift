# Web Lift kit — shared design foundation

The single source of truth for the look & feel. The Web Lift business site **and** every
prospect mockup link these files — nobody copies or forks them. Improve a file here once,
every site that links it benefits.

## What's in the kit

| File | What it holds |
|------|---------------|
| `tokens.css` | Brand palette, type scale, spacing, radius, shadow, motion — all as CSS variables (`var(--color-royal)` etc). The "fonting and formatting" layer. |
| `base.css` | Reset, base typography, buttons (`.btn`), shared primitives. |
| `animations.css` | Scroll-reveal states (`[data-reveal]`) + the hand-drawn underline marker (`.draw`). Needs `reveal.js`. |
| `reveal.js` | The scroll-reveal engine. Adds `.revealed` on scroll and injects the underline SVGs. |

> **Not in the kit (yet):** the component layer (nav / hero / cards / footer). Those currently
> live per-site in each mockup's `style.css` and in the business site's `css/home.css` + `css/pages.css`.
> Promote a component to a shared `kit/components.css` only when a **second** mockup needs the same
> pattern — not before (avoid refactoring for a reuse that hasn't happened).

## How a prospect mockup consumes it

A mockup lives at `mockups/<prospect>/` and links the kit two levels up:

```html
<link rel="stylesheet" href="../../kit/tokens.css" />
<link rel="stylesheet" href="../../kit/base.css" />
<link rel="stylesheet" href="../../kit/animations.css" />
<link rel="stylesheet" href="style.css" />   <!-- prospect-specific only -->
...
<script src="../../kit/reveal.js"></script>
```

To start a new prospect, copy the template:

```bash
cp -r mockups/_starter mockups/<prospect-slug>
```

The paths in `_starter` are already correct for a sibling `mockups/<x>/` folder, so it just works.

## Brand overrides

Don't edit `tokens.css` to match a prospect's brand — that would change every site. Instead,
override the few variables you need in the mockup's own `style.css` (`:root { --color-royal: #...; }`).
See the commented block at the top of `mockups/_starter/style.css`.

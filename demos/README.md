# WebLift demos — personalised prospect demo page

One static page, five niche themes, personalised entirely by URL params. The n8n Lead
Machine builds these links per lead (`Build Demo URL` node); nothing is deployed per
prospect.

## URL params (all optional)

```
https://weblift-demos.vercel.app/?biz=Ace+Kitchens&theme=kitchen&loc=Croydon&img1=<url>&img2=<url>&img3=<url>&img4=<url>
```

- `biz` — business name (hero title, footer, page title)
- `theme` — `kitchen` | `bathroom` | `garden` | `driveway` | `pool` (accent palette + all copy)
- `loc` — area line in the hero (omitted cleanly if absent)
- `img1..img4` — photo URLs (Google-listing photos from Apify). `img1` is the hero.
  Broken/missing images keep premium gradient fallbacks — the page never looks empty.

## Deploy

```bash
cd projects/weblift/demos
npx vercel deploy --prod --yes
```

Self-contained on purpose (own `tokens.css`, no `kit/` link): the kit is WebLift's navy
brand; demo pages are prospect-branded. See `wiki/spec/demo_page.md` for the UI spec.

## Local preview

```bash
cd projects/weblift && python3 -m http.server 8753
# http://localhost:8753/demos/?biz=Test+Kitchens&theme=kitchen&loc=Putney
```

# CampusGear — Student Laptop Finder

SW302 Assignment 2 · Individual project · Ahmed Tamer Mohamed

A responsive five-page JavaScript + Tailwind CSS 4 project with a searchable catalogue, 24 local JSON laptop records, persistent favorites/theme and 2–4 product comparison.

## Install and build (required)

```bash
npm install
npm run build
```

Start a local server (do **not** double-click the HTML files):

- In VS Code, install **Live Server** and choose **Open with Live Server** on `index.html`; or
- Run `npx http-server . -p 5500`, then visit `http://localhost:5500`.

For CSS development, run `npm run watch`. All five HTML pages reference `dist/output.css`. The `dist/output.css` file is included as an offline preview fallback; **rebuild with npm** to produce the official Tailwind v4 output before submission.

## Pages

- `index.html`: hero, featured laptops, live stats.
- `laptops.html`: combined live search, category, max price, min RAM, six sort directions, results and empty state.
- `details.html?id=7`: full specifications and quick favorite/compare action.
- `favorites.html`: persistent shortlist, clear/remove, total and average.
- `compare.html`: pick 2–4 favorites and highlight best numeric specs.

## Technical details

- Fetch API with `async/await`, `try/catch` and failed request state.
- Reusable ES modules and card renderer shared across Home, Catalogue, and Favorites.
- `map`, `filter`, copied-array `sort`, and multiple `reduce` calculations.
- `localStorage` stores favorites and theme through JSON serialization.
- Tailwind 4 CLI and official `@tailwindcss/forms` plugin, `@theme`, `@layer components` and `@apply`.
- Local self-contained SVG laptop illustrations (no external assets).

## Recommended demonstration

1. Open Catalogue, search `ASUS`, set max price and sort by battery, then open Details.
2. Save three laptops from catalogue/details, refresh, and compare them.
3. Change to Performance Mode, move between pages and reload.
4. Inspect mobile (375 px), tablet (768 px), and desktop (1280 px) responsive layouts.


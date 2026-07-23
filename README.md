# boltwork.co

Marketing site for **Boltwork** — client-acquisition systems for remote-talent and offshore staffing agencies. A done-for-you, signal-based outbound service that books qualified sales calls with companies actively hiring. The client owns the system, the data, and the pipeline.

## Stack

Pure static site — no build step, no dependencies, no third-party requests (fonts self-hosted).

- `index.html` — single-page site (hero with benchmark counters, before/after inbox comparison, 01–03 system pillars with UI mockups, table-stakes grid, benchmark band, CTA)
- `css/style.css` — design tokens + all styles; light paper theme, emerald accent, Newsreader/Inter/JetBrains Mono
- `js/main.js` — stat count-up, scroll reveals, sticky nav (reduced-motion aware)
- `fonts/` — self-hosted variable woff2 (latin subsets)

All CTAs point at the `#book` placeholder — swap for a Calendly/Cal.com link or embed. A testimonial section is commented out in `index.html` until real results exist; all numbers on the page are industry benchmarks, not claimed results.

## Run locally

Open `index.html` in a browser, or serve it:

```
npx serve .
```

## Deploy

Works as-is on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

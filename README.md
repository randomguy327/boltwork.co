# boltwork.co

Marketing site for **Boltwork** — an AI automation agency for ecommerce and Shopify stores. Boltwork builds automations with n8n, Make.com, Zapier, Claude and Claude Code: abandoned cart recovery, AI customer support, inventory/order sync, product content at scale, review engines and automated reporting.

## Stack

Pure static site — no build step, no dependencies.

- `index.html` — single-page site (hero, services, automations, process, pricing, FAQ, contact)
- `css/style.css` — dark theme, yellow bolt accent, responsive, scroll-reveal styles
- `js/main.js` — scroll-reveal, stat count-up, mobile nav

## Run locally

Open `index.html` in a browser, or serve it:

```
npx serve .
```

## Deploy

Works as-is on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). The contact form is pre-wired for Netlify Forms (`data-netlify="true"`) — on other hosts, swap in Formspree or a backend endpoint.

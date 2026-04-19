# Bad Dresser

**Good education, bad dresser.**

Official website for Bad Dresser, built with Next.js App Router.

Live: [https://baddresser.com](https://baddresser.com)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Fonts**: Space Grotesk, Space Mono, Manrope (via `next/font`)
- **Analytics**: [Vercel Web Analytics](https://vercel.com/docs/analytics)
- **Deployment**: [Vercel](https://vercel.com/)

## Routes

- `/` — Landing page (desktop draggable cards + mobile layout)
- `/artist` — Artist page
- `/catalogue/diamond-dogs` — Diamond Dogs catalogue detail page
- `/catalogue` — intentionally returns `404`
- `*` unmatched routes — global branded `404` page

## Key Features

- Draggable desktop cards with dynamic z-index layering
- Subtle wobble effect while dragging cards
- Landing page New Drop card links directly to `/catalogue/diamond-dogs`
- Optional Spotify embed with loader while loading and fail-silent behavior
- Catalogue slider with:
  - Desktop hover magnifier
  - Mobile swipe navigation
  - Mobile zoom controls (`+` / `−`) and zoom reset on slide change
- WhatsApp checkout CTA with prefilled message for catalogue purchase
- SEO setup:
  - Metadata, canonical URLs, Open Graph, Twitter cards
  - Product JSON-LD on catalogue page
  - `sitemap.xml` and `robots.txt`

## Vercel Analytics Setup

This project uses the official Next.js integration:

- Package: `@vercel/analytics`
- Component: `Analytics` from `@vercel/analytics/next`
- Mounted once in `src/app/layout.tsx`

```tsx
import { Analytics } from "@vercel/analytics/next";

// inside <body>
{children}
<Analytics />
```

Notes:

- Analytics data appears when deployed on Vercel.
- For Hobby plan, this is the recommended setup and requires no custom tracker script.

Reference: [Vercel Analytics Docs](https://vercel.com/docs/analytics)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Lint

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── artist/page.tsx
│   ├── catalogue/
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   └── diamond-dogs/page.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   └── twitter-image.tsx
├── components/
│   ├── landing-page/
│   │   ├── landing-page-client.tsx
│   │   ├── instagram-slider.tsx
│   │   └── spotify-player.tsx
│   ├── catalogue/
│   │   └── diamond-dogs-page.tsx
│   └── nav-links.tsx
└── lib/
    ├── site.ts
    ├── landing-page-assets.ts
    └── catalogue-assets.ts

public/
├── landing-page/
└── catalogue-page/
```

## Deploy

Push to `main` and Vercel will auto-deploy (if connected to this GitHub repo).

## License

Private project.

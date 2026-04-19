# Bad Dresser

**Good education, bad dresser.**

A fashion label website for the intellectually curious and sartorially rebellious. Built with Next.js, React, and Tailwind CSS, inspired by [motherlondon.com](https://www.motherlondon.com/)'s overlapping draggable card layout.

Live: [baddresser.com](https://baddresser.com)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Fonts**: Space Grotesk, Space Mono, Manrope (via `next/font`)
- **Drag**: Custom pointer-event drag interactions (no external drag library)
- **Deployment**: [Vercel](https://vercel.com/)
- **Design**: [Pencil.dev](https://pencil.dev/)

## Features

### Desktop

- Overlapping glass-morphism cards with `backdrop-blur` and semi-transparent borders
- Percentage-based positioning for consistent layout across screen resolutions
- **Draggable cards** — click and drag any card to reposition it on the viewport (like macOS desktop icons)
- **Dynamic z-index** — dragged card automatically layers on top of others (Photoshop-style layering)
- Hover effect with subtle darkening overlay and pointer cursor

### Mobile

- Oversized cropped "Bad Dresser" brand typography (96px, clipped for dramatic effect)
- Full-width feature card with greyhound stamp overlay
- 2-column grid: Lookbook, Collections, Quiz, Journal
- GPU-composited fixed background for smooth scrolling (no jitter on Chrome)
- `overscroll-behavior-y: none` to prevent bounce artifacts

### SEO & Social Sharing

- Comprehensive metadata: title template, description, keywords, canonical URL
- Open Graph tags (Facebook, WhatsApp, LinkedIn)
- Twitter Card (`summary_large_image`)
- Dynamic OG image generated via `ImageResponse` — branded card with gradient, accent, and tagline
- JSON-LD structured data (`Organization` schema)
- Auto-generated `sitemap.xml` and `robots.txt`
- Favicon, `icon.png` (192x192), `apple-icon.png` (180x180) from Bad Dresser logo

### Performance

- `next/image` for automatic AVIF/WebP conversion and responsive `sizes`
- `priority` on above-fold images, lazy loading for below-fold
- `display: "swap"` on all fonts to prevent FOIT
- GPU layer promotion (`transform: translateZ(0)`, `will-change: transform`) on fixed background
- Native browser image drag prevention via CSS (`pointer-events: none`, `-webkit-user-drag: none`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

``` 
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   ├── page.tsx            # Homepage (desktop + mobile layouts)
│   ├── globals.css         # Tailwind 4 theme tokens, global styles
│   ├── opengraph-image.tsx # Dynamic OG image generator
│   ├── twitter-image.tsx   # Twitter card (re-exports OG)
│   ├── artist/page.tsx     # Artist route (coming soon)
│   ├── catalogue/page.tsx  # Catalogue route (coming soon)
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt config
│   ├── favicon.ico         # 32x32 Bad Dresser logo
│   ├── icon.png            # 192x192 (Android/PWA)
│   └── apple-icon.png      # 180x180 (iOS)
├── components/
│   ├── landing-page/
│   │   ├── landing-page-client.tsx # Main landing layouts + drag interactions
│   │   ├── instagram-slider.tsx    # Instagram carousel card
│   │   └── spotify-player.tsx      # Optional Spotify embed with fail-silent loader
│   ├── coming-soon-page.tsx        # Shared placeholder page for non-home routes
│   └── nav-links.tsx               # Internal/external nav links
├── lib/
│   ├── landing-page-assets.ts # Landing image asset map
│   └── site.ts                # Centralized domain and SEO constants
public/
└── landing-page/
    ├── background.webp
    ├── about-card.webp
    ├── new-drop-card.webp
    ├── preview-card.webp
    ├── mobile-logo.webp
    ├── mobile-logo.png
    └── instagram-slide-content/*.webp
```

## Design Assets (Pencil.dev)

The original design was created in Pencil.dev. Source files and raw assets:

```
/Users/maryln/Developer/bad-dresser/Bad Dresser Asset Page/
├── Bad Dresser.pen           # Pencil design file (desktop + mobile frames)
├── logo.png                  # Original logo (4500x4500)
├── BG.png                    # Background asset
├── bottom.png
├── mkp.png
├── wa.png
├── web.png
└── website-asset/            # Raw website image assets
    ├── IMG_8210.JPG          # Feature photo (renamed to feature.jpg in web)
    ├── main-bg.jpg           # Background photo
    ├── collage-1.jpg
    ├── collage-2.jpg
    ├── collage-3.jpg
    ├── logo.png
    ├── overlay-greyhound.png
    ├── gleb-khodiakov-3Y2ikkhwi30-unsplash.jpg  # Used for lookbook
    └── ng-jun-xian-qf5l33GiG5Q-unsplash.jpg    # Used for quiz
```

### Pencil.dev Frame IDs

| Frame | ID | Size |
|-------|-----|------|
| Desktop — "Bad Dresser Homepage" | `skTY0` | 1440 x 900 |
| Mobile — "Bad Dresser Mobile" | `hQ6sJ` | 390 x 1050 |

### Card Node IDs (Pencil.dev)

| Card | Desktop ID |
|------|-----------|
| Brand | `xFbLZ` |
| Feature | `iMeZH` |
| Lookbook | `8hdtF` |
| Quiz | `xBBjL` |
| Collections | `10RbE` |
| Journal | `qedWa` |
| Greyhound stamp (desktop) | `6baZJ` |
| Greyhound stamp (mobile) | `VuZ7n` |

### Card Positions (Desktop — percentage of 1440x900)

| Card | Left | Top | Width | Height |
|------|------|-----|-------|--------|
| Brand | 2.36% | 3.22% | 22.92% | 13.78% |
| Journal | 6.25% | 18.89% | 18.40% | 28.89% |
| Feature | 28.61% | 3.22% | 34.72% | 70.78% |
| Lookbook | 58.75% | 2.22% | 27.78% | 54.11% |
| Quiz | 73.33% | 38.89% | 25.35% | 58.89% |
| Collections | 2.36% | 61.11% | 31.25% | 36.67% |

## Design Inspiration

Layout and interaction patterns inspired by [motherlondon.com](https://www.motherlondon.com/):

- Single viewport with overlapping absolutely-positioned cards
- Glass-morphism (`rgba(255,255,255,0.15)` + `backdrop-blur`)
- Custom pointer-event drag-to-reposition behavior
- Dynamic z-index layering on drag
- Mobile: oversized cropped typography + grid thumbnails with pill labels

## Deploy on Vercel

```bash
npm run build
```

Or connect the [GitHub repo](https://github.com/fear-rush/bad-dresser-web) to Vercel for automatic deployments on push.

## License

Private project.

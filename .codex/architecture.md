# Architecture

## Site type

This is a static Astro site for a saxophone musician's portfolio and wedding landing pages.

## Routing and i18n

- Spanish is the default language
- English pages live under `/en`
- Main i18n files:
  - `src/i18n/lang/es.ts`
  - `src/i18n/lang/en.ts`
  - `src/i18n/utils.ts`
  - `src/i18n/routes.ts`

## Page composition

- Root layout:
  - `src/layouts/Layout.astro`
- Shared page shell:
  - `src/components/parts/Header.astro`
  - `src/components/parts/Footer.astro`
- Wedding landing page composition:
  - `src/components/pages/WeddingLandingPage.astro`

## Landing section components

Spanish landing sections live in `src/components/parts/`:
- `LandingHero`
- `LandingAbout`
- `LandingServices`
- `LandingAnswerBlock`
- `LandingVideos`
- `LandingRepertoire`
- `LandingPacks`
- `LandingTestimonials`
- `LandingContact`
- `LandingFaq`
- `LandingCities`
- `LandingFloatingCta`

Most landing sections after `LandingAbout` are rendered as accordion-style `<details>` blocks.

## Data and business logic

- `src/data/landingPages.ts`
  - builds `LandingPageData` for home and city pages
- `src/data/locations.ts`
  - defines `LocationEntry` records for city landing pages
- `src/lib/site.ts`
  - shared business constants
- `src/lib/schemas.ts`
  - structured data generation

## Styling

- Tailwind CSS
- Primary color: `#466787`
- Accent color: `#e5c029`
- Fonts:
  - `Inter`
  - `Segment A`

## Deployment

- Firebase Hosting
- static output in `dist/`
- analytics injected through `src/scripts/GoogleAnalyticsTag.astro`

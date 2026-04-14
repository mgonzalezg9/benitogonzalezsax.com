# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Before making any changes

Always pull the latest remote changes on the current branch before editing any file:

```bash
git pull
```

If there are uncommitted local changes, stash them first (`git stash`), pull, then reapply (`git stash pop`).

## Commands

```bash
npm run dev        # Start local development server
npm run build      # Production build (outputs to dist/)
npm run preview    # Preview production build locally
```

No test or lint commands are configured.

## Architecture

This is a **static Astro site** for a saxophone musician's portfolio, with bilingual support (Spanish default, English at `/en`).

### Routing & Internationalization

- Spanish is the default language; English pages live under `/en/`
- `src/i18n/` contains the full i18n system:
  - `lang/es.ts` and `lang/en.ts` — all translated strings, structured by section (`meta`, `nav`, `hero`, `about`, `services`, `testimonials`, `contact`, `footer`, `landing`)
  - `utils.ts` — `getLangFromUrl()` and `useTranslations()` helpers used in every page/component
  - `routes.ts` — maps equivalent paths between languages (e.g. `/politica-de-privacidad` ↔ `/en/privacy-policy`)
- When adding content, update both language files in parallel
- The `landing` section in `es.ts` contains all strings for the Spanish wedding landing pages (`WeddingLandingPage` and its sub-components). It is not present in `en.ts` as the English page uses a separate component set.

### Component Structure

- `src/layouts/Layout.astro` — root HTML shell; accepts `title`, `description`, and other SEO props
- `src/components/parts/` — one component per page section:
  - English page sections: `Hero`, `About`, `Services`, `Gallery`, `Testimonials`, `Contact`
  - Spanish landing page sections: `LandingHero`, `LandingAbout`, `LandingServices`, `LandingAnswerBlock`, `LandingVideos`, `LandingRepertoire`, `LandingPacks`, `LandingTestimonials`, `LandingContact`, `LandingFaq`, `LandingCities`, `LandingFloatingCta`
  - Shared UI: `Header`, `Footer`, `LanguagePicker`
- `src/components/pages/WeddingLandingPage.astro` — thin composition layer; imports and renders all `Landing*` section components in order, plus a small script that opens accordion sections when navigating to a hash anchor. Nav anchor IDs in each component must match the i18n values in `es.ts` (`inicio`, `propuesta`, `servicios`, `ciudades`, `opiniones`, `contacto`).
- Most `Landing*` sections (everything after `LandingAbout`) are rendered as `<details>` accordion elements. `LandingContact` starts open (`open` attribute). `LandingAbout` uses a mobile/desktop split: the `<section id="propuesta">` shows an embedded video; a sibling `<details>` (mobile-only, `md:hidden`) accordion reveals the text content.
- `stripSegmentAAccents` (strips NFD diacritics for Segment A font rendering) is defined inline in each `Landing*` component that needs it.
- `src/components/animations/` — `FadeIn.astro` and `Counter.astro` use Intersection Observer via inline `<script define:vars={...}>` (no JS framework)
- Pages in `src/pages/` simply import and compose the section components

### Data & Business Logic

- `src/data/landingPages.ts` — builds `LandingPageData` objects for the home page and each city page; all Spanish landing page content (trust points, moments, FAQs, testimonials, packs, etc.) lives here
- `src/data/locations.ts` — defines all city `LocationEntry` records used to generate city landing pages
- `src/lib/site.ts` — `BUSINESS` constants (phone, email, social links, address, geo coordinates); use these instead of hard-coding contact details anywhere
- `src/lib/schemas.ts` — `buildPageSchemas(page, canonical, location?)` builds the JSON-LD structured data array for any landing page; pass the result to `Layout` via the `schemas` prop

### Styling

Tailwind CSS with a custom theme:
- `primary`: `#466787` (blue-grey)
- `accent`: `#e5c029` (gold)
- Fonts: `Inter` (body) and `Segment A` (display), loaded from `public/fonts/`

### Deployment

Hosted on Firebase Hosting (europe-west1). Build output is `dist/`. Google Analytics is injected via `src/scripts/GoogleAnalyticsTag.astro`. JSON-LD structured data is built by `src/lib/schemas.ts` and passed to `Layout.astro` via the `schemas` prop.

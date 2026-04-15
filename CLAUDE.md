# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

### Before editing any file

1. Check the current branch: `git branch --show-current`
2. Rebase with main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
3. Pull the latest remote changes:
   ```bash
   git pull
   ```
   If there are uncommitted local changes, stash first (`git stash`), pull, then reapply (`git stash pop`).

### i18n parity

When adding or changing any user-facing string, update both language files together:

- `src/i18n/lang/es.ts` — Spanish (default language)
- `src/i18n/lang/en.ts` — English

Exception: the `landing` section exists only in `es.ts` because English landing pages use a separate component set with no `useTranslations` dependency.

### No hardcoded contact details

Never hardcode phone numbers, email addresses, WhatsApp links, or social URLs in components or pages. Always import and use the `BUSINESS` object from `src/lib/site.ts`. The only exception is fallback strings inside `<script>` blocks that cannot import server-side modules — keep those in sync with `BUSINESS` manually.

### Landing anchor IDs

Every `Landing*` component that acts as a nav target must use its anchor ID from `es.ts` nav values: `inicio`, `propuesta`, `servicios`, `ciudades`, `opiniones`, `contacto`. The hash-anchor script in `WeddingLandingPage.astro` opens accordion `<details>` elements by matching these IDs — mismatches break scroll-to-section navigation.

### JSON-LD via schemas prop

Never write inline `<script type="application/ld+json">` tags in pages or components. Always use `buildPageSchemas(page, canonical, location?)` from `src/lib/schemas.ts` and pass the result to `Layout` via the `schemas` prop.

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
- The `landing` section in `es.ts` contains all strings for the Spanish wedding landing pages (`WeddingLandingPage` and its sub-components). It is not present in `en.ts` as the English page uses a separate component set.

### Component Structure

- `src/layouts/Layout.astro` — root HTML shell; accepts `title`, `description`, and other SEO props
- `src/components/parts/` — one component per page section:
  - English page sections: `Hero`, `About`, `Services`, `Gallery`, `Testimonials`, `Contact`
  - Spanish landing page sections: `LandingHero`, `LandingAbout`, `LandingServices`, `LandingAnswerBlock`, `LandingVideos`, `LandingRepertoire`, `LandingPacks`, `LandingTestimonials`, `LandingContact`, `LandingFaq`, `LandingCities`, `LandingFloatingCta`
  - Shared UI: `Header`, `Footer`, `LanguagePicker`
- `src/components/pages/WeddingLandingPage.astro` — thin composition layer; imports and renders all `Landing*` section components in order, plus a small script that opens accordion sections when navigating to a hash anchor.
- Most `Landing*` sections (everything after `LandingAbout`) are rendered as `<details>` accordion elements. `LandingContact` starts open (`open` attribute). `LandingAbout` uses a mobile/desktop split: the `<section id="propuesta">` shows an embedded video; a sibling `<details>` (mobile-only, `md:hidden`) accordion reveals the text content.
- `src/lib/typography.ts` — `stripSegmentAAccents` (strips NFD diacritics for Segment A font rendering) and `slugify`; import from here rather than duplicating the logic.
- `src/components/animations/` — `FadeIn.astro` and `Counter.astro` use Intersection Observer via inline `<script define:vars={...}>` (no JS framework)
- Pages in `src/pages/` simply import and compose the section components

### Data & Business Logic

- `src/data/landingPages.ts` — builds `LandingPageData` objects for the home page and each city page; all Spanish landing page content (trust points, moments, FAQs, testimonials, packs, etc.) lives here
- `src/data/locations.ts` — defines all city `LocationEntry` records used to generate city landing pages
- `src/lib/site.ts` — `BUSINESS` constants (phone, email, social links, address, geo coordinates)
- `src/lib/schemas.ts` — `buildPageSchemas(page, canonical, location?)` builds the JSON-LD structured data array for any landing page

### Styling

Tailwind CSS with a custom theme:
- `primary`: `#466787` (blue-grey)
- `accent`: `#e5c029` (gold)
- Fonts: `Inter` (body) and `Segment A` (display), loaded from `public/fonts/`

### Code Review Subagents

Three subagents for code review live in `.claude/agents/`. Codex can also make use of them when asked:

- **`architectural-review`** — component composition, DRY principles, reusability, structural patterns. Use when refactoring or adding new components.
- **`correctness-review`** — UI labels vs. behaviour, content accuracy, SEO/metadata fields. Use when a feature is complete and needs a final sanity check.
- **`types-and-testing`** — TypeScript type safety and build validation. Use when adding data structures, changing interfaces, or validating a feature end-to-end.

### Deployment

Hosted on Firebase Hosting (europe-west1). Build output is `dist/`. Google Analytics is injected via `src/scripts/GoogleAnalyticsTag.astro`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
  - `lang/es.ts` and `lang/en.ts` — all translated strings, structured by section (`meta`, `nav`, `hero`, `about`, `services`, `gallery`, `testimonials`, `contact`)
  - `utils.ts` — `getLangFromUrl()` and `useTranslations()` helpers used in every page/component
  - `routes.ts` — maps equivalent paths between languages (e.g. `/politica-de-privacidad` ↔ `/en/privacy-policy`)
- When adding content, update both language files in parallel

### Component Structure

- `src/layouts/Layout.astro` — root HTML shell; accepts `title`, `description`, and other SEO props
- `src/components/parts/` — one component per page section (Hero, About, Services, Gallery, etc.)
- `src/components/animations/` — `FadeIn.astro` and `Counter.astro` use Intersection Observer via inline `<script define:vars={...}>` (no JS framework)
- Pages in `src/pages/` simply import and compose the section components

### Styling

Tailwind CSS with a custom theme:
- `primary`: `#466787` (blue-grey)
- `accent`: `#e5c029` (gold)
- Fonts: `Inter` (body) and `Segment A` (display), loaded from `public/fonts/`

### Deployment

Hosted on Firebase Hosting (europe-west1). Build output is `dist/`. Google Analytics and JSON-LD structured data are injected via components in `src/scripts/`.

# Project Instructions

This repository uses `AGENTS.md` as the primary Codex-facing instruction file.

For supporting project context, read these files in `.codex/` when relevant:
- `.codex/README.md`
- `.codex/rules.md`
- `.codex/architecture.md`
- `.codex/reviews/architectural-review.md`
- `.codex/reviews/correctness-review.md`
- `.codex/reviews/types-and-validation.md`

## Pre-edit git workflow

Before editing files:

1. Check the current branch:
   - `git branch --show-current`
2. Sync against `origin/main`:
   - `git fetch origin`
   - `git rebase origin/main`
3. Pull the current branch:
   - `git pull`
4. If there are local uncommitted changes, stash first:
   - `git stash`
   - `git pull`
   - `git stash pop`

## Repository rules

- Keep i18n parity for reusable user-facing UI strings:
  - update `src/i18n/lang/es.ts`
  - update `src/i18n/lang/en.ts`
- Do not hardcode user-facing UI text in Astro pages or components.
  - Put reusable UI labels, ARIA labels, fallback labels, and section chrome in `src/i18n/lang/*.ts`
  - Keep page-specific landing copy in the data files when it is content, not component UI
- Do not hardcode contact details.
  - Always use `BUSINESS` from `src/lib/site.ts`
- Do not write inline JSON-LD in pages or components.
  - Use `buildPageSchemas(page, canonical, location?)` from `src/lib/schemas.ts`
  - Pass the result to `Layout` via the `schemas` prop
- Landing anchor IDs must come from the active language nav config in `src/i18n/lang/*.ts`.
  - Do not hardcode Spanish anchors in shared components.
  - Keep links, section IDs, and accordion hash logic aligned with the translated anchor values.
- Segment A typography does not render accented characters correctly.
  - Any visible text rendered with `font-segmentA` must pass through `stripSegmentAAccents` from `src/lib/typography.ts`.
  - Keep accents in source content, metadata, ARIA labels, schema, and normal typography; strip them only at the Segment A render point.

## Project shape

- Astro static site
- Spanish default, English at `/en`
- Spanish wedding landing pages are data-driven
- Main composition file:
  - `src/components/pages/WeddingLandingPage.astro`
- Local page data:
  - `src/data/landingPages.ts`
  - `src/data/locations.ts`
- SEO/schema:
  - `src/lib/schemas.ts`
- Shared business constants:
  - `src/lib/site.ts`

## Commands

- `npm run dev`
- `npm run build`
- `npm run preview`

No lint or test framework is configured, so build validation is the main safety check.

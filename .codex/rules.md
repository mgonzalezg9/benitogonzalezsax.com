# Rules

## Git preflight

Before editing files:

1. Check branch with `git branch --show-current`
2. Rebase on `origin/main`
3. Pull the current branch
4. If needed, stash before pulling and re-apply after

## i18n parity

When changing reusable user-facing UI strings, update both:
- `src/i18n/lang/es.ts`
- `src/i18n/lang/en.ts`

Do not hardcode user-facing UI text in Astro pages or components.

Use:
- `src/i18n/lang/*.ts` for reusable UI labels, ARIA labels, fallback labels, and section chrome
- `src/data/landingPages*.ts` for page-specific landing copy that is content/data

## Contact details

Never hardcode:
- phone numbers
- emails
- WhatsApp links
- social URLs

Always use:
- `BUSINESS` from `src/lib/site.ts`

## JSON-LD

Do not write inline JSON-LD tags manually in pages or components.

Always:
- build schema with `buildPageSchemas(page, canonical, location?)`
- pass it to `Layout` using the `schemas` prop

## Landing anchors

Landing section IDs must come from the active language nav config in:
- `src/i18n/lang/es.ts`
- `src/i18n/lang/en.ts`

Do not hardcode Spanish anchors in shared components. The accordion-opening hash logic depends on links, section IDs, and translated anchor values matching exactly.

## Segment A typography

Segment A does not render accented characters correctly.

Any visible text rendered with `font-segmentA` must pass through:
- `stripSegmentAAccents` from `src/lib/typography.ts`

Keep accents in source content, metadata, ARIA labels, schema, and normal typography. Strip accents only at the Segment A render point.

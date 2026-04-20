# Rules

## Git preflight

Before editing files:

1. Check branch with `git branch --show-current`
2. Rebase on `origin/main`
3. Pull the current branch
4. If needed, stash before pulling and re-apply after

## i18n parity

When changing user-facing strings, update both:
- `src/i18n/lang/es.ts`
- `src/i18n/lang/en.ts`

Exception:
- the `landing` section is only in `src/i18n/lang/es.ts`

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

Landing section IDs must stay aligned with the Spanish nav anchors:
- `inicio`
- `propuesta`
- `servicios`
- `ciudades`
- `opiniones`
- `contacto`

The accordion-opening hash logic depends on those values matching exactly.

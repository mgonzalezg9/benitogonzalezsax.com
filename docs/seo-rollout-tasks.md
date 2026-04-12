# SEO Rollout Tasks

Last updated: 2026-04-11

## Current status

Base implementation is now wired and ready for the next session. The rollout skeleton exists, but it still needs a build pass, QA and follow-up refinements.

Implemented so far:

- `src/lib/site.ts`
- `src/components/seo/JsonLd.astro`
- `src/data/locations.ts`
- `src/data/landingPages.ts`
- `src/components/pages/WeddingLandingPage.astro`
- `src/pages/index.astro`
- `src/pages/[slug].astro`
- `src/pages/sitemap.xml.ts`
- `public/robots.txt`
- `src/layouts/Layout.astro`
- `src/components/parts/Header.astro`
- `src/pages/politica-de-privacidad.astro`
- `src/pages/en/privacy-policy.astro`
- `src/pages/en/index.astro`

## Resume checklist

### 1. Validate the location dataset
- Review `src/data/locations.ts`
- Confirm all provincial capitals from mainland Spain + Balearic Islands are included
- Exclude Canary Islands, Ceuta and Melilla
- Confirm `rolloutPhase` values
- Keep phase 1 launched cities as:
  - Murcia
  - Alicante
  - Madrid
  - Valencia
  - Barcelona
  - Sevilla
  - Malaga
  - Zaragoza
  - Palma
  - Valladolid
- Fix any remaining text artifacts in strings

### 2. QA the reusable landing template
- Review `src/components/pages/WeddingLandingPage.astro`
- Confirm it still matches the shared data shape from `src/data/landingPages.ts`
- Verify these sections render correctly:
  - hero
  - commercial intro
  - wedding moments / services
  - proof / trust
  - cities hub / related cities
  - testimonials
  - FAQ
  - contact + lead form
- Keep anchors compatible with the current header ids:
  - `inicio`
  - `sobre-mi`
  - `servicios`
  - `galeria`
  - `testimonios`
  - `contacto`

### 3. QA the Spanish homepage
- Review `src/pages/index.astro`
- Confirm it uses `buildHomePageData()` from `src/data/landingPages.ts`
- Confirm homepage intent stays broad:
  - target `saxofonista para bodas`
  - do not over-target exact city queries
- Check internal links to launched city pages

### 4. QA the dynamic city route
- Review `src/pages/[slug].astro`
- Confirm it generates pages only for launched locations
- Confirm self-referencing canonicals
- Confirm it uses `buildCityPageData(location)`
- Confirm schema for:
  - `ProfessionalService`
  - `FAQPage`
  - `BreadcrumbList`

### 5. QA the layout SEO contract
- Review `src/layouts/Layout.astro`
- Confirm support for:
  - `canonical`
  - `robots`
  - Open Graph fields
  - Twitter card fields
  - `alternates`
  - `schemas`
- Confirm the old hardcoded `PersonJsonLd` usage is no longer referenced
- Confirm font preloads were reduced to the minimum needed above the fold

### 6. QA navigation behavior
- Review `src/components/parts/Header.astro`
- Confirm anchor links work on dynamic city pages, not just on `/`
- Confirm privacy-policy pages still point navigation back to the homepage if needed

### 7. QA crawl assets
- Review `public/robots.txt`
- Review `src/pages/sitemap.xml.ts`
- Confirm they include:
  - homepage
  - English homepage
  - privacy pages
  - launched city pages only

### 8. QA hreflang strategy
- Confirm alternates are only present where true equivalents exist
- Homepage:
  - `/` <-> `/en`
- Privacy pages:
  - `/politica-de-privacidad` <-> `/en/privacy-policy`
- Local city pages should not declare English alternates yet

### 9. Final review of legal pages
- Review the replacement privacy-policy text in:
  - `src/pages/politica-de-privacidad.astro`
  - `src/pages/en/privacy-policy.astro`
- Confirm there are no wrong references such as:
  - `LEADSLEND`
  - account / username / password language
  - newsletter / platform copy
  - `leadslend@gmail.com`
- Keep the new version short, accurate, and aligned to:
  - quote requests
  - contact by email / phone / WhatsApp
  - analytics
  - hosting

### 10. Keep the English homepage stable
- Keep `src/pages/en/index.astro` working
- At minimum confirm:
  - canonical
  - alternates
- Full English template refactor stays optional for now unless shared layout compatibility requires it

### 11. Add the next round of performance improvements
- Prioritize low-risk speed wins:
  - reduce font preloads in layout
  - avoid reusing very heavy gallery assets in the new Spanish landing template
  - keep new landing pages lighter than the current old homepage sections
- Optional follow-up:
  - refactor old gallery component for English page
  - replace heavy embeds with lighter previews

### 12. Validate before continuing implementation
- Run `npm.cmd run build`
- If Astro build still fails with sandbox `spawn EPERM`, note the exact failing step
- Also run a quick check for:
  - one `h1` per page
  - self-canonicals on city pages
  - correct sitemap entries
  - launched city internal links

## Notes for next session

- The data model is already pointed at a phased rollout, so do not switch to "publish every city immediately" unless the rollout strategy changes.
- The biggest unfinished work is validation: build, metadata QA, sitemap QA and a final text-cleanup pass.
- The location file is the longest file touched so far; if anything looks off in production, review it first.

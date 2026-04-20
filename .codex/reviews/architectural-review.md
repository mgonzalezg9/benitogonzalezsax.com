# Architectural Review Playbook

Use this review lens when the task involves refactoring, composition changes, or new components.

Focus on:
- component composition
- DRY opportunities
- separation of concerns
- reusability of landing sections
- naming and file organization
- whether data logic is leaking into presentation
- whether i18n and SEO concerns are placed in the right layer

Key project context:
- Astro static site
- wedding landing system is data-driven
- `WeddingLandingPage.astro` should remain a thin composition layer
- `src/data/landingPages.ts` and `src/data/locations.ts` are the main content/data sources

Expected review output:
- identify structural issues
- explain why they matter
- keep findings concrete and file-specific

# PRD: Recommended Suppliers Sections For Local SEO Pages

## Problem Statement

The local SEO pages are already ranking and converting well, but some city pages can become stronger by adding genuine local proof and useful partner context. Couples planning a wedding often need more than a saxophonist: they may also need a planner, photographer, photobooth provider, venue, decorator, or other trusted suppliers.

The user wants to add curated recommended suppliers to city pages where there are real relationships and genuine recommendations. The goal is to help couples, make the relevant city pages more unique, strengthen local authority, and support natural partner relationships and backlinks without creating a thin reciprocal-link pattern.

The first supplier to support is María & Co., a Murcia / Cartagena wedding planner with a public site and wedding-directory presence.

## Solution

Add an optional, data-driven recommended suppliers section to local landing pages.

The section should render only on city pages that have at least one real recommended supplier. For v1, the first city is Murcia and the first supplier is María & Co., categorized as a wedding planner. The section should be positioned near the bottom of the page, after the core sales funnel, so it supports trust and local usefulness without distracting from videos, repertoire, packs, testimonials, FAQs, and quote requests.

The section should feel like an editorial recommendation for couples, not a link-exchange block. Each supplier should include a category, name, short explanation, service area, and a link to the most relevant page. The copy should explain why the supplier is useful for couples planning a wedding in that city.

## User Stories

1. As a couple planning a wedding in Murcia, I want to see trusted local suppliers, so that I can discover useful professionals beyond the saxophonist.
2. As a couple planning a wedding in Murcia, I want to understand why each supplier is recommended, so that the list feels curated rather than random.
3. As a couple comparing wedding suppliers, I want short supplier descriptions, so that I can quickly decide whether to open their website.
4. As a couple using the page on mobile, I want the supplier section to stay organized, so that it does not make the page feel too long.
5. As a couple ready to contact Benito, I want recommended suppliers not to interrupt the quote flow, so that I can still request availability easily.
6. As Benito, I want to recommend only suppliers I genuinely trust, so that the section helps couples and protects my reputation.
7. As Benito, I want the supplier section to appear only in cities where I have real recommendations, so that the site does not look artificial.
8. As Benito, I want Murcia to support María & Co. first, so that the first iteration starts with a real wedding-planning partner.
9. As Benito, I want the section to support one or more suppliers per city, so that Alicante or Valencia can later have smaller lists without forcing three suppliers.
10. As Benito, I want each supplier to have a category, so that planners, photographers, photobooths, venues, and other providers are easy to scan.
11. As Benito, I want each supplier to have a short editorial recommendation, so that the content adds uniqueness to the city page.
12. As Benito, I want the links to be natural editorial links when the recommendation is genuine, so that the implementation follows a healthy link strategy.
13. As Benito, I want the section to avoid looking like a reciprocal-link directory, so that the site stays trustworthy.
14. As Benito, I want the data to be reusable across local pages, so that future suppliers can be added without changing page structure.
15. As Benito, I want supplier content to be stored in structured data, so that future cities can render the same component consistently.
16. As a search engine, I want supplier recommendations to be visible and contextual, so that the city page demonstrates local relevance.
17. As an LLM or answer engine, I want clear relationships and local context, so that the page is easier to understand as part of a real wedding ecosystem.
18. As a partner supplier, I want my recommendation to be accurate and respectful, so that the link reflects a real professional relationship.
19. As a partner supplier, I want the link to point to my most relevant page, so that couples land on useful information.
20. As Manu or another reviewer, I want the feature to follow the existing landing-page architecture, so that it is easy to review and maintain.
21. As a developer, I want pages without suppliers to render exactly as they do today, so that there is no unnecessary visual or content change.
22. As a developer, I want the section copy to support Spanish first and English later if needed, so that the feature can evolve with the international pages.
23. As a developer, I want supplier links to support external URLs, so that partners can link to their own websites or directory profiles.
24. As a developer, I want the section to be optional per city, so that local pages remain clean when no real supplier exists.
25. As a reviewer, I want the first implementation to be small and focused, so that the feature can be validated with Murcia before scaling.

## Implementation Decisions

- Build the feature as a data-driven optional city-page section.
- Do not add a homepage supplier section in v1.
- Do not create a standalone recommended suppliers page in v1.
- Render the section only when a local city page has one or more supplier entries.
- Support one or more suppliers per city; three suppliers is ideal but not required.
- Keep the section close to the bottom of the page, after the main conversion content.
- On mobile, follow the existing accordion behavior used by lower-information sections.
- Use a restrained card layout that does not visually compete with Benito's own quote CTA.
- Keep supplier entries text-first in v1; do not require logos or images.
- Add a structured supplier data model with fields for city, supplier name, category, description, service area, URL, and optional external profile URL.
- The first supplier entry should be María & Co., categorized as a wedding planner for Murcia / Cartagena / Región de Murcia.
- The supplier link should point to the most relevant public page available for couples, preferably the supplier's website or best wedding profile.
- Use natural outbound links for genuine editorial recommendations.
- Use sponsored or nofollow treatment only if a link is paid, sponsored, or not editorial.
- Do not add schema markup for the recommended suppliers section in v1.
- Keep page structure and existing funnel order intact.
- Preserve pages without suppliers exactly as they are.
- Keep user-facing reusable labels in the i18n layer if the section needs shared UI labels.
- Keep page-specific supplier copy in data, not hardcoded inside the component.
- Keep the implementation compatible with Spanish local pages first; English support can be added later if suppliers are relevant to English users.

## Testing Decisions

- Build validation is required because this project relies primarily on Astro build checks.
- The best tests are behavior-level checks: pages with suppliers render the section, pages without suppliers do not.
- Validate the Murcia page renders the supplier section with María & Co.
- Validate at least one non-Murcia city page does not render an empty supplier section.
- Validate the homepage does not render the supplier section.
- Validate mobile behavior follows the existing accordion pattern.
- Validate external supplier links are crawlable and open the expected URL.
- Validate the section does not alter existing anchors, canonicals, schema, sitemap behavior, or landing-page data generation.
- Validate the visible copy does not claim a paid partnership or reciprocal exchange.
- Validate the implementation keeps existing section order and quote flow intact.

## Out of Scope

- A global recommended suppliers page.
- Supplier logos or image management.
- Automatic partner backlink tracking.
- Schema markup for suppliers.
- Paid or sponsored partnership labeling beyond normal link attributes if needed.
- Adding suppliers to every city page.
- Adding weak or purely reciprocal suppliers.
- Changing the homepage.
- Changing the existing sales funnel order.
- Adding English supplier sections unless a real English/international supplier use case is defined.

## Further Notes

The strategic rule is simple: the section exists to help couples first. Backlinks and partner authority are valuable side effects, but they should not be the reason a supplier appears.

María & Co. is a suitable first supplier because public sources show a real wedding-planning brand with Murcia / Cartagena relevance, services around wedding planning and coordination, and existing wedding-directory presence.

Public references used while preparing this PRD:

- María & Co. website: https://www.mariayco.es/the-elegant-wedding-experience
- María & Co. services: https://www.mariayco.es/servicios
- María & Co. about page: https://www.mariayco.es/sobre-nosotros
- María & Co. Bodas.net profile: https://www.bodas.net/organizacion-bodas/maria-%26-co--e187381
- María & Co. Wedinbo profile: https://wedinbo.es/maria-co/

This PRD should be implemented as a small v1 on the Murcia page first. After the first version is reviewed, the same data model can support Alicante, Valencia, or other cities when genuine recommended suppliers exist.

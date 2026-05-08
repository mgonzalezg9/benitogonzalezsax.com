# Issues: Recommended Suppliers Sections

Parent PRD:

- `docs/prd-recommended-suppliers-sections.md`

This breakdown uses vertical slices so each issue produces a narrow, reviewable, end-to-end result.

## Issue 1: Add Supplier Data Model And Murcia Supplier Entry

Type: AFK

Blocked by: None

User stories covered: 6, 7, 8, 9, 10, 14, 15, 18, 19, 21, 23, 24

### What to build

Add a structured recommended-suppliers data model that can be attached to local city pages. Add the first supplier entry for Murcia: María & Co., categorized as a wedding planner serving Murcia / Cartagena / Región de Murcia.

The data model should support city-specific supplier lists, optional supplier rendering, external URLs, category, short recommendation copy, and service area.

### Acceptance criteria

- [ ] Supplier data can be keyed by local city/page slug.
- [ ] Murcia has one supplier entry for María & Co.
- [ ] Pages without supplier entries have no supplier data.
- [ ] Supplier entries include name, category, description, service area, URL, and optional profile URL.
- [ ] María & Co. points to the most useful public page for couples.
- [ ] No UI renders yet unless completed as part of the same implementation slice.
- [ ] Existing homepage and non-Murcia pages remain unchanged.

## Issue 2: Render Recommended Suppliers Section On Murcia Page Only

Type: AFK

Blocked by: Issue 1

User stories covered: 1, 2, 3, 5, 7, 8, 11, 12, 13, 16, 17, 18, 21, 24, 25

### What to build

Render a new recommended suppliers section on local city pages only when supplier data exists. For v1, the section should appear on the Murcia page and should not appear on the homepage or any other city page.

The section should be placed near the bottom of the page after the main conversion content, using restrained styling and text-first supplier cards.

### Acceptance criteria

- [ ] Murcia page renders a recommended suppliers section.
- [ ] The section includes María & Co. as a wedding planner.
- [ ] The section explains why María & Co. is recommended for couples planning a wedding in Murcia.
- [ ] Supplier link is a normal crawlable external link.
- [ ] Homepage does not render the supplier section.
- [ ] Non-Murcia local pages do not render an empty supplier section.
- [ ] The section does not claim payment, sponsorship, or reciprocal exchange.
- [ ] Existing sales funnel order remains unchanged.

## Issue 3: Integrate Supplier Section With Mobile Accordion Pattern

Type: AFK

Blocked by: Issue 2

User stories covered: 4, 5, 20, 21, 24

### What to build

Ensure the recommended suppliers section follows the landing page's existing organization on mobile. It should stay easy to scan and should not make the page feel heavier or interrupt the main conversion path.

### Acceptance criteria

- [ ] On mobile, the supplier section follows the same accordion-style behavior as comparable lower-information sections.
- [ ] The supplier section is collapsed by default on mobile if that matches the current lower-section behavior.
- [ ] The title is clear and city-specific, such as `Proveedores recomendados en Murcia`.
- [ ] The supplier card content fits without overflow on common mobile widths.
- [ ] The floating CTA remains usable and does not overlap the supplier content incoherently.
- [ ] Desktop rendering remains clean and restrained.

## Issue 4: Add I18n Labels And Section Chrome For Supplier Recommendations

Type: AFK

Blocked by: Issue 2

User stories covered: 20, 22, 24

### What to build

Move any reusable section labels, button labels, ARIA labels, and section chrome into the existing language configuration. Keep supplier-specific copy in the supplier data.

This should preserve the repository rule that reusable user-facing UI strings should not be hardcoded inside shared components.

### Acceptance criteria

- [ ] Reusable supplier-section labels are defined in the Spanish i18n config.
- [ ] English i18n parity is added for reusable labels even if English supplier sections are not rendered in v1.
- [ ] Supplier-specific María & Co. copy stays in supplier data, not in the component chrome.
- [ ] Segment A visible labels pass through the existing typography accent-stripping path where applicable.
- [ ] No hardcoded reusable UI labels are introduced in shared Astro components.

## Issue 5: Validate Recommended Supplier Section Behavior

Type: AFK

Blocked by: Issues 1, 2, 3, 4

User stories covered: 20, 21, 24, 25

### What to build

Run final validation for the recommended suppliers feature and document the result. The goal is to prove that Murcia gained the new supplier section while the homepage and other city pages remain unchanged.

### Acceptance criteria

- [ ] `npm.cmd run build` passes.
- [ ] Murcia page is generated successfully.
- [ ] Homepage renders without supplier section.
- [ ] At least one non-Murcia city page renders without supplier section.
- [ ] Supplier link is present and points to the selected María & Co. URL.
- [ ] No sitemap, canonical, schema, or route behavior is changed unintentionally.
- [ ] No empty supplier section is rendered anywhere.
- [ ] The implementation summary explains exactly where the supplier data lives and how to add future city suppliers.

## Suggested Implementation Order

1. Issue 1
2. Issue 2
3. Issue 4
4. Issue 3
5. Issue 5

Issue 2 and Issue 4 may be implemented together if the component needs labels immediately.

## Notes

These issues were not published to an external issue tracker because this workspace does not currently expose issue-tracker tooling or the required `needs-triage` label setup.

---
name: Landing anchor IDs
description: Section IDs in Landing* components must match the i18n nav anchor values
type: rule
---

Every `Landing*` component that acts as a nav target must use its anchor ID from `es.ts` nav values:

| Section | ID |
|---|---|
| Hero | `inicio` |
| About | `propuesta` |
| Services | `servicios` |
| Cities | `ciudades` |
| Testimonials | `opiniones` |
| Contact | `contacto` |

The hash-anchor script in `WeddingLandingPage.astro` opens accordion `<details>` elements by matching these IDs. Mismatched IDs break scroll-to-section navigation.

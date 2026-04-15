---
name: JSON-LD via schemas prop
description: Always build JSON-LD with buildPageSchemas() and pass it to Layout via the schemas prop
type: rule
---

Never write inline JSON-LD `<script type="application/ld+json">` tags directly in pages or components.

Always use the builder and pass the result to `Layout`:

```ts
import { buildPageSchemas } from '@/lib/schemas';

const schemas = buildPageSchemas(page, canonical, location?);
```

```astro
<Layout schemas={schemas} ...>
```

This applies to every landing page, including the English homepage (`/en`), which currently emits no structured data and should be fixed.

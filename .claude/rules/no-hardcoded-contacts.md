---
name: No hardcoded contact details
description: Always use BUSINESS constants from src/lib/site.ts instead of hardcoding contact info
type: rule
---

Never hardcode phone numbers, email addresses, WhatsApp links, or social URLs in components or pages.

Always import and use the `BUSINESS` object from `src/lib/site.ts`:

```ts
import { BUSINESS } from '@/lib/site';
```

This applies to all `.astro` files, including privacy policy pages and contact sections. The only exception is the fallback strings inside `<script>` blocks that cannot import server-side modules — keep those in sync with `BUSINESS` manually.

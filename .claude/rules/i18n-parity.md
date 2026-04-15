---
name: i18n parity
description: Always update both es.ts and en.ts in parallel when adding or changing content
type: rule
---

When adding or changing any user-facing string, update both language files together:

- `src/i18n/lang/es.ts` — Spanish (default language)
- `src/i18n/lang/en.ts` — English

Exception: the `landing` section exists only in `es.ts` because English landing pages use a separate component set with no `useTranslations` dependency.

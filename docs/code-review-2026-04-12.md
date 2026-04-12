# Code Review — 2026-04-12

---

## 1. Architectural Review

### Critical

#### 1. Two parallel, irreconcilable page architectures with no shared components ✅ Fixed

The Spanish landing system (`/` and `[slug].astro`) and the English page (`/en/index.astro`) are built on entirely different component models:

- Spanish pages use `src/components/pages/WeddingLandingPage.astro`, a single ~750-line monolith rendering every section in one file.
- The English page composes individual section components from `src/components/parts/` (Hero, About, Services, Gallery, Testimonials, Contact).

`WeddingLandingPage.astro` has been decomposed into 12 section components in `src/components/parts/` (`LandingHero`, `LandingAbout`, `LandingServices`, `LandingAnswerBlock`, `LandingVideos`, `LandingRepertoire`, `LandingPacks`, `LandingTestimonials`, `LandingContact`, `LandingFaq`, `LandingCities`, `LandingFloatingCta`). The page file is now a ~33-line composition layer.

---

#### 2. Hard-coded Spanish strings throughout `WeddingLandingPage.astro` ✅ Fixed

The i18n system exists and is used consistently by English-facing components, but `WeddingLandingPage.astro` contained dozens of hard-coded strings not in any translation file.

All strings have been moved to `es.ts` under a new `landing` section, and the component now references them via `t.landing.*`. Also, `src/components/parts/Contact.astro` previously hard-coded the phone number, email, and social link hrefs — these now reference `BUSINESS` from `src/lib/site.ts`.

---

#### 3. `answerCardsDisplay` computed in component duplicates logic already in data layer ✅ Fixed

`WeddingLandingPage.astro` recomputed `answerBlockHeading`, `answerBlockIntro`, and `answerCardsDisplay` locally, ignoring `page.answerBlockTitle`, `page.answerBlockIntro`, and `page.answerCards`. The local computation has been removed; the component now uses the data layer fields directly.

Also fixed: missing accents in `buildCityPageData`'s `answerBlockTitle` and `answerBlockIntro` (`rapida` → `rápida`, `que` → `qué`, etc.).

---

### Important

#### 4. `LanguagePicker` always links to `/` regardless of active city page

`LanguagePicker.astro` hardcodes `"/"` as the path, so a user on `/saxofonista-para-bodas-en-madrid` switching language is sent to `/en` (the English homepage), losing their context.

#### 5. JSON-LD schema construction duplicated across `index.astro` and `[slug].astro` ✅ Fixed

Both files contained ~100 lines of nearly identical JSON-LD construction. Extracted into `src/lib/schemas.ts` as `buildPageSchemas(page, canonical, location?)`.

- Home page: `areaServed` covers Península + Illes Balears; `geo` uses Mazarrón coordinates from `BUSINESS`.
- City pages: `areaServed` is a `City` object; `geo` uses the location's coordinates.
- Individual offers on the home page have no `areaServed`; city page offers carry `{ '@type': 'City', name }`.
- `BreadcrumbList` schema included conditionally when `page.breadcrumb` is present.

#### 6. `FadeIn` creates one `IntersectionObserver` per instance

`src/components/animations/FadeIn.astro` uses `is:inline define:vars`, inlining a new `<script>` tag for every usage. With many city landing pages this multiplies significantly.

**Suggestion:** Use a single shared script with a class-based observer.

#### 7. `Counter.astro` `threshold` prop has no effect — `{ threshold }` passed to wrong call

`src/components/animations/Counter.astro` line 20: `{ threshold }` is passed as the second argument to the `forEach` callback instead of to the `IntersectionObserver` constructor. The threshold prop is silently ignored and the browser default of `0` is used.

**Suggestion:** Move `{ threshold }` to be the second argument of `new IntersectionObserver(callback, { threshold })`.

#### 8. City pages (`[slug].astro`) were missing `hreflang` alternate links ✅ Fixed

`[slug].astro` now emits `hreflang="es"` (self-reference) and `hreflang="x-default"` pointing to the homepage.

#### 9. `nav.gallery` key misleadingly named for a "Ciudades" section

In `es.ts`, the fourth nav entry uses key `nav.gallery` but points to `#ciudades` (a cities/coverage section, not a gallery). In `en.ts`, the same slot genuinely is a gallery. This naming disconnect is a maintenance trap.

**Suggestion:** Rename `nav.gallery` to `nav.cities` or a neutral name in both translation files.

---

### Nice to Have

- `testimonialAvatars` map moved to `LandingTestimonials.astro` — avatar imports are now co-located with the component that uses them. ✅ Fixed
- `Services.astro` line 14 assigns icons by array index — fragile if translation item order ever changes.
- `Testimonials.astro` had a commented-out `<img>` block referencing a non-existent `testimonial.image` property. ✅ Removed
- `LanguagePicker.astro` accepted a `currentLang` prop it immediately discarded. ✅ Removed
- `locations.ts` uses a 12-element positional tuple `Seed` type — brittle to extend.

---

## 2. Types & Testing Review

### High

#### Mojibake encoding bug in `src/data/landingPages.ts` ✅ Fixed

Lines 197–244 and 526–601 contained UTF-8 bytes interpreted as Latin-1, producing garbled characters (`CÃ³ctel` instead of `Cóctel`, `QuÃ© hace` instead of `Qué hace`, etc.) in `sharedServiceTypes`, `buildHomeAnswerCards`, `buildCityAnswerCards`, and `answerBlockTitle`/`answerBlockIntro`. These values flow into JSON-LD structured data on every page.

---

### Medium

#### `routeMappings` typed too loosely — `src/i18n/routes.ts` line 12

```ts
export const routeMappings: Record<string, string> = { ... }
```

`Record<string, string>` accepts any string key; TypeScript cannot warn on missing keys. Use `as const` and remove the explicit annotation for exhaustiveness checking.

#### Route mapping is one-directional — `src/i18n/routes.ts` lines 26–31

`getRouteForLanguage` only maps Spanish → English. The English → Spanish direction falls through to `routeMappings[pathname] ?? pathname`, which returns the English path unchanged when no mapping exists.

#### `page.answerCards` / `page.answerBlockTitle` / `page.answerBlockIntro` never consumed ✅ Fixed

`WeddingLandingPage.astro` previously ignored these three `LandingPageData` fields and computed local equivalents. The local computation has been removed and the page data fields are now used directly.

---

### Low

| File | Lines | Issue |
|---|---|---|
| `src/i18n/utils.ts` | 3, 9 | Missing explicit return type annotations |
| `src/i18n/utils.ts` | 10 | Dead fallback branch (`\|\| translations[defaultLang]`) — `lang` is always a valid `Language` ✅ Fixed |
| `src/components/ui/LanguagePicker.astro` | 16–23 | Declared `Props` type and passed `currentLang` prop were unused ✅ Fixed |
| `src/components/parts/Services.astro` | 14 | Icon array indexed as `string` rather than `'ring' \| 'briefcase' \| 'party' \| 'hotel'` union |
| `src/lib/site.ts` | 22, 24 | Missing return type annotations on `absoluteUrl` and `buildWhatsAppHref` |

> Build was not run during the review. Run `npm run build` to confirm no compile errors.

---

## 3. Correctness Review

### Content & UI

#### English hero subtitle typo — `src/i18n/lang/en.ts` line 41

"saxphonist" should be "saxophonist".

#### Hero image uses marketing subtitle as `alt` text — `src/components/parts/Hero.astro` line 15

`alt={t.hero.subtitle}` uses a marketing tagline as the image's accessible description. Should be a descriptive image alt (e.g. "Benito González performing with a saxophone").

#### Testimonials differ between languages

Spanish pages render 9 testimonials from `sharedTestimonials` in `landingPages.ts`. The English page renders a different set of 4 from `en.ts`. No content parity.

#### English page is missing entire sections

The English `/en` page has no equivalent for: intro/trust section, wedding moments (Ceremonia/Cóctel/Banquete/Barra libre), FAQ answer cards, videos section, repertoire section, wedding packs, cities/coverage section, or contact form with WhatsApp button.

#### `addressLocality` mismatch between UI and JSON-LD

`Contact.astro` displays "Murcia, España" (`es.ts` line 151) but `BUSINESS.addressLocality` in `src/lib/site.ts` is `'Mazarrón'`, which flows into the JSON-LD `PostalAddress` on every page.

---

### SEO Gaps

#### English page has no Open Graph image — `src/pages/en/index.astro`

`index.astro` passes `ogImage={absoluteUrl(DEFAULT_OG_IMAGE)}` but `en/index.astro` passes no `ogImage` prop. Social shares of the English page will have no preview image.

#### English page has no JSON-LD structured data — `src/pages/en/index.astro`

No `schemas` prop is passed to `Layout`. Google sees no structured data on `/en`.

#### City pages missing `hreflang` alternate links ✅ Fixed

`[slug].astro` now emits `hreflang="es"` (self-reference) and `hreflang="x-default"` pointing to the homepage.

#### Language picker on city pages routes to `/en` regardless of current page

`LanguagePicker.astro` hardcodes `"/"` — a user on a city page who switches language lands on the English homepage, not the closest equivalent page.

---

### Dead Code ✅ Fixed

| Item | Status |
|---|---|
| `src/scripts/PersonJsonLd.astro` — never imported on any page | Deleted |
| Commented-out avatar `<img>` in `Testimonials.astro` lines 26–30 | Removed |
| `currentLang` prop passed from `Header.astro` to `LanguagePicker` (ignored) | Removed |
| Dead `\|\| translations[defaultLang]` fallback in `utils.ts` | Removed |

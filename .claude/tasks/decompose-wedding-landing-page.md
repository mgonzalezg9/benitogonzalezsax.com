# Task: Decompose WeddingLandingPage.astro into section components

## Goal

Break `src/components/pages/WeddingLandingPage.astro` (~750 lines) into focused section components, each with a single responsibility. The page file becomes a thin composition layer.

All new components live in `src/components/parts/` alongside the existing ones (Hero, About, Services, etc. used by the English page).

## Context

- `WeddingLandingPage.astro` is used by `src/pages/index.astro` and `src/pages/[slug].astro`.
- It receives a single `page: LandingPageData` prop (defined in `src/data/landingPages.ts`).
- It uses `t = useTranslations(lang)` for UI strings — all strings are now in `es.ts` under `t.landing.*`.
- `BUSINESS` constants from `src/lib/site.ts` are used in the contact section.
- Nine testimonial avatar images are statically imported at the top and used via a lookup map.

## Components to create

### 1. `LandingHero.astro`
**Props:** `page: Pick<LandingPageData, 'heroLabel' | 'heroTitle' | 'heroSummary' | 'heroBody' | 'primaryCtaLabel' | 'primaryCtaHref' | 'secondaryCtaLabel' | 'secondaryCtaHref' | 'trustPoints' | 'breadcrumb'>`

Renders the full hero section (`<section id="inicio">`):
- Breadcrumb nav
- H1, summary, body, two CTA buttons
- Trust points list
- Stats grid (values/labels from `t.landing.hero.stats`)
- Background video + fallback image

---

### 2. `LandingAbout.astro`
**Props:** `page: Pick<LandingPageData, 'introTitle' | 'introParagraphs'>`

Renders `<section id="propuesta">`: about image + title + paragraphs.

---

### 3. `LandingServices.astro`
**Props:** `page: Pick<LandingPageData, 'serviceTitle' | 'serviceDescription' | 'moments' | 'extrasTitle' | 'extras'>`

Renders `<section id="servicios">`: moments grid + extras box.

---

### 4. `LandingAnswerBlock.astro`
**Props:** `page: Pick<LandingPageData, 'answerBlockTitle' | 'answerBlockIntro' | 'answerCards'>`

Renders the "Datos clave" section: heading, intro, 2-column answer cards grid.

---

### 5. `LandingVideos.astro`
**Props:** `page: Pick<LandingPageData, 'videosTitle' | 'videosIntro' | 'videos'>`

Renders `<section id="videos">` with YouTube/Instagram iframes.
Move the `getYouTubeEmbedUrl`, `getInstagramEmbedUrl`, and `getEmbedUrl` helpers into this component (or into a shared `src/lib/embed.ts` if reused elsewhere).

---

### 6. `LandingRepertoire.astro`
**Props:** `page: Pick<LandingPageData, 'repertoireTitle' | 'repertoireIntro' | 'repertoireCategories' | 'repertoireDownloadHref' | 'repertoireDownloadLabel' | 'repertoirePreviewImages'>`

Renders `<section id="repertorio">`: category cards, download CTA, preview image grid.

---

### 7. `LandingPacks.astro`
**Props:** `page: Pick<LandingPageData, 'packsTitle' | 'packsIntro' | 'packs' | 'packPreviewImages'>`

Renders `<section id="packs">`: two pack cards (recommended + flexible) with bullets.

---

### 8. `LandingTestimonials.astro`
**Props:** `page: Pick<LandingPageData, 'testimonialsTitle' | 'testimonialsDescription' | 'testimonials'>`

Renders `<section id="opiniones">`: testimonial cards with avatars.
Move the `testimonialAvatars` lookup map and all nine avatar imports here — they only belong to this component.

---

### 9. `LandingContact.astro`
**Props:** `page: Pick<LandingPageData, 'contactTitle' | 'contactDescription' | 'contactHighlight' | 'whatsappHref' | 'formSubject'>`

Renders `<section id="contacto">`: contact info panel (phone, email, WhatsApp) + lead form.
Uses `BUSINESS` from `src/lib/site.ts` internally — no need to thread it through props.
The `<script>` for form submission logic stays in this component.

---

### 10. `LandingFaq.astro`
**Props:** `page: Pick<LandingPageData, 'faqTitle' | 'faqs'>`

Renders the FAQ `<details>`/`<summary>` accordion section.

---

### 11. `LandingCities.astro`
**Props:** `page: Pick<LandingPageData, 'citiesTitle' | 'citiesIntro' | 'cityLinks'>`

Renders `<section id="ciudades">`: city links grid.

---

### 12. `LandingFloatingCta.astro`
**Props:** none (reads `t.landing.floatingCta.*` internally)

Renders the two fixed floating CTA buttons (`Solicita presupuesto` + `Ver vídeos`).
The scroll-visibility `<script>` that shows/hides the floating CTAs and syncs with the hero button currently lives in `WeddingLandingPage.astro` — move it here.

---

## Result: WeddingLandingPage.astro after decomposition

After all components are extracted, the page file becomes:

```astro
---
import type { LandingPageData } from '../../data/landingPages';
import LandingHero from '../parts/LandingHero.astro';
import LandingAbout from '../parts/LandingAbout.astro';
import LandingServices from '../parts/LandingServices.astro';
import LandingAnswerBlock from '../parts/LandingAnswerBlock.astro';
import LandingVideos from '../parts/LandingVideos.astro';
import LandingRepertoire from '../parts/LandingRepertoire.astro';
import LandingPacks from '../parts/LandingPacks.astro';
import LandingTestimonials from '../parts/LandingTestimonials.astro';
import LandingContact from '../parts/LandingContact.astro';
import LandingFaq from '../parts/LandingFaq.astro';
import LandingCities from '../parts/LandingCities.astro';
import LandingFloatingCta from '../parts/LandingFloatingCta.astro';

interface Props {
  page: LandingPageData;
}

const { page } = Astro.props;
---

<main class="bg-gray-50 text-gray-900">
  <LandingHero page={page} />
  <LandingAbout page={page} />
  <LandingServices page={page} />
  <LandingAnswerBlock page={page} />
  <LandingVideos page={page} />
  <LandingRepertoire page={page} />
  <LandingPacks page={page} />
  <LandingTestimonials page={page} />
  <LandingContact page={page} />
  <LandingFaq page={page} />
  <LandingCities page={page} />
  <LandingFloatingCta />
</main>
```

## Notes

- Each component should import `getLangFromUrl` + `useTranslations` and call `t = useTranslations(getLangFromUrl(Astro.url))` itself. Do not thread `t` through props.
- The scroll-sync `<script>` in the current file references DOM IDs from other sections (`#contacto`, `#videos`). Keep it in `LandingFloatingCta.astro` where it logically belongs — the IDs are stable contracts between components.
- Do not change any markup, classes, or behaviour while decomposing — pure structural extraction only.

import type { LandingPageData } from '../data/landingPages';
import { getEnglishLocationName, type LocationEntry } from '../data/locations';
import { en } from '../i18n/lang/en';
import { es } from '../i18n/lang/es';
import { BUSINESS, absoluteUrl } from './site';

const REVIEW_SCHEMA_SLUGS = ['saxofonista-para-bodas-en-madrid'];

// One canonical id for the musician so every page's founder/employee link
// resolves to the same entity instead of a per-URL duplicate.
const PERSON_ID = absoluteUrl('/#benito-gonzalez');

export const buildPageSchemas = (
  page: LandingPageData,
  canonical: string,
  location?: LocationEntry,
) => {
  const isEnglish = page.canonicalPath.startsWith('/en');
  const city = location
    ? isEnglish
      ? getEnglishLocationName(location)
      : location.city
    : BUSINESS.addressLocality;
  const province = location?.province ?? BUSINESS.addressRegion;
  const latitude = location?.latitude ?? BUSINESS.latitude;
  const longitude = location?.longitude ?? BUSINESS.longitude;

  // The same nine testimonials on all 11 city pages is a Google review-spam
  // pattern, so reviews ship only on the brand entity (homepage) plus the city
  // pages listed here, which already have review snippets live in Search.
  const showReviews = !location || REVIEW_SCHEMA_SLUGS.includes(location.slug);

  const reviewSchema = showReviews
    ? {
        review: page.testimonials.map((testimonial) => ({
          '@type': 'Review',
          reviewBody: testimonial.quote,
          author: {
            '@type': 'Person',
            name: testimonial.name,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
        })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: String(page.testimonials.length),
          bestRating: '5',
        },
      }
    : {};

  const offerCatalog = {
    '@type': 'OfferCatalog',
    name: location
      ? isEnglish
        ? `Wedding saxophonist services in ${city}`
        : `Servicios de saxo para bodas en ${city}`
      : page.heroTitle,
    itemListElement: page.serviceTypes.map((serviceType) => ({
      '@type': 'Offer',
      ...(location && {
        areaServed: {
          '@type': 'City',
          name: city,
        },
      }),
      itemOffered: {
        '@type': 'Service',
        name: location
          ? `${serviceType} ${isEnglish ? 'in' : 'en'} ${city}`
          : serviceType,
        serviceType,
      },
    })),
  };

  const areaServed = location
    ? {
        '@type': 'City',
        name: city,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: province,
        },
      }
    : [
        { '@type': 'AdministrativeArea', name: 'Península' },
        { '@type': 'AdministrativeArea', name: 'Illes Balears' },
      ];

  const businessId = `${canonical}#business`;

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.name,
    jobTitle: isEnglish ? 'Saxophonist' : 'Saxofonista',
    description: (isEnglish ? en : es).landing.bio.paragraphs.join(' '),
    url: absoluteUrl(isEnglish ? '/en' : '/'),
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    knowsLanguage: ['es', 'en'],
    knowsAbout: page.serviceTypes,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Conservatorio de Lorca',
    },
    homeLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        addressCountry: BUSINESS.addressCountry,
      },
    },
    sameAs: [
      BUSINESS.googleBusiness,
      BUSINESS.facebook,
      BUSINESS.instagram,
      BUSINESS.youtube,
    ],
  };

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': businessId,
      name: location ? `${BUSINESS.name} - ${page.heroTitle}` : BUSINESS.name,
      url: canonical,
      description: page.description,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      serviceType: page.serviceTypes,
      knowsAbout: page.serviceTypes,
      knowsLanguage: ['Spanish', 'English'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        addressCountry: BUSINESS.addressCountry,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: BUSINESS.phone,
          email: BUSINESS.email,
          availableLanguage: ['es', 'en'],
        },
      ],
      areaServed,
      geo: {
        '@type': 'GeoCoordinates',
        latitude,
        longitude,
      },
      hasOfferCatalog: offerCatalog,
      founder: { '@id': PERSON_ID },
      employee: { '@id': PERSON_ID },
      ...reviewSchema,
      sameAs: [
        BUSINESS.googleBusiness,
        BUSINESS.facebook,
        BUSINESS.instagram,
        BUSINESS.youtube,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.heroTitle,
      serviceType: page.serviceTypes,
      provider: {
        '@type': 'ProfessionalService',
        name: BUSINESS.name,
        url: canonical,
      },
      areaServed,
      offers: offerCatalog.itemListElement,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    person,
    ...(page.breadcrumb
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: page.breadcrumb.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.label,
              item: absoluteUrl(crumb.href),
            })),
          },
        ]
      : []),
  ];

  return schemas;
};

import type { LandingPageData } from '../data/landingPages';
import { getEnglishLocationName, type LocationEntry } from '../data/locations';
import { BUSINESS, absoluteUrl } from './site';

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

  // Reviews/ratings live only on the brand entity (homepage). Repeating the same
  // testimonials on every city URL is a Google review-spam pattern.
  const reviewSchema = location
    ? {}
    : {
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
      };

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

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
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

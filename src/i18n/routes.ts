import { defaultLang, type Language } from './ui';
import {
  getEnglishLocationSlug,
  getLocationByEnglishSlug,
  getLocationBySlug,
} from '../data/locations';

/**
 * Route mappings between Spanish and English paths.
 *
 * Keys represent Spanish routes, values represent their English equivalents.
 *
 * Example:
 * - "/" -> "/en"
 * - "politica-de-privacidad" -> "/en/privacy-policy"
 */
export const routeMappings: Record<string, string> = {
  '/': '/en',
  '/politica-de-privacidad': '/en/privacy-policy',
};


/**
 * Get the equivalent route in a different language.
 *
 * @param pathname Current pathname (e.g. "/", "/en", "/en/privacy-policy", "/politica-de-privacidad")
 * @param targetLang Target language
 * @returns The equivalent route in the target language
 */
export const getRouteForLanguage = (pathname: string, targetLang: Language): string => {
  const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
  const englishCityMatch = normalizedPath.match(/^\/en\/([^/]+)$/);
  const spanishCitySlug = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;

  if (targetLang === defaultLang) {
    if (normalizedPath === '/en') return '/';
    if (normalizedPath === '/en/privacy-policy') return '/politica-de-privacidad';

    if (englishCityMatch) {
      const location = getLocationByEnglishSlug(englishCityMatch[1]);
      return location ? `/${location.slug}` : normalizedPath;
    }

    return normalizedPath;
  }

  const spanishLocation = getLocationBySlug(spanishCitySlug);
  if (spanishLocation) {
    return `/en/${getEnglishLocationSlug(spanishLocation)}`;
  }

  return routeMappings[normalizedPath] ?? normalizedPath;
};

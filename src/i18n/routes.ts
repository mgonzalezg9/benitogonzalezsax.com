import { defaultLang, type Language } from './ui';

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
  if (targetLang === defaultLang) {
    return pathname;
  }

  return routeMappings[pathname] ?? pathname;
};

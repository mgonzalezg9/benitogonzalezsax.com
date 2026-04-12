import { translations, defaultLang, type Language } from './ui';

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Language;
  return defaultLang;
}

export const useTranslations = (lang: Language) => {
  return translations[lang];
}

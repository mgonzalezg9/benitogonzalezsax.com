import { es } from './lang/es';
import { en } from './lang/en';

export const translations = {
  es,
  en,
} as const;

export const defaultLang = 'es';

export type Language = keyof typeof translations;
export type Translations = typeof es;

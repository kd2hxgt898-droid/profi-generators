import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { ru } from './ru';
import { en } from './en';

export type Language = 'ru' | 'en';

export const SUPPORTED_LANGUAGES: ReadonlyArray<{ code: Language; label: string; flag: string }> = [
  { code: 'ru', label: 'Русский', flag: 'RU' },
  { code: 'en', label: 'English', flag: 'EN' },
];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'profi-lang',
      caches: ['localStorage'],
    },
  });

export default i18n;

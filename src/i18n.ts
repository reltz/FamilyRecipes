import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationPTBR from './locales/pt-BR/translation.json';
import translationsEN from './locales/en/translation.json';

const resources = {
  'pt-BR': {
    translation: translationPTBR,
  },
  'en': {
    translation:  translationsEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    supportedLngs: ['en', 'pt-BR'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

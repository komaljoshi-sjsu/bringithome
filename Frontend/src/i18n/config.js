import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

const DETECTION_OPTIONS = {
  order: ['localStorage','navigator']
};


i18n.use(initReactI18next).use(LanguageDetector).init({
  fallbackLng: 'en',
  detection: DETECTION_OPTIONS,
  resources: {
    en: {
      translations: require('./locales/en/translations.json')
    },
    es: {
      translations: require('./locales/es/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'es'];

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationUA from './locales/ua.json';

const savedLang = localStorage.getItem('lang') || 'en';

const resources = {
  en: { translation: translationEN },
  ua: { translation: translationUA },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

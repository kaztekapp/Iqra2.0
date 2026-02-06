import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './locales/en';
import fr from './locales/fr';

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
const supportedLanguage = deviceLanguage === 'fr' ? 'fr' : 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: supportedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

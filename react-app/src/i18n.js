import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frensh from './languages/fr';
import english from './languages/en';
import cities_en from './languages/cities_en';
import cities_fr from './languages/cities_fr';
import countries_en from "./languages/countries_en";
import countries_fr from "./languages/countries_fr";
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: english,
    city: cities_en,
    country: countries_en
  },
  fr: {
    translation: frensh,
    city: cities_fr,
    country: countries_fr
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
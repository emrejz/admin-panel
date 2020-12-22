import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

//translations
import translationEN from "./locales/en/translation.json";
import translationTR from "./locales/tr/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
};
const detection = {
  order: ["localStorage", "navigator"],
  lookupLocalStorage: "i18nextLng",
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection,
    // lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

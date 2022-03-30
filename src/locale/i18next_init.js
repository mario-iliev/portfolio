import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import local_storage from "../utils/local_storage";
import storageMap from "../_constants/storageMap";
import en from "./en";
import bg from "./bg";

const currentLanguage = local_storage.get(storageMap.common.LANGUAGE) || "en";

local_storage.set(storageMap.common.LANGUAGE, currentLanguage);

i18next.use(initReactI18next).init({
  debug: false,
  lng: currentLanguage,
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
    bg: {
      translation: bg,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  parseMissingKeyHandler: () => "MISSING_TRANSLATION_KEY",
});

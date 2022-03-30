import { setStoreMe } from "store-me";
import { useEffect } from "react";
import i18next from "i18next";

const useLanguageSwitch = () => {
  useEffect(() => {
    i18next.on("languageChanged", (language) => setStoreMe({ language }));
  }, []);

  const changeLanguage = (lang) => i18next.changeLanguage(lang);

  return { changeLanguage };
};

export default useLanguageSwitch;

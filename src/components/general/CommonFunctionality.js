import { useStoreMe } from "store-me";
import { useEffect } from "react";

const CommonFunctionality = () => {
  const { i18n, language } = useStoreMe("i18n", "language");

  useEffect(() => {
    document.title = i18n("PAGE_TITLE");
  }, [language, i18n]);

  return null;
};

export default CommonFunctionality;

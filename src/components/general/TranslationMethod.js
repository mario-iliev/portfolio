import { useState, useEffect, useRef, isValidElement, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { setStoreMe } from "store-me";

import memoize from "../../utils/memoize";

const translate = (t, text, elementsMap = {}, missingKeyFallback) => {
  let translatedText = t(text);
  let translatedTextParts;
  let hasReactElement;

  if (translatedText === "MISSING_TRANSLATION_KEY") {
    return missingKeyFallback || text;
  }

  if (translatedText.includes("<b>")) {
    const bolds = translatedText.match(/<b>(.+?)<\/b>/g).map(part => part.replace(/<b>|<\/b>/g, ""));

    bolds.forEach(string => {
      translatedText = translatedText.replace(/<b>(.+?)<\/b>/, `{{${string}}}`);
      elementsMap[string] = <b>{string}</b>;
    });
  }

  if (translatedText.includes("<span>")) {
    const spans = translatedText.match(/<span>(.+?)<\/span>/g).map(part => part.replace(/<span>|<\/span>/g, ""));

    spans.forEach(string => {
      translatedText = translatedText.replace(/<span>(.+?)<\/span>/, `{{${string}}}`);
      elementsMap[string] = <span>{string}</span>;
    });
  }

  if (translatedText.includes("<br />")) {
    translatedText = translatedText.replace(/<br \/>/g, "{{new_line}}");
  }

  if (translatedText.includes("{{new_line}}")) {
    elementsMap["new_line"] = elementsMap["new_line"] || <br />;
  }

  if (Object.keys(elementsMap).length) {
    hasReactElement = Object.values(elementsMap).some(isValidElement);
    translatedTextParts = translatedText.split(/{{(.+?)}}/).filter(textPart => textPart !== "");
  }

  if (hasReactElement) {
    return translatedTextParts.map((part, index) => (
      <Fragment key={`${part}-${index}`}>{elementsMap[part] || part}</Fragment>
    ));
  } else if (translatedTextParts) {
    return translatedTextParts.map(part => elementsMap[part] ?? part).join("");
  } else {
    return translatedText;
  }
};

const TranslationMethod = ({ children }) => {
  const [translationIsReady, setTranslationIsReady] = useState(false);
  const { t } = useTranslation();
  const memoizedRef = useRef(memoize(translate));

  useEffect(() => {
    memoizedRef.current = memoize(translate);

    setStoreMe({
      i18n: (text, elementsMap, missingKeyFallback) => memoizedRef.current(t, text, elementsMap, missingKeyFallback),
    });
    setTranslationIsReady(true);
  }, [t]);

  return translationIsReady ? children : null;
};

export default TranslationMethod;

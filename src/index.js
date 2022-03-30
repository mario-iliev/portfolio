import { Normalize } from "styled-normalize";
import ReactDOM from "react-dom/client";
import { Suspense, lazy } from "react";
import { StoreMe } from "store-me";

import "./locale/i18next_init";

import CommonFunctionality from "./components/general/CommonFunctionality";
import LocalStorageManager from "./components/general/LocalStorageManager";
import TranslationMethod from "./components/general/TranslationMethod";
import initialStateDesktop from "./_constants/initialStateDesktop";
import initialStateMobile from "./_constants/initialStateMobile";
import initialStateCommon from "./_constants/initialStateCommon";
import ThemeDesktop from "./components/desktop/ThemeDesktop";
import ThemeMobile from "./components/mobile/ThemeMobile";
import GlobalCSS from "./components/general/GlobalCSS";
import { isMobile } from "./utils/responsive";

const AppDesktop = lazy(() => import("./AppDesktop"));
const AppMobile = lazy(() => import("./AppMobile"));

const initialState = { ...initialStateCommon, ...(isMobile ? initialStateMobile : initialStateDesktop) };

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreMe initialState={initialState}>
    <Normalize />
    <GlobalCSS />

    <TranslationMethod>
      {isMobile && (
        <ThemeMobile>
          <Suspense fallback={null}>
            <AppMobile />
          </Suspense>
        </ThemeMobile>
      )}

      {!isMobile && (
        <ThemeDesktop>
          <Suspense fallback={null}>
            <AppDesktop />
          </Suspense>
        </ThemeDesktop>
      )}

      <LocalStorageManager />
      <CommonFunctionality />
    </TranslationMethod>
  </StoreMe>
);

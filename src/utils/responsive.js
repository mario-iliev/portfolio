import * as deviceInfo from "react-device-detect";
import cn from "classnames";

export const isMobile = deviceInfo.isMobileOnly;
export const isTablet = deviceInfo.isTablet;
export const isDevice = deviceInfo.isMobile;
export const isAndroid = deviceInfo.isAndroid;
export const isIOS = deviceInfo.isIOS;

export const rcn = cn({
  "is-mobile": isMobile,
  "is-tablet": isTablet,
  "is-device": isDevice,
  "is-desktop": !isDevice,
});

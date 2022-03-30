import local_storage from "../utils/local_storage";
import storageMap from "./storageMap";

if (typeof local_storage.get(storageMap.desktop.SOUND_EFFECTS) === "undefined") {
  local_storage.set(storageMap.desktop.SOUND_EFFECTS, true);
}

if (typeof local_storage.get(storageMap.desktop.MUSIC) === "undefined") {
  local_storage.set(storageMap.desktop.MUSIC, true);
}

const initialStateDesktop = {
  nextPage: 0,
  currentPage: 0,
  nextCurrentPortfolioPage: 0,
  currentPortfolioPage: 0,
  lookToSky: false,
  revealHome: false,
  lookToGround: false,
  homeRevealed: false,
  canLoadAudio: false,
  isFullScreen: false,
  menuIsVisible: false,
  introScreenRevealed: false,
  animateSpaceRotation: false,
  windowIsFocused: document.hasFocus(),
  soundEnabled: true,
  userEnabledEffects: local_storage.get(storageMap.desktop.SOUND_EFFECTS),
  userEnabledMusic: local_storage.get(storageMap.desktop.MUSIC),
};

export default initialStateDesktop;

import { useStoreMe } from "store-me";
import { useEffect } from "react";

import local_storage from "../../utils/local_storage";
import storageMap from "../../_constants/storageMap";

const LocalStorageManager = () => {
  const { userEnabledEffects, userEnabledMusic, language } = useStoreMe(
    "userEnabledEffects",
    "userEnabledMusic",
    "language"
  );

  useEffect(() => {
    local_storage.set(storageMap.desktop.SOUND_EFFECTS, userEnabledEffects);
    local_storage.set(storageMap.desktop.MUSIC, userEnabledMusic);
    local_storage.set(storageMap.common.LANGUAGE, language);
  }, [userEnabledEffects, userEnabledMusic, language]);

  return null;
};

export default LocalStorageManager;

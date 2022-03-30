import local_storage from "../utils/local_storage";
import storageMap from "./storageMap";

const initialStateCommon = {
  language: local_storage.get(storageMap.common.LANGUAGE),
  i18n: (text) => text,
};

export default initialStateCommon;

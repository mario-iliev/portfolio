const local_storage = {
  set: (key, data, skipCapacitorSet) => {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }

    localStorage.setItem(key, data);
  },
  get: (key) => {
    let result;

    try {
      result = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      result = localStorage.getItem(key);
    }

    if (result === "undefined" || result === null) {
      return undefined;
    }

    return result;
  },
  remove: (key) => {
    if (Array.isArray(key)) {
      key.forEach((k) => localStorage.removeItem(k));
    } else {
      localStorage.removeItem(key);
    }
  },
};

export default local_storage;

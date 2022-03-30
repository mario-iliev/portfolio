const memoize = fn => {
  const cache = {};

  return (...args) => {
    let result;

    try {
      const stringifiedArgs = JSON.stringify(args);
      result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args);
    } catch (e) {
      result = fn(...args);
    }

    return result;
  };
};

export default memoize;

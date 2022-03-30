window.cachedImages = {};

const loadResources = (resourcesToLoad = []) => {
  if (typeof resourcesToLoad === "string") {
    resourcesToLoad = [resourcesToLoad];
  }

  return Promise.all(
    resourcesToLoad.map(
      (filePath) =>
        new Promise(async (resolve) => {
          try {
            if (!window.cachedImages[filePath]) {
              const image = new Image();

              image.src = filePath;
              window.cachedImages[filePath] = image;
            }

            resolve(true);
          } catch (error) {
            resolve(true);
          }
        })
    )
  );
};

export default loadResources;

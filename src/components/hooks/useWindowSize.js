import { useState, useEffect, useMemo, useRef } from "react";

import useEventListener from "./useEventListener";

const useWindowSize = (debounceMS, callback) => {
  const [state, setState] = useState({
    width: useMemo(() => getWindowWidth(), []),
    height: useMemo(() => getWindowHeight(), []),
    orientation: useMemo(() => getOrientation(getWindowWidth(), getWindowHeight()), []),
    updated: useMemo(() => Date.now(), [])
  });
  const debounce = debounceMS || 100;
  const timeoutRef = useRef();

  const updateState = () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const width = getWindowWidth();
      const height = getWindowHeight();

      setState({
        width,
        height,
        orientation: getOrientation(width, height),
        updated: Date.now()
      });
    }, debounce);
  };

  useEventListener("resize", updateState);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    callback && callback(state);
  }, [state, callback]);

  return { ...state };
};

function getWindowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getWindowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function getOrientation(width, height) {
  return width >= height ? "landscape" : "portrait";
}

export default useWindowSize;

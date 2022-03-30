import { useEffect, useRef } from "react";

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;

    if (!isSupported) {
      return;
    }

    const eventListener = event => savedHandler.current(event);

    element.addEventListener(eventName, eventListener, false);

    return () => {
      element.removeEventListener(eventName, eventListener, false);
    };
  }, [eventName, element]);
};

export default useEventListener;

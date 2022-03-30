import { useRef } from "react";

const usePrevious = (value) => {
  const isChanged = useRef(false);
  const previous = useRef(value);
  const current = useRef(value);

  if (current.current !== value) {
    previous.current = current.current;
    isChanged.current = Date.now();

    current.current = value;
  }

  return [previous.current, current.current, isChanged.current];
};

export default usePrevious;

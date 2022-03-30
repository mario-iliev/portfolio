import { useRef, useEffect } from "react";

const useIsMounted = () => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return isMounted;
};

export default useIsMounted;

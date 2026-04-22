import { useEffect, useRef } from "react";

export function useDebounce(callback, delay) {
  const timer = useRef(null);

  const debounced = (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return debounced;
}
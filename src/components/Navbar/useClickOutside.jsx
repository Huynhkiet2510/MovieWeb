import { useEffect, useRef } from "react";

export const useClickOutside = (callback) => {
  const domRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (domRef.current && !domRef.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [callback]);

  return domRef; 
};
import { RefObject, useEffect } from "react";

export function useIntersectElement<T extends HTMLDivElement | null>(
  ref: RefObject<T> | null,
  callback: () => void,
  options?: IntersectionObserverInit,
): void {
  useEffect(() => {
    if (!ref || !ref.current) return;
    const element = ref.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
}

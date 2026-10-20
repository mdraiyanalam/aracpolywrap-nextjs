"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Stop observing after the first intersection. Default `true`. */
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

/** Tracks whether an element is in the viewport using IntersectionObserver. */
export function useInView<T extends Element>({
  once = true,
  threshold = 0,
  rootMargin = "0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView };
}

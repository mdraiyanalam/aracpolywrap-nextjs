"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

/**
 * Floating "Back to top" button, shown once the visitor has scrolled past one screen.
 * Keyboard users get focus moved to the top of the page (the skip link) as well.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (event: MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    // `detail === 0` means the click came from the keyboard (Enter/Space).
    if (event.detail === 0) {
      document.querySelector<HTMLElement>("a[href='#main']")?.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      inert={!visible}
      className={cn(
        "fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full bg-brand-700 text-white shadow-lg ring-2 ring-white transition-all duration-300 hover:bg-accent-600 sm:right-6 sm:bottom-6 print:hidden",
        visible
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-4 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}

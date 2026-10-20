"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

interface CopyrightYearsProps {
  /** First year of publication. */
  since: number;
  /** Year the page was prerendered; used for the server HTML and during hydration. */
  renderedYear: number;
}

/**
 * Renders "2024" or "2024–2026". Static pages are built once, so the year is taken from the
 * build and then corrected in the browser after hydration — no server revalidation needed,
 * which keeps the page exportable to static hosts such as GitHub Pages.
 */
export function CopyrightYears({ since, renderedYear }: CopyrightYearsProps) {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => renderedYear,
  );
  return <>{year > since ? `${since}–${year}` : since}</>;
}

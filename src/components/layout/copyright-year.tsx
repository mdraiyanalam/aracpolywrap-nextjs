import { cacheLife } from "next/cache";

/**
 * Renders "2024" or "2024–2026". The current year is a non-deterministic value, so with
 * Cache Components it must be cached explicitly; it is refreshed daily.
 */
export async function CopyrightYears({ since }: { since: number }) {
  "use cache";
  cacheLife("days");

  const current = new Date().getFullYear();
  return <>{current > since ? `${since}–${current}` : since}</>;
}

/**
 * Public base URL of the site, used for canonical URLs, Open Graph, the sitemap and JSON-LD.
 * Set `NEXT_PUBLIC_SITE_URL` per environment (see `.env.example`).
 */
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aracpolywrap.com");

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

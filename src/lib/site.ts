/**
 * Public URL of the site, including any sub-path, e.g. `https://aracpolywrap.com` or
 * `https://mdraiyanalam.github.io/aracpolywrap` on GitHub Pages. Used for canonical URLs,
 * Open Graph, the sitemap and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` per environment.
 */
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aracpolywrap.com");

/**
 * Sub-path the app is served from ("" at a domain root, "/aracpolywrap" on a GitHub Pages
 * project site). Must match `basePath` in next.config.ts.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** `true` for the static export (GitHub Pages), which uses trailing slashes on page URLs. */
export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/** Adds the trailing slash used by the static export to page routes (not files or anchors). */
function withTrailingSlash(path: string): string {
  if (!isStaticExport || path.endsWith("/") || path.includes("#")) return path;
  const lastSegment = path.split("/").pop() ?? "";
  return lastSegment.includes(".") ? path : `${path}/`;
}

/** Absolute URL for an app route, e.g. `absoluteUrl("/catalogue")`. Keeps the site's sub-path. */
export function absoluteUrl(path = "/"): string {
  const base = siteUrl.href.replace(/\/$/, "");
  return `${base}${withTrailingSlash(path.startsWith("/") ? path : `/${path}`)}`;
}

/**
 * Absolute URL for a built asset whose `src` already contains the base path
 * (for example a statically imported image's `src`).
 */
export function assetUrl(src: string): string {
  return new URL(src, siteUrl.origin).toString();
}

/** Prefixes a `public/` file path with the base path, for places Next.js does not do it. */
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}

/** Site-relative URL of a page (base path + trailing-slash rule), for canonical/Open Graph URLs. */
export function pagePath(route: string): string {
  return withBasePath(withTrailingSlash(route));
}

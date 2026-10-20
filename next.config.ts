import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security";

const isDev = process.env.NODE_ENV === "development";

/**
 * Two build targets:
 * - default: `standalone` Node.js server (Docker, Vercel, any Node host) with security
 *   headers, image optimisation and daily revalidation;
 * - `STATIC_EXPORT=true`: plain HTML/CSS/JS in `out/` for static hosts such as GitHub Pages
 *   (see docs/guides/github-pages.md and ADR 0009).
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Cache Components stays off: every page is static, and in Next.js 16.4 it cannot be combined
  // with `output: "export"` for metadata routes (sitemap, robots, manifest). See ADR 0009.
  output: isStaticExport ? "export" : "standalone",
  ...(basePath ? { basePath } : {}),
  // Static hosts serve folders as /catalogue/ (catalogue/index.html). Matching that keeps
  // in-page links on the same URL, so they scroll instead of reloading.
  trailingSlash: isStaticExport,
  env: { NEXT_PUBLIC_STATIC_EXPORT: String(isStaticExport) },
  poweredByHeader: false,
  images: isStaticExport
    ? // Static hosts have no image optimiser; the source images are pre-optimised (APW-005).
      { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Static hosts cannot send headers; the static export uses a <meta> CSP instead.
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders({ isDev }) }];
        },
      }),
};

export default nextConfig;

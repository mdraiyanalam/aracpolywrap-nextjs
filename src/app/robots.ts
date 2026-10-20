import type { MetadataRoute } from "next";

import { absoluteUrl, siteUrl } from "@/lib/site";

// Prerender at build time — required by the static export for GitHub Pages.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl.origin,
  };
}

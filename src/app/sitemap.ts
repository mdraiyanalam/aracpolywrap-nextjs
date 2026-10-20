import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

// Prerender at build time — required by the static export for GitHub Pages.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/catalogue"), changeFrequency: "monthly", priority: 0.8 },
  ];
}

import type { MetadataRoute } from "next";

import { company } from "@/content/company";
import { withBasePath } from "@/lib/site";

// Prerender at build time — required by the static export for GitHub Pages.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description: company.description,
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2e3192",
    icons: [
      { src: withBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: withBasePath("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: withBasePath("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
      {
        src: withBasePath("/icons/maskable-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

import type { CompanyValue } from "./types";

/** "About us" copy, derived from the approved product descriptions. PO to review. */
export const about = {
  badge: { label: "Offices in", value: "Banani & Gulshan, Dhaka" },
  paragraphs: [
    "ARAC Polywrap Limited is a Bangladeshi manufacturer of polyethylene films for industrial, consumer and agricultural markets. From stretch and shrink film to lamination, protection and custom-made films, our packaging protects products from the factory floor to the final customer.",
    "Every film is made from premium raw materials and masterbatches on state-of-the-art production lines, using a multi-layer co-extrusion process that delivers consistent, industrial-grade quality.",
  ],
  values: [
    {
      icon: "quality",
      title: "Consistent quality",
      description: "Premium raw materials and controlled production in every roll.",
    },
    {
      icon: "specification",
      title: "Built to specification",
      description: "Films manufactured to ASTM specifications and your requirements.",
    },
    {
      icon: "efficiency",
      title: "Lower cost per load",
      description: "Down-gauging technology that does more with less film.",
    },
    {
      icon: "sustainability",
      title: "Greener options",
      description: "Biodegradable agricultural films and thinner, lighter packaging.",
    },
  ] satisfies CompanyValue[],
} as const;

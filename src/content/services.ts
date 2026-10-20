import { stats } from "./stats";
import type { Service } from "./types";

const countries = stats.find((s) => s.icon === "countries");

/** Capabilities beyond standard rolls, derived from the approved product copy. */
export const services: Service[] = [
  {
    icon: "engineering",
    title: "Custom film engineering",
    description:
      "Films formulated to ASTM specifications using a variety of PE resins and specialty masterbatches.",
  },
  {
    icon: "coextrusion",
    title: "Multi-layer co-extrusion",
    description:
      "Our multi-layer co-extrusion process consistently produces high-quality, industrial-grade films.",
  },
  {
    icon: "downgauging",
    title: "Down-gauging",
    description:
      "Innovative technologies let you move to thinner films while keeping load retention and strength.",
  },
  {
    icon: "treatment",
    title: "Additives and surface treatment",
    description:
      "Corona treatment, anti-fog, UV protection, anti-static and vapour corrosion inhibitors on request.",
  },
  {
    icon: "formats",
    title: "Flexible roll formats",
    description:
      "Machine, hand, table, mini and jumbo rolls, in a range of thicknesses and custom sizes.",
  },
  {
    icon: "export",
    title: "Export supply",
    description: `Packaging films supplied to customers in ${countries?.value ?? 12}+ countries.`,
  },
];

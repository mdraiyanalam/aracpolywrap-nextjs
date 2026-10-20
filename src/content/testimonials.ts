import type { ServiceLevel, Testimonial } from "./types";

/**
 * SAMPLE CONTENT. No client testimonials were available when the site was rebuilt.
 * Replace with approved quotes, remove `sample: true`, then delete the @placeholder markers
 * (backlog item APW-054).
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Consistent film quality from batch to batch. Our pallet-wrapping line runs with far fewer film breaks since we switched.", // @placeholder
    role: "Operations manager", // @placeholder
    organisation: "Beverage bottler", // @placeholder
    sample: true,
  },
  {
    quote:
      "The shrink film gives our multipacks a clean, glossy finish and holds tight all the way to the retailer.", // @placeholder
    role: "Packaging lead", // @placeholder
    organisation: "FMCG manufacturer", // @placeholder
    sample: true,
  },
  {
    quote:
      "Their mulch and greenhouse films have stood up well to the monsoon season, and the UV protection shows.", // @placeholder
    role: "Farm manager", // @placeholder
    organisation: "Agricultural cooperative", // @placeholder
    sample: true,
  },
];

/** SAMPLE FIGURES — replace with measured values before launch (APW-054). */
export const serviceLevelsAreSamples = true; // @placeholder

export const serviceLevels: ServiceLevel[] = [
  {
    label: "Customer satisfaction",
    value: 98, // @placeholder
    description: "Clients who would order from us again",
  },
  {
    label: "On-time delivery",
    value: 95, // @placeholder
    description: "Orders shipped on the agreed date",
  },
  {
    label: "Repeat business",
    value: 90, // @placeholder
    description: "Revenue from returning clients",
  },
  {
    label: "Quality pass rate",
    value: 99, // @placeholder
    description: "Rolls passing final inspection",
  },
];

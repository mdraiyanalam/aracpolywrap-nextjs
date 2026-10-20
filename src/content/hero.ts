import mulchField from "@/assets/images/hero/agricultural-mulch-field.jpg";
import factory from "@/assets/images/hero/factory.jpg";
import shrinkBottles from "@/assets/images/hero/shrink-wrapped-bottles.jpg";
import stretchRolls from "@/assets/images/hero/stretch-film-rolls.jpg";
import { sectionHref } from "./navigation";
import type { HeroSlide } from "./types";

/** Hero carousel slides. Copy is derived from the approved product descriptions. */
export const heroSlides: HeroSlide[] = [
  {
    id: "factory",
    eyebrow: "Made in Bangladesh",
    title: "Premium polyethylene films, engineered for performance",
    description:
      "State-of-the-art production lines and premium raw materials deliver consistent quality in every roll.",
    image: factory,
    imageAlt: "The ARAC Polywrap factory building under a blue sky",
    primaryAction: { label: "Explore products", href: sectionHref("products") },
    secondaryAction: { label: "Contact sales", href: sectionHref("contact") },
  },
  {
    id: "stretch-film",
    eyebrow: "Stretch film",
    title: "Superior load retention for every pallet",
    description:
      "Machine, hand, table, mini and jumbo rolls with excellent tear strength and maximum stretch.",
    image: stretchRolls,
    imageAlt: "Two rolls of stretch film on a deep blue background",
    primaryAction: { label: "View stretch film", href: sectionHref("stretch-film") },
    secondaryAction: { label: "Contact sales", href: sectionHref("contact") },
  },
  {
    id: "shrink-film",
    eyebrow: "Shrink film",
    title: "Crystal-clear shrink film that holds tight",
    description:
      "Exceptional optical properties, puncture resistance and superior sealing for bundling and sleeves.",
    image: shrinkBottles,
    imageAlt: "Blue-capped bottles bundled together in clear shrink film",
    primaryAction: { label: "View shrink film", href: sectionHref("shrink-film") },
    secondaryAction: { label: "Contact sales", href: sectionHref("contact") },
  },
  {
    id: "agricultural-film",
    eyebrow: "Agricultural film",
    title: "Films that help crops thrive",
    description:
      "Greenhouse, silage and mulch films with UV protection, weathering resistance and biodegradable options.",
    image: mulchField,
    imageAlt: "Aerial view of curved rows of black mulch film across a farm field",
    primaryAction: { label: "View agricultural film", href: sectionHref("agricultural-film") },
    secondaryAction: { label: "Contact sales", href: sectionHref("contact") },
  },
];

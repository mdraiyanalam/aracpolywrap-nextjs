import type { StaticImageData } from "next/image";

/** Anchor IDs of the home-page sections. Navigation and sections share these. */
export type SectionId =
  | "home"
  | "products"
  | "achievements"
  | "services"
  | "testimonials"
  | "about"
  | "contact"
  | "download";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  primaryAction: Link;
  secondaryAction?: Link;
}

export interface Product {
  /** Used as the anchor ID, e.g. `/#stretch-film`. */
  slug: string;
  name: string;
  image: StaticImageData;
  imageAlt: string;
  summary: string;
  details?: string[];
  featuresHeading?: string;
  features: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: "clients" | "countries" | "shipments";
}

export interface PostalAddress {
  label: string;
  streetAddress: string;
  locality: string;
  postalCode: string;
  country: string;
}

export interface Service {
  icon: "engineering" | "coextrusion" | "downgauging" | "treatment" | "formats" | "export";
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  role: string;
  organisation: string;
  /** `true` while the quote is illustrative; renders a visible "Sample" badge. */
  sample?: boolean;
}

export interface ServiceLevel {
  label: string;
  /** Percentage, 0–100. */
  value: number;
  description: string;
}

export interface CompanyValue {
  icon: "quality" | "specification" | "efficiency" | "sustainability";
  title: string;
  description: string;
}

export interface SocialProfile {
  network: "facebook";
  label: string;
  href: string;
}

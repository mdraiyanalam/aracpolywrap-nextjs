import type { NavItem, SectionId } from "./types";

/** Header and footer menu, in page order. Only list sections that exist on the home page. */
export const primaryNavigation: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "download", label: "Download" },
];

/** Absolute in-page link, so it also works from other routes such as `/catalogue`. */
export function sectionHref(id: SectionId | string): string {
  return `/#${id}`;
}

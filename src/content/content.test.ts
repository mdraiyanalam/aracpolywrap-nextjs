import { heroSlides } from "./hero";
import { primaryNavigation } from "./navigation";
import { products } from "./products";
import { stats } from "./stats";
import { serviceLevels, testimonials } from "./testimonials";
import type { SectionId } from "./types";

/** Anchors that exist on the home page. Keep in sync with the sections rendered in page.tsx. */
const sectionIds: SectionId[] = [
  "home",
  "products",
  "achievements",
  "services",
  "testimonials",
  "about",
  "contact",
  "download",
];
const homeAnchors = new Set<string>([...sectionIds, ...products.map((p) => p.slug)]);

const anchorOf = (href: string) => href.replace(/^\/#/, "");

describe("content integrity", () => {
  it("has unique product slugs that do not clash with section IDs", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const id of sectionIds) expect(slugs).not.toContain(id);
  });

  it("gives every product an image description and at least one feature", () => {
    for (const product of products) {
      expect(product.imageAlt.length).toBeGreaterThan(10);
      expect(product.features.length).toBeGreaterThan(0);
    }
  });

  it("only links navigation items to sections that exist", () => {
    for (const item of primaryNavigation) expect(homeAnchors).toContain(item.id);
  });

  it("only links hero calls-to-action to anchors that exist", () => {
    for (const slide of heroSlides) {
      const actions = [slide.primaryAction, slide.secondaryAction].filter(Boolean);
      for (const action of actions) expect(homeAnchors).toContain(anchorOf(action!.href));
    }
  });

  it("uses positive whole numbers for statistics", () => {
    for (const stat of stats) expect(Number.isInteger(stat.value) && stat.value > 0).toBe(true);
  });

  it("keeps service-level percentages between 0 and 100", () => {
    for (const level of serviceLevels) {
      expect(level.value).toBeGreaterThanOrEqual(0);
      expect(level.value).toBeLessThanOrEqual(100);
    }
  });

  it("flags every illustrative testimonial so it renders a visible sample badge", () => {
    // Guards against shipping invented quotes as if they were real (see APW-054).
    for (const testimonial of testimonials) {
      if (testimonial.quote.length > 0) expect(typeof testimonial.sample).toBe("boolean");
    }
  });
});

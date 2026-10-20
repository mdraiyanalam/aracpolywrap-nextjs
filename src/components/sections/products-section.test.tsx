import { render, screen, within } from "@testing-library/react";
import { products } from "@/content/products";
import { ProductsSection } from "./products-section";

describe("ProductsSection", () => {
  it("is a landmark labelled by its heading, anchored at #products", () => {
    render(<ProductsSection />);
    const section = screen.getByRole("region", { name: "Our products" });
    expect(section).toHaveAttribute("id", "products");
  });

  it("renders every product with an anchor, heading, image and feature list", () => {
    render(<ProductsSection />);

    for (const product of products) {
      const heading = screen.getByRole("heading", { level: 3, name: product.name });
      const item = heading.closest("li");
      expect(item).toHaveAttribute("id", product.slug);
      expect(within(item!).getByRole("img", { name: product.imageAlt })).toBeInTheDocument();
      for (const feature of product.features) {
        expect(within(item!).getByText(feature)).toBeInTheDocument();
      }
    }
  });

  it("offers a shortcut link to each product", () => {
    render(<ProductsSection />);
    const shortcuts = screen.getByRole("navigation", { name: "Product shortcuts" });

    for (const product of products) {
      expect(within(shortcuts).getByRole("link", { name: product.name })).toHaveAttribute(
        "href",
        `#${product.slug}`,
      );
    }
  });
});

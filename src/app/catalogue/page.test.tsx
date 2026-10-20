import { fireEvent, render, screen, within } from "@testing-library/react";
import { products } from "@/content/products";
import type { ResolvingMetadata } from "next";
import CataloguePage, { generateMetadata } from "./page";

describe("Catalogue page", () => {
  it("has its own title and keeps the inherited share image", async () => {
    const parent = Promise.resolve({
      openGraph: { siteName: "ARAC Polywrap Limited", images: [{ url: "/og.jpg" }] },
    }) as unknown as ResolvingMetadata;
    const metadata = await generateMetadata({} as PageProps<"/catalogue">, parent);

    expect(metadata.title).toBe("Product catalogue");
    expect(metadata.openGraph).toMatchObject({ images: [{ url: "/og.jpg" }] });
  });

  it("lists every product with its features", () => {
    render(<CataloguePage />);
    for (const product of products) {
      const heading = screen.getByRole("heading", { level: 2, name: product.name });
      const item = heading.closest("li")!;
      for (const feature of product.features) {
        expect(within(item).getByText(feature)).toBeInTheDocument();
      }
    }
  });

  it("opens the print dialog so visitors can save a PDF", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
    render(<CataloguePage />);
    fireEvent.click(screen.getByRole("button", { name: "Print or save as PDF" }));
    expect(print).toHaveBeenCalledOnce();
  });

  it("links back to the home page", () => {
    render(<CataloguePage />);
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});

import { render, screen } from "@testing-library/react";
import { company } from "@/content/company";
import { ContactSection } from "./contact-section";

describe("ContactSection", () => {
  it("is anchored at #contact", () => {
    render(<ContactSection />);
    expect(screen.getByRole("region", { name: "Contact us" })).toHaveAttribute("id", "contact");
  });

  it("shows both office addresses", () => {
    render(<ContactSection />);
    for (const address of company.addresses) {
      expect(screen.getByRole("heading", { name: address.label })).toBeInTheDocument();
      expect(screen.getByText(address.streetAddress, { exact: false })).toBeInTheDocument();
    }
  });

  it("offers a click-to-call phone link and a mailto link", () => {
    render(<ContactSection />);
    expect(screen.getByRole("link", { name: company.contact.phone.display })).toHaveAttribute(
      "href",
      company.contact.phone.href,
    );
    expect(screen.getByRole("link", { name: company.contact.email })).toHaveAttribute(
      "href",
      `mailto:${company.contact.email}`,
    );
  });

  it("embeds a titled, lazy-loaded map", () => {
    render(<ContactSection />);
    const map = screen.getByTitle(company.map.title);
    expect(map.tagName).toBe("IFRAME");
    expect(map).toHaveAttribute("loading", "lazy");
  });
});

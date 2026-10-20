import { company } from "@/content/company";
import { products } from "@/content/products";
import { organizationJsonLd, serializeJsonLd } from "./structured-data";

describe("organizationJsonLd", () => {
  const data = organizationJsonLd("/logo.png");

  it("describes the organisation with absolute URLs", () => {
    expect(data["@type"]).toBe("Organization");
    expect(data.name).toBe(company.name);
    expect(data.url).toMatch(/^https:\/\//);
    expect(data.logo).toMatch(/^https:\/\/.+\/logo\.png$/);
  });

  it("lists both offices as postal addresses", () => {
    expect(data.address).toHaveLength(company.addresses.length);
    expect(data.address[0]).toMatchObject({ "@type": "PostalAddress", addressCountry: "BD" });
  });

  it("lists every product in the offer catalogue", () => {
    expect(data.hasOfferCatalog.itemListElement).toHaveLength(products.length);
  });

  it("omits placeholder phone numbers and e-mail addresses", () => {
    // The current contact details are placeholders (APW-054).
    expect(data).not.toHaveProperty("telephone");
    expect(data).not.toHaveProperty("email");
  });
});

describe("serializeJsonLd", () => {
  it("escapes '<' so the payload cannot close the script tag", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});

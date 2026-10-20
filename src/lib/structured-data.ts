import { company } from "@/content/company";
import { products } from "@/content/products";
import { absoluteUrl } from "./site";

/** Placeholder contact values must never reach search engines. */
const isRealPhone = (phone: string) => /^\+?\d[\d\s-]{6,}$/.test(phone);
const isRealEmail = (email: string) =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && !email.endsWith("@example.com");

/** schema.org `Organization` for the home page. https://schema.org/Organization */
export function organizationJsonLd(logoPath: string) {
  const { phone, email } = company.contact;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(logoPath),
    description: company.description,
    address: company.addresses.map((address) => ({
      "@type": "PostalAddress",
      name: address.label,
      streetAddress: address.streetAddress,
      addressLocality: address.locality,
      postalCode: address.postalCode,
      addressCountry: "BD",
    })),
    ...(isRealPhone(phone.display) ? { telephone: phone.display } : {}),
    ...(isRealEmail(email) ? { email } : {}),
    sameAs: company.social.map((profile) => profile.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Polyethylene films",
      url: absoluteUrl("/catalogue"),
      itemListElement: products.map((product) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: product.name,
          description: product.summary,
          url: absoluteUrl(`/#${product.slug}`),
        },
      })),
    },
  };
}

/** Serialises JSON-LD safely for an inline `<script>` (escapes `<` to prevent XSS). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

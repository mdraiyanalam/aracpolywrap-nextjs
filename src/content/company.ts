import type { PostalAddress, SocialProfile } from "./types";

/**
 * Company facts used across the site (header, contact section, footer, SEO).
 *
 * Lines marked `@placeholder` are not yet supplied by the business. They are listed by
 * `npm run content:check` and must be replaced before launch (backlog item APW-054).
 */
export const company = {
  name: "ARAC Polywrap Limited",
  shortName: "ARAC Polywrap",
  tagline: "Premium polyethylene films, made in Bangladesh",
  description:
    "ARAC Polywrap Limited manufactures stretch film, shrink film, FMCG lamination film, agricultural film, protection film and custom-made polyethylene films in Bangladesh.",
  /** Year the website was first published (legacy footer: "©2024"). */
  copyrightStartYear: 2024,

  contact: {
    phone: {
      display: "+880 XXXX-XXXXXX", // @placeholder — official sales number
      href: "tel:+880", // @placeholder — official sales number in E.164 format
    },
    email: "info@example.com", // @placeholder — official sales e-mail address
  },

  addresses: [
    {
      label: "Head office",
      streetAddress: "House 50 (13th floor), Road 11, Block C, Banani",
      locality: "Dhaka",
      postalCode: "1213",
      country: "Bangladesh",
    },
    {
      label: "Corporate office",
      streetAddress: "House 16 (1st floor), Road 127, Gulshan-1",
      locality: "Dhaka",
      postalCode: "1212",
      country: "Bangladesh",
    },
  ] satisfies PostalAddress[],

  map: {
    title: "Map showing the location of ARAC Polywrap Limited",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.699060158806!2d90.4182548748085!3d24.287239667956147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37567057adf39b2d%3A0xa96eaae4c2af96b5!2sARAC%20Polywrap%20Limited!5e0!3m2!1sen!2sbd!4v1708185321676!5m2!1sen!2sbd",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=ARAC+Polywrap+Limited",
  },

  /**
   * Optional official PDF brochure, e.g. "/downloads/arac-polywrap-catalogue.pdf" in `public/`.
   * When set, the Download section offers it next to the printable catalogue page.
   */
  brochureUrl: null as string | null,

  social: [
    {
      network: "facebook",
      label: "ARAC Polywrap on Facebook",
      href: "https://www.facebook.com/aracpoly",
    },
  ] satisfies SocialProfile[],

  credit: {
    name: "Md Raiyan Alam",
    href: "https://www.linkedin.com/in/mdraiyanalam/",
  },
} as const;

export function formatAddress(address: PostalAddress): string {
  return `${address.streetAddress}, ${address.locality}-${address.postalCode}, ${address.country}`;
}

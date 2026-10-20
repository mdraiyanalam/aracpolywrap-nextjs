import agriculturalFilm from "@/assets/images/products/agricultural-film.jpg";
import customFilms from "@/assets/images/products/custom-films.jpg";
import fmcgLaminationFilm from "@/assets/images/products/fmcg-lamination-film.jpg";
import protectionFilm from "@/assets/images/products/protection-film.jpg";
import shrinkFilm from "@/assets/images/products/shrink-film.jpg";
import stretchFilm from "@/assets/images/products/stretch-film.jpg";
import type { Product } from "./types";

/**
 * The product range. Copy comes from the legacy site (`productsection.js`), lightly
 * copy-edited for capitalisation and punctuation. Order here is the order on the page.
 */
export const products: Product[] = [
  {
    slug: "stretch-film",
    name: "Stretch film",
    image: stretchFilm,
    imageAlt: "Rolls of clear stretch film, one partly unwound",
    summary:
      "Our stretch films are made with premium-quality raw materials and masterbatches. State-of-the-art production lines ensure consistent quality and performance.",
    featuresHeading: "The unique features of our stretch films include:",
    features: [
      "Superior pallet load retention in A/B/C load categories",
      "Excellent tear strength and mechanical properties",
      "Maximum stretch properties",
      "Innovative technologies that enable down-gauging to thinner films",
      "Machine, hand, table, mini and jumbo rolls, plus custom sizes",
    ],
  },
  {
    slug: "shrink-film",
    name: "Shrink film",
    image: shrinkFilm,
    imageAlt: "Rows of water bottles bundled tightly in clear shrink film",
    summary:
      "ARAC Polywrap produces an innovative range of shrink film products, which can be multi-purpose or specialised to meet the needs of the industrial and consumer markets.",
    features: [
      "Excellent tensile strength and puncture resistance",
      "Exceptional optical properties",
      "Wide range of shrink percentages",
      "Variable thickness for heavy and light duty",
      "Anti-fog and other additives",
      "Corona treatment",
      "Bundling shrink films",
      "Shrink sleeves",
      "Superior sealing performance",
      "Highest strength-to-weight ratio",
    ],
  },
  {
    slug: "fmcg-lamination-film",
    name: "FMCG lamination film",
    image: fmcgLaminationFilm,
    imageAlt: "Large rolls of transparent lamination film",
    summary:
      "FMCG markets have expanded worldwide, and with them the need for premium-grade process films has increased exponentially.",
    features: [
      "Multi-layered lamination films formulated and manufactured in an advanced process for perfect sealability on form-fill-seal (FFS) lines — reducing leakage and contamination and increasing profitability.",
      "A wide variety of lamination films in various thicknesses and sizes.",
    ],
  },
  {
    slug: "agricultural-film",
    name: "Agricultural film",
    image: agriculturalFilm,
    imageAlt: "Rows of young lettuce growing on mulch film inside a greenhouse",
    summary:
      "The use of modern technology in traditional farming is on the rise. Agricultural films enhance crop yield and reduce irrigation costs. Our agricultural product line helps reduce weed growth, control humidity and protect roots.",
    featuresHeading: "ARAC Polywrap's agricultural film line offers:",
    features: [
      "Greenhouse film",
      "Silage film",
      "Mulch film",
      "UV protection",
      "Weathering resistance",
      "Opacity variance",
      "Biodegradability",
    ],
  },
  {
    slug: "protection-film",
    name: "Protection film",
    image: protectionFilm,
    imageAlt: "A hand peeling clear protection film from a polished surface",
    summary: "ARAC Polywrap offers specialised cling films for protecting surfaces.",
    features: [
      "Protects furniture, glass, metal and plastics.",
      "Vapour corrosion inhibitors can be added to protect valuable metal goods that are vulnerable to rust and oxidation.",
      "Tough, scratch-resistant films protect surfaces and paintwork during transport and manufacturing.",
    ],
  },
  {
    slug: "custom-films",
    name: "Custom-made films",
    image: customFilms,
    imageAlt: "Rolls of coloured films in blue, green, red, black and white",
    summary:
      "ARAC Polywrap offers a wide range of custom products that can be manufactured to ASTM specifications using a variety of PE and specialty masterbatches.",
    details: [
      "Our unique multi-layer co-extrusion process allows us to consistently produce high-quality, industrial-grade films.",
    ],
    featuresHeading: "Key features of our films can include:",
    features: [
      "Barrier properties",
      "Unique colours",
      "Anti-static",
      "High gloss and clarity",
      "Various sizes and thicknesses",
      "Corona treatment",
    ],
  },
];

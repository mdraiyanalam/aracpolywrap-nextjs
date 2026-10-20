# Content inventory

Where every piece of business content lives, where it came from, and whether it is approved for
launch. `src/content/` is the **single source of truth** for site copy. Components never hard-code
business content.

Status: **Approved** (from the legacy site, written by the client) · **Derived** (rewritten from
approved copy; PO to review) · **Placeholder** (must be replaced before launch; blocks APW-054).

| Content                                               | File                          | Source                                                                                | Status      |
| ----------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------- | ----------- |
| Product names, descriptions and features (6)          | `src/content/products.ts`     | Legacy `productsection.js`                                                            | Approved    |
| Head-office and corporate-office addresses            | `src/content/company.ts`      | Legacy `contactus.js`                                                                 | Approved    |
| Google Maps embed                                     | `src/content/company.ts`      | Legacy `contactus.js`                                                                 | Approved    |
| Facebook page                                         | `src/content/company.ts`      | Legacy `footers.js`                                                                   | Approved    |
| Statistics (100 clients, 12 countries, 287 shipments) | `src/content/stats.ts`        | Legacy `countdown.js`                                                                 | Approved    |
| Designer credit (footer)                              | `src/content/company.ts`      | Legacy `footers.js`                                                                   | Approved    |
| Hero slide headlines and descriptions                 | `src/content/hero.ts`         | Rewritten from product copy                                                           | Derived     |
| Company description and tagline                       | `src/content/company.ts`      | Rewritten from product copy                                                           | Derived     |
| Section headings and introductions                    | `src/content/sections.ts`     | Rewritten from product copy                                                           | Derived     |
| Services (6 capabilities)                             | `src/content/services.ts`     | Rewritten from product copy                                                           | Derived     |
| About us copy and company values                      | `src/content/about.ts`        | Rewritten from product copy                                                           | Derived     |
| Catalogue and download copy                           | `src/content/sections.ts`     | New                                                                                   | Derived     |
| Testimonial quotes and attributions (3)               | `src/content/testimonials.ts` | Not available — illustrative samples, shown with a visible "Sample testimonial" badge | Placeholder |
| Service-level percentages (4)                         | `src/content/testimonials.ts` | Not available — illustrative figures, shown with an "Illustrative figures" badge      | Placeholder |
| Official PDF brochure (optional)                      | `company.brochureUrl`         | Not available — the printable `/catalogue` page is used instead                       | Optional    |
| Phone number                                          | `src/content/company.ts`      | Not available                                                                         | Placeholder |
| E-mail address                                        | `src/content/company.ts`      | Not available                                                                         | Placeholder |

Rows are added as sections are built. `npm run content:check` (APW-045) lists any placeholders that
remain.

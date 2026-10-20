# Migration from the Create React App prototype

The original prototype is preserved in git history (commits before tag `v0.1.0`, branch `master`
at `f46c7ef`). This page maps it to the rebuilt code and records what changed and why.

## File mapping

| Legacy (CRA)                                                              | New (Next.js)                                                                              |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `public/index.html` (Bootstrap 4 CDN, jQuery)                             | `src/app/layout.tsx` (metadata API, `next/font`), no CDN scripts                           |
| `src/index.js`, `src/App.js`                                              | `src/app/layout.tsx`, `src/app/page.tsx`                                                   |
| `src/components/NavBar.js` (menu **and** carousel **and** products)       | `src/components/layout/site-header.tsx` (menu only)                                        |
| `src/components/carouselData.js` (react-bootstrap)                        | `src/components/sections/hero-carousel.tsx` + `src/content/hero.ts`                        |
| `src/components/productsection.js` (copy in JSX)                          | `src/components/sections/products-section.tsx` + `src/content/products.ts`                 |
| `src/components/countdown.js` + `NumScroller.js`                          | `src/components/sections/stats-section.tsx` + `ui/count-up.tsx` + `src/content/stats.ts`   |
| `src/components/contactus.js`                                             | `src/components/sections/contact-section.tsx` + `src/content/company.ts`                   |
| `src/components/footers.js` (FontAwesome)                                 | `src/components/layout/site-footer.tsx` (lucide + inline brand SVG)                        |
| Empty `#Services`, `#Testimonials`, `#AboutUs`, `#Download`               | Services, Testimonials, About and Download sections + `/catalogue`                         |
| `#TeamMembers` menu link (no section)                                     | Removed; backlog item APW-028 (awaiting content)                                           |
| `src/components/config,js` (unused)                                       | Removed                                                                                    |
| `src/styles/*.css`, `bootstrap/`, `animate.min.css`, `fontawesome.css`    | Tailwind CSS 4 tokens in `src/app/globals.css`                                             |
| `src/components/images/**`                                                | `src/assets/images/**` (renamed, sRGB, resized, metadata stripped)                         |
| `public/manifest.json`, `favicon.ico`, `logo192/512.png` (React defaults) | `src/app/manifest.ts`, `icon.svg`, `apple-icon.png`, `public/icons/*` (brand)              |
| `src/App.test.js`, `setupTests.js`                                        | Vitest suite in `src/**`, Playwright suite in `e2e/`                                       |
| `work_left.txt`                                                           | [Backlog traceability table](../agile/product-backlog.md#legacy-work_lefttxt-traceability) |

## Defects fixed during migration

| Legacy defect                                                                                 | Fix                                                                                           |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Menu anchors did not reach content (sections empty, duplicated IDs, content outside sections) | One section per ID, rendered once; absolute `/#id` links; scroll offset for the sticky header |
| `class` instead of `className` throughout (React warnings)                                    | TypeScript JSX; ESLint                                                                        |
| `prop-types` imported but not a dependency                                                    | TypeScript types instead                                                                      |
| Three CSS frameworks loaded together; template classes without stylesheet                     | One styling system (Tailwind)                                                                 |
| jQuery and Bootstrap JS loaded but unused                                                     | Removed                                                                                       |
| `alt="Description"` / missing alt text; untitled map iframe                                   | Descriptive alt text; titled iframe; axe in CI                                                |
| Fixed pixel image sizes (445 px) overflowing on phones                                        | Responsive `next/image` with `sizes`                                                          |
| 600 × 450 px map iframe overflowing on phones                                                 | Responsive container                                                                          |
| CMYK JPEGs (inconsistent colours), GPS data in photo, 6 MB of images                          | sRGB, metadata stripped, 1.1 MB total, AVIF/WebP delivery                                     |
| Skype invite link (Skype retired May 2025)                                                    | Removed                                                                                       |
| Mixed CRLF/LF line endings                                                                    | `.gitattributes` + `.editorconfig`                                                            |

## Dependencies

| Removed                                                           | Replaced by                             |
| ----------------------------------------------------------------- | --------------------------------------- |
| `react-scripts` 5                                                 | `next` 16                               |
| `bootstrap`, `react-bootstrap`, vendored Bootstrap, `animate.css` | `tailwindcss` 4                         |
| `@fortawesome/*`                                                  | `lucide-react` + inline brand SVG       |
| `web-vitals`                                                      | Lighthouse in the release process       |
| `@testing-library/jest-dom` 5 + Jest (via CRA)                    | Vitest 5 + Testing Library + Playwright |

## Behaviour changes worth knowing

- Menu labels shortened: "About Us" → "About", "Contact Us" → "Contact", "Product" → "Products".
- Contact details and copy now come from `src/content/`; see the
  [content editing guide](../guides/content-editing.md).
- The footer credit "Designed by Md Raiyan Alam" is kept; the copyright line now shows a year range.

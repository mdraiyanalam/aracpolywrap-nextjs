# Product backlog

Ordered by priority within each epic. Story points use the scale in the
[process guide](./README.md#estimation). Status values: **Done**, **In progress**, **Ready**,
**Needs refinement**, **Blocked**.

## Epics

| ID  | Epic                  | Goal                                                |
| --- | --------------------- | --------------------------------------------------- |
| E1  | Platform foundation   | A modern, tested, continuously integrated code base |
| E2  | Navigation and layout | Visitors can always find their way around the page  |
| E3  | Content sections      | Every section the legacy site promised, finished    |
| E4  | Production readiness  | Search-friendly, accessible, secure and deployable  |
| E5  | Future enhancements   | Valuable, but not needed for v1.0                   |

## Summary

| ID      | Story                                                 | Epic | MoSCoW | Pts | Sprint | Status                                  |
| ------- | ----------------------------------------------------- | ---- | ------ | --: | ------ | --------------------------------------- |
| APW-001 | Scaffold Next.js App Router project                   | E1   | Must   |   3 | 0      | Done                                    |
| APW-002 | Code-quality tooling and commit conventions           | E1   | Must   |   2 | 0      | Done                                    |
| APW-003 | Unit and end-to-end test harness                      | E1   | Must   |   3 | 0      | Done                                    |
| APW-004 | Continuous integration and repository templates       | E1   | Must   |   2 | 0      | Done                                    |
| APW-005 | Migrate and optimise legacy image assets              | E1   | Must   |   2 | 0      | Done                                    |
| APW-006 | Agile artefacts: vision, backlog, DoR, DoD            | E1   | Must   |   1 | 0      | Done                                    |
| APW-010 | Brand colour scheme and typography                    | E2   | Must   |   3 | 1      | Done                                    |
| APW-011 | Sticky header with working section navigation         | E2   | Must   |   3 | 1      | Done                                    |
| APW-013 | Accessible mobile navigation menu                     | E2   | Must   |   3 | 1      | Done                                    |
| APW-015 | Footer with structured links and social icons         | E2   | Must   |   2 | 1      | Done                                    |
| APW-020 | Hero carousel                                         | E3   | Must   |   5 | 1      | Done                                    |
| APW-021 | Products showcase with decorated layout               | E3   | Must   |   5 | 1      | Done                                    |
| APW-022 | Animated achievement counters                         | E3   | Should |   2 | 1      | Done                                    |
| APW-023 | Contact section with phone, e-mail, addresses and map | E3   | Must   |   3 | 1      | Done                                    |
| APW-012 | Highlight the active section in the navigation        | E2   | Should |   2 | 2      | Done                                    |
| APW-014 | Back-to-top button                                    | E2   | Should |   1 | 2      | Done                                    |
| APW-024 | Services section                                      | E3   | Should |   3 | 2      | Done                                    |
| APW-025 | Testimonials with circular progress indicators        | E3   | Should |   5 | 2      | Done                                    |
| APW-026 | About us section                                      | E3   | Should |   2 | 2      | Done                                    |
| APW-027 | Downloadable product catalogue                        | E3   | Should |   5 | 2      | Done                                    |
| APW-040 | SEO: metadata, Open Graph, sitemap, robots, JSON-LD   | E4   | Must   |   3 | 3      | Done                                    |
| APW-041 | Accessibility audit and automated axe checks          | E4   | Must   |   3 | 3      | Done                                    |
| APW-042 | HTTP security headers and Content Security Policy     | E4   | Must   |   2 | 3      | Done                                    |
| APW-043 | Production container image                            | E4   | Should |   3 | 3      | Done                                    |
| APW-044 | Project documentation set                             | E4   | Must   |   5 | 3      | Done                                    |
| APW-045 | Content-readiness release gate                        | E4   | Should |   1 | 3      | Done                                    |
| APW-046 | Meet the mobile performance budget (Lighthouse ≥ 90)  | E4   | Must   |   2 | 3      | Done                                    |
| APW-028 | Team members section                                  | E3   | Won't  |   3 | —      | Blocked — awaiting team bios and photos |
| APW-054 | Replace placeholder content with approved copy        | E4   | Must   |   2 | —      | Blocked — awaiting Product Owner        |
| APW-055 | Vector logo and licensed photography                  | E4   | Must   |   2 | —      | Blocked — awaiting Product Owner        |
| APW-050 | Enquiry form with server-side delivery                | E5   | Could  |   5 | —      | Needs refinement                        |
| APW-051 | Bangla (bn) localisation                              | E5   | Could  |   8 | —      | Needs refinement                        |
| APW-052 | Headless CMS for content editing                      | E5   | Could  |   8 | —      | Needs refinement                        |
| APW-053 | Privacy-friendly analytics with consent               | E5   | Could  |   3 | —      | Needs refinement                        |
| APW-056 | Individual product detail pages                       | E5   | Could  |   5 | —      | Needs refinement                        |

## Legacy `work_left.txt` traceability

| Legacy item                                           | Resolved by                      |
| ----------------------------------------------------- | -------------------------------- |
| "section calling doesn't work"                        | APW-011                          |
| "color scheming"                                      | APW-010                          |
| "Our Product section is not well decorated…"          | APW-021                          |
| "no circular progress bar in the testimonial section" | APW-025                          |
| "no phone number in contact-us section"               | APW-023 (number itself: APW-054) |
| "there is no back to top section"                     | APW-014                          |
| "Social-Link of footer is not good"                   | APW-015                          |
| "clean the code"                                      | APW-001 – APW-004                |

---

## Story details

### E1 — Platform foundation

#### APW-001 · Scaffold Next.js App Router project

_As a developer, I want a modern, typed Next.js code base, so that the site is fast and maintainable._

- **Given** a fresh clone, **when** I run `npm ci && npm run dev`, **then** the site starts on port 3000.
- **Given** the code base, **then** TypeScript `strict` mode is on and there is no Create React App, Bootstrap or jQuery code left.
- **Given** `npm run build`, **then** every route is pre-rendered as static content.

#### APW-002 · Code-quality tooling and commit conventions

_As a developer, I want automated linting and formatting, so that reviews focus on behaviour rather than style._

- **Given** staged files, **when** I commit, **then** ESLint and Prettier run on them (husky + lint-staged).
- **Given** a commit message that is not a Conventional Commit, **then** the commit is rejected (commitlint).
- **Given** any editor, **then** `.editorconfig` enforces LF line endings and 2-space indentation.

#### APW-003 · Unit and end-to-end test harness

_As a developer, I want fast unit tests and real-browser tests, so that regressions are caught before release._

- **Given** `npm test`, **then** Vitest runs component tests in jsdom.
- **Given** `npm run test:e2e`, **then** Playwright builds the app and tests it in desktop and mobile Chromium.

#### APW-004 · Continuous integration and repository templates

_As a maintainer, I want every pull request checked automatically, so that `master` is always releasable._

- **Given** a pull request, **then** GitHub Actions runs lint, typecheck, format check, unit tests, build and E2E tests.
- **Given** a new issue, **then** user-story and bug templates are offered; the PR template contains the DoD checklist.
- **Given** a week has passed, **then** Dependabot proposes grouped dependency updates.

#### APW-005 · Migrate and optimise legacy image assets

_As a visitor on a mobile connection, I want images to load quickly, so that the site feels fast._

- **Given** the legacy images, **then** they are renamed descriptively, converted from CMYK to sRGB, resized to at most 2400 px wide and stripped of EXIF metadata (including GPS coordinates).
- **Given** third-party copyright metadata in the originals, **then** it is recorded in the asset register before being stripped.

#### APW-006 · Agile artefacts

_As the Product Owner, I want a visible vision and backlog, so that I can steer priorities._

- **Then** the vision, backlog, Definition of Ready and Definition of Done exist under `docs/agile/`.

### E2 — Navigation and layout

#### APW-010 · Brand colour scheme and typography

_As the Product Owner, I want the site to use our brand colours, so that it is recognisably ARAC Polywrap._

- **Given** the logo colours (red `#ED1C24`, navy `#2E3192`), **then** they are defined once as design tokens and used throughout.
- **Then** every text/background pair meets WCAG AA contrast (4.5:1 for body text).
- **Then** headings and body text use self-hosted web fonts with no layout shift.

#### APW-011 · Sticky header with working section navigation

_As a visitor, I want the menu links to take me to the right section, so that I can jump straight to what I need._
(Legacy bug: "section calling doesn't work".)

- **Given** I am on the home page, **when** I click any menu item, **then** the matching section scrolls into view and is not hidden under the header.
- **Given** I scroll down, **then** the header stays visible at the top of the screen.
- **Given** I am on another page (e.g. the catalogue), **when** I click a menu item, **then** I land on that section of the home page.
- **Given** JavaScript is disabled, **then** the links still work (they are plain anchors).

#### APW-012 · Highlight the active section in the navigation

_As a visitor, I want to see where I am on the page, so that I keep my bearings on a long page._

- **Given** I scroll, **when** a section occupies the middle of the viewport, **then** its menu link is highlighted and marked `aria-current`.

#### APW-013 · Accessible mobile navigation menu

_As a mobile visitor, I want a compact menu, so that navigation does not take over the screen._

- **Given** a viewport under 1024 px, **then** the menu collapses behind a toggle button with `aria-expanded` and `aria-controls`.
- **When** I choose a link, press <kbd>Esc</kbd> or navigate, **then** the menu closes and focus returns sensibly.

#### APW-014 · Back-to-top button

_As a visitor at the bottom of a long page, I want a quick way back up, so that I don't have to scroll._

- **Given** I have scrolled more than one screen height, **then** a "Back to top" button appears.
- **When** I activate it, **then** the page scrolls to the top (instantly if I prefer reduced motion); if I used the keyboard, focus moves to the first element of the page (the skip link).

#### APW-015 · Footer with structured links and social icons

_As a visitor, I want a clear footer, so that I can find contact details and social profiles from anywhere._
(Legacy item: "Social-Link of footer is not good".)

- **Then** the footer shows company summary, quick links, product links, contact details and the copyright line with designer credit.
- **Then** social links are icon buttons with accessible names, open in a new tab and use `rel="noopener noreferrer"`.
- **Then** the dead Skype invite link is removed (Microsoft retired Skype in May 2025).

### E3 — Content sections

#### APW-020 · Hero carousel

_As a first-time visitor, I want an engaging introduction, so that I immediately understand what ARAC makes._

- **Then** four slides show the factory, stretch film, shrink film and agricultural film, each with a headline and calls to action.
- **Then** slides advance automatically every 6 s and can be paused (WCAG 2.2.2), and autoplay is off when reduced motion is preferred.
- **Then** previous/next buttons and slide indicators work with mouse, touch (swipe) and keyboard.
- **Then** the first slide image is preloaded as the LCP element.

#### APW-021 · Products showcase with decorated layout

_As a buyer, I want each product clearly presented, so that I can compare the range quickly._
(Legacy item: "Our Product section is not well decorated".)

- **Then** all six products from the legacy site are shown with image, description and feature checklist, with the original copy kept.
- **Then** on desktop the products sit on a decorated vertical timeline with numbered nodes and horizontal connectors, alternating left and right; on mobile the line runs down the left edge.
- **Then** a row of quick links lets me jump to a specific product.
- **Then** product data lives in `src/content/products.ts`, not in markup.

#### APW-022 · Animated achievement counters

_As a buyer, I want proof of track record, so that I trust the supplier._

- **Then** "100+ happy clients", "12+ countries exported" and "287+ shipments done" are shown (figures from the legacy site).
- **When** the band scrolls into view, **then** the numbers count up once; with reduced motion they show the final value immediately.
- **Given** no JavaScript, **then** the final values are in the HTML.

#### APW-023 · Contact section with phone, e-mail, addresses and map

_As a buyer ready to talk, I want every contact channel in one place, so that I can reach sales immediately._
(Legacy item: "no phone number in contact-us section".)

- **Then** head-office and corporate-office addresses, phone number (`tel:` link), e-mail (`mailto:` link) and the embedded Google Map are shown.
- **Then** the map is responsive, lazy-loaded and has an accessible title.

#### APW-024 · Services section

_As a buyer with special requirements, I want to know what ARAC can do beyond standard rolls, so that I can judge fit._

- **Then** six capability cards are shown (custom engineering, co-extrusion, down-gauging, additives and treatments, roll formats, export), derived from the legacy product copy.

#### APW-025 · Testimonials with circular progress indicators

_As a buyer, I want to hear from other customers, so that I can trust the supplier._
(Legacy item: "no circular progress bar in the testimonial section".)

- **Then** customer quotes are shown alongside four circular progress indicators for key service levels.
- **When** the indicators scroll into view, **then** the rings animate to their value; each is exposed as an ARIA `meter` (a static measurement — more accurate than `progressbar`) with `aria-valuenow`.
- **Given** quotes and percentages are placeholders, **then** they are flagged in the content inventory (see APW-054) **and** carry a visible "Sample" badge on the page, so invented quotes can never pass as real ones.

#### APW-026 · About us section

_As a buyer, I want to know who the company is, so that I can assess it as a partner._

- **Then** the section describes the company, its values and its offices, with a factory photograph.

#### APW-027 · Downloadable product catalogue

_As an importer, I want a catalogue I can save and share, so that I can circulate it internally._

- **Then** the Download section links to `/catalogue`, a print-optimised page generated from the same product data.
- **When** I choose "Save as PDF", **then** the browser print dialog opens and the printout has one product per block without navigation chrome.
- **Given** an official PDF brochure is configured, **then** a direct download link is also offered.

#### APW-028 · Team members section — Won't have (this release)

The legacy navigation linked to "Team Members", but no section existed. Blocked until the Product
Owner supplies names, roles and photographs with consent. The link was removed from the menu.

### E4 — Production readiness

#### APW-040 · SEO

- **Then** each page has a unique title and description, canonical URL, Open Graph and Twitter metadata and a share image.
- **Then** `/sitemap.xml`, `/robots.txt` and a web-app manifest are generated.
- **Then** an `Organization` JSON-LD block describes the company, its addresses and its social profiles.

#### APW-041 · Accessibility

- **Then** a skip link, landmarks, a single `h1`, ordered headings and visible focus styles are present.
- **Then** Playwright runs axe on every page with zero violations.

#### APW-042 · Security headers

- **Then** responses carry a Content Security Policy (Google Maps frames allowed), HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and frame protection, and the `X-Powered-By` header is removed.
- **Then** an E2E test asserts the headers.

#### APW-043 · Production container image

- **Then** a multi-stage Dockerfile builds a minimal, non-root image from Next.js standalone output.
- **Then** the container starts with `docker run -p 3000:3000` and serves the site.

#### APW-044 · Project documentation

- **Then** README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, CHANGELOG, architecture overview, ADRs and guides for development, testing, deployment and content editing are in place.

#### APW-045 · Content-readiness release gate

- **Then** `npm run content:check` fails while any placeholder content remains, and the release checklist requires it to pass.

#### APW-046 · Meet the mobile performance budget — added during Sprint 3

_As a visitor on a mid-range phone, I want the page to respond immediately, so that I do not give up waiting._

- **Given** a production build, **when** Lighthouse runs with mobile throttling, **then** Performance is at least 90 and Total Blocking Time is under 200 ms.
- Discovered in Sprint 3 when the first audit scored 65; see the [quality report](../quality/quality-report.md).

#### APW-054 · Replace placeholder content — Blocked

Phone number, e-mail address, testimonial quotes and service-level percentages must be supplied and
approved by the Product Owner. Tracked in the [content inventory](../content/content-inventory.md).

#### APW-055 · Vector logo and licensed photography — Blocked

The only logo is a 184 × 63 px PNG, so it looks soft on high-density screens. Three photographs
carry third-party copyright metadata. See the [asset register](../content/asset-register.md).

### E5 — Future enhancements

| ID      | Idea                                                                                    |
| ------- | --------------------------------------------------------------------------------------- |
| APW-050 | Enquiry form using a Server Action with validation, spam protection and e-mail delivery |
| APW-051 | Bangla translation with `[lang]` routing and `hreflang` metadata                        |
| APW-052 | Move `src/content/` into a headless CMS so non-developers can edit content              |
| APW-053 | Cookie-less, consent-aware analytics to measure enquiries                               |
| APW-056 | One page per product with full technical data sheets                                    |

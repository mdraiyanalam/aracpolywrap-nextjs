# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/). Each release corresponds to a sprint (see the
[release plan](docs/agile/release-plan.md)); story IDs refer to the
[product backlog](docs/agile/product-backlog.md).

## [Unreleased]

## [1.0.0] — 2026-10-20 — Sprint 3: Production readiness

### Added

- SEO: per-page titles, descriptions and canonical URLs; Open Graph and Twitter cards with a
  branded 1200 × 630 share image; `sitemap.xml`, `robots.txt` and web-app manifest; PNG and Apple
  touch icons; `Organization` JSON-LD with both offices and the product catalogue (APW-040).
- Branded 404 page and an error boundary with a retry button.
- Automated accessibility tests with axe-core (WCAG 2.2 A/AA) for every page and the open mobile
  menu; skip-link keyboard test (APW-041).
- HTTP security headers: Content Security Policy, HSTS, `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`; E2E assertions (APW-042).
- Multi-stage, non-root Docker image with a health check and optional proxy CA support; Docker job
  in CI (APW-043).
- `npm run content:check` release gate for `@placeholder` content, reported as CI warnings (APW-045).
- Full documentation set: README, CONTRIBUTING, Code of Conduct, Security policy, LICENSE,
  architecture overview, eight ADRs, development, testing, deployment and content-editing guides,
  release checklist, quality report and migration notes (APW-044).
- `NEXT_PUBLIC_SITE_URL` configuration and `.env.example`.

### Changed

- Production builds use Next.js standalone output; `npm start` now runs
  `.next/standalone/server.js`, and a `postbuild` step copies static assets into it.
- E2E tests run against the standalone server (or any URL via `E2E_BASE_URL`).
- Images are served as AVIF or WebP where supported.
- The catalogue page title is now an `h1`.

### Fixed

- Mobile performance: removed the full-screen blur placeholder on hero images, backdrop blur on the
  header and carousel buttons, and the grayscale filter on the statistics background. Lighthouse
  mobile Performance rose from 65 to 92–96; Total Blocking Time fell from 1.9 s to about 0.1 s
  (APW-046).

## [0.3.0] — 2026-10-20 — Sprint 2: Close legacy gaps, new sections

### Added

- Scroll spy: the menu highlights the section in view (`aria-current`) on desktop and mobile
  (APW-012).
- Back-to-top button that appears after one screen of scrolling; respects reduced motion and moves
  keyboard focus to the top (APW-014).
- Services section with six capabilities derived from the product copy (APW-024).
- Testimonials section with four animated circular meters (ARIA `meter`) — the legacy "circular
  progress bar" request (APW-025). Quotes and figures are illustrative and visibly badged until the
  Product Owner supplies real ones.
- About section with company values and office locations (APW-026).
- Download section and a print-optimised `/catalogue` page generated from the product data, with
  "Print or save as PDF" (APW-027).
- Page title template (`%s | ARAC Polywrap Limited`).

### Changed

- The menu now lists all seven sections; the header's "Request a quote" button moves to extra-large
  screens so the menu fits from 1024 px.
- Site header, footer and floating controls are hidden when printing.

## [0.2.0] — 2026-10-19 — Sprint 1: MVP parity

### Added

- Brand design system: navy and red tokens sampled from the logo, Montserrat and Inter web fonts,
  favicon based on the logo mark, shared UI primitives (APW-010).
- Sticky header with section links that work with and without JavaScript, plus an accessible
  mobile menu (`aria-expanded`, <kbd>Esc</kbd> to close, closes on navigation) (APW-011, APW-013).
- Skip-to-content link.
- Hero carousel with autoplay, pause control, swipe, indicators and reduced-motion support (APW-020).
- Products showcase on a decorated timeline with numbered nodes and connectors, plus product
  shortcuts (APW-021).
- Animated achievement counters that respect reduced motion and work without JavaScript (APW-022).
- Contact section with both offices, click-to-call phone, e-mail and a responsive map (APW-023).
- Footer with company summary, quick links, product links, contact details and icon social links
  (APW-015).
- Unit tests for every interactive component and an end-to-end suite for desktop and mobile.

### Fixed

- Navigation links now scroll to their sections, clear of the sticky header (legacy bug
  "section calling doesn't work").

### Removed

- Skype invite link from the footer — Microsoft retired Skype in May 2025.

## [0.1.0] — 2026-10-19 — Sprint 0: Discovery and foundations

### Added

- Next.js 16 (App Router), React 19, TypeScript (strict) and Tailwind CSS 4 code base (APW-001).
- ESLint, Prettier, EditorConfig, husky, lint-staged and commitlint (APW-002).
- Vitest + Testing Library and Playwright test harnesses (APW-003).
- GitHub Actions CI, Dependabot, CODEOWNERS and issue/PR templates (APW-004).
- Product vision, backlog, Definition of Ready/Done and sprint documentation (APW-006).

### Changed

- Legacy images renamed, converted to sRGB, resized and stripped of metadata; total size reduced
  from about 6 MB to 1.1 MB (APW-005).

### Removed

- Create React App, Bootstrap (CDN and vendored copies), react-bootstrap, jQuery and FontAwesome.

[Unreleased]: https://github.com/mdraiyanalam/aracpolywrap/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mdraiyanalam/aracpolywrap/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/mdraiyanalam/aracpolywrap/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/mdraiyanalam/aracpolywrap/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mdraiyanalam/aracpolywrap/releases/tag/v0.1.0

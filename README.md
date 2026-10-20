<div align="center">

<img src="src/assets/images/brand/logo.png" alt="ARAC Polywrap Limited" width="184" />

# ARAC Polywrap — corporate website

The website of **ARAC Polywrap Limited**, a Bangladeshi manufacturer of stretch, shrink, FMCG
lamination, agricultural, protection and custom-made polyethylene films.

[![CI](https://github.com/mdraiyanalam/aracpolywrap/actions/workflows/ci.yml/badge.svg)](https://github.com/mdraiyanalam/aracpolywrap/actions/workflows/ci.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React 19](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Lighthouse](https://img.shields.io/badge/Lighthouse-96%20%7C%20100%20%7C%20100%20%7C%20100-0cce6b)
![WCAG 2.2 AA](https://img.shields.io/badge/axe-WCAG_2.2_AA-6b21a8)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue)](LICENSE)

</div>

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Editing content](#editing-content)
- [Testing and quality](#testing-and-quality)
- [Deployment](#deployment)
- [Before go-live](#before-go-live)
- [How this project is run (Agile)](#how-this-project-is-run-agile)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Overview

This repository is a ground-up rebuild of the original Create React App prototype (still visible
in the git history before tag `v0.1.0`) as a production-ready **Next.js 16** application. The
rebuild was delivered in four Scrum sprints. It fixes every open item from the prototype's
`work_left.txt` and adds SEO, accessibility, security hardening, automated tests, CI and a
Docker image.

| Legacy problem                              | Status in this version                                         |
| ------------------------------------------- | -------------------------------------------------------------- |
| Menu links did not scroll to their sections | ✅ Fixed. Works with and without JavaScript; E2E-tested        |
| No colour scheme                            | ✅ Brand tokens sampled from the logo (navy + red)             |
| Products section "not well decorated"       | ✅ Decorated vertical timeline with numbered nodes             |
| No circular progress bars in testimonials   | ✅ Animated circular meters (ARIA `meter`)                     |
| No phone number in the contact section      | ✅ Phone, e-mail, both offices and map (real number pending)   |
| No back-to-top control                      | ✅ Accessible back-to-top button                               |
| Footer social links looked poor             | ✅ Icon buttons with accessible names; dead Skype link removed |
| "Clean the code"                            | ✅ TypeScript strict, ESLint, Prettier, 63 unit + 59 E2E tests |

## Features

- **One-page marketing site**: hero carousel, products, achievements, services, testimonials,
  about, contact and download sections, plus a print-optimised **`/catalogue`** page that visitors
  can save as PDF.
- **Navigation that works**: sticky header, section links that scroll clear of the header,
  active-section highlighting, accessible mobile menu, skip link and back-to-top button.
- **Accessible by default**: WCAG 2.2 AA checked by axe on every page in CI, keyboard support
  throughout, `prefers-reduced-motion` respected by every animation.
- **Fast**: statically prerendered pages, optimised AVIF/WebP images, self-hosted fonts, about
  320 KB transferred for the home page.
- **Search-friendly**: per-page metadata, canonical URLs, Open Graph/Twitter cards with a branded
  share image, `sitemap.xml`, `robots.txt`, web-app manifest and `Organization` JSON-LD.
- **Secure**: strict security headers including a Content Security Policy, HSTS, frame
  protection and no `X-Powered-By`.
- **Content as data**: all copy lives in typed modules under `src/content/`, and a release gate
  (`npm run content:check`) blocks launch while placeholder content remains.
- **Deployable anywhere**: Vercel, any Node.js 20.9+ host, or a non-root Docker image with a health
  check.

## Tech stack

| Concern      | Choice                                                                       |
| ------------ | ---------------------------------------------------------------------------- |
| Framework    | [Next.js 16.4](https://nextjs.org) (App Router, Cache Components, Turbopack) |
| UI           | React 19.3, [lucide-react](https://lucide.dev) icons                         |
| Language     | TypeScript 5.9 (`strict`, `noUncheckedIndexedAccess`)                        |
| Styling      | Tailwind CSS 4.3 with brand design tokens                                    |
| Fonts        | Montserrat (display) and Inter (body) via `next/font`, self-hosted           |
| Unit tests   | Vitest 5, Testing Library, jsdom                                             |
| E2E and a11y | Playwright 1.64 (desktop and mobile Chromium), axe-core                      |
| Code quality | ESLint 9 (flat config), Prettier 3, husky, lint-staged, commitlint           |
| CI/CD        | GitHub Actions, Dependabot, Docker (standalone output)                       |
| Runtime      | Node.js 22 LTS (minimum 20.9)                                                |

## Getting started

### Prerequisites

- **Node.js 22** (see [`.nvmrc`](.nvmrc); 20.9 or newer works) and npm 10+
- Git
- Optional: Docker 24+ for container builds

### Install and run

```bash
git clone https://github.com/mdraiyanalam/aracpolywrap.git
cd aracpolywrap
nvm use              # picks up Node 22 from .nvmrc
npm ci               # installs dependencies and git hooks
cp .env.example .env.local   # optional: local overrides
npm run dev          # http://localhost:3000
```

The first build downloads the Google Fonts once; after that they are served from your own domain.

## Available scripts

| Command                 | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `npm run dev`           | Start the development server with hot reload (Turbopack)          |
| `npm run build`         | Production build (+ copies static assets into `.next/standalone`) |
| `npm start`             | Serve the production build (`node .next/standalone/server.js`)    |
| `npm run lint`          | ESLint                                                            |
| `npm run lint:fix`      | ESLint with auto-fix                                              |
| `npm run format`        | Format all files with Prettier                                    |
| `npm run format:check`  | Verify formatting                                                 |
| `npm run typecheck`     | Generate route types and run `tsc --noEmit`                       |
| `npm test`              | Unit tests (Vitest)                                               |
| `npm run test:watch`    | Unit tests in watch mode                                          |
| `npm run test:coverage` | Unit tests with coverage report in `coverage/`                    |
| `npm run test:e2e`      | Build, then run Playwright E2E and accessibility tests            |
| `npm run test:e2e:ui`   | Same, in Playwright's interactive UI                              |
| `npm run validate`      | Lint, typecheck, format check and unit tests: run before every PR |
| `npm run content:check` | Release gate: fails while `@placeholder` content remains          |
| `npm run docker:build`  | Build the Docker image `aracpolywrap:local`                       |
| `npm run docker:run`    | Run that image on port 3000                                       |

## Project structure

```text
.
├── .github/                 CI workflow, Dependabot, CODEOWNERS, issue and PR templates
├── docs/                    Agile artefacts, architecture (ADRs), guides, content registers
├── e2e/                     Playwright end-to-end, accessibility, SEO and security tests
├── public/icons/            PNG app icons for the web manifest
├── scripts/                 Build and release helper scripts
├── src/
│   ├── app/                 Routes and metadata files (App Router)
│   │   ├── catalogue/       Printable product catalogue page
│   │   ├── layout.tsx       Root layout: fonts, header, footer, global metadata
│   │   ├── page.tsx         Home page: composes the sections + JSON-LD
│   │   ├── not-found.tsx    Branded 404
│   │   ├── error.tsx        Error boundary
│   │   └── sitemap.ts, robots.ts, manifest.ts, icon.svg, opengraph-image.jpg
│   ├── assets/images/       Optimised, statically imported images
│   ├── components/
│   │   ├── layout/          Header, footer, skip link, back-to-top
│   │   ├── sections/        One component per home-page section
│   │   └── ui/              Reusable primitives (Container, SectionHeading, CountUp, …)
│   ├── content/             ★ All business content and copy, as typed data
│   ├── hooks/               Client hooks (in-view, scroll spy, reduced motion)
│   ├── lib/                 Utilities: site URL, structured data, class names
│   └── test/                Unit-test helpers and browser API mocks
├── Dockerfile               Multi-stage, non-root production image
├── next.config.ts           Security headers, standalone output, image formats
└── playwright.config.ts / vitest.config.mts
```

See the [architecture overview](docs/architecture/overview.md) for how the pieces fit together.

## Configuration

Configuration is through environment variables. Copy [`.env.example`](.env.example) to
`.env.local` for local development.

| Variable                  | Default                     | Purpose                                                                                                      |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`    | `https://aracpolywrap.com`  | Absolute base URL for canonical links, Open Graph, sitemap and JSON-LD. Set per environment. **Build-time.** |
| `NEXT_TELEMETRY_DISABLED` | unset                       | Set to `1` to disable Next.js anonymous telemetry.                                                           |
| `PORT` / `HOSTNAME`       | `3000` / `0.0.0.0` (Docker) | Where the production server listens.                                                                         |

`NEXT_PUBLIC_*` values are inlined at build time, so rebuild after changing them.

## Editing content

All text, figures, contact details and images are defined in **`src/content/`**. Components never
contain business copy. Common tasks:

| To change…                                  | Edit                                         |
| ------------------------------------------- | -------------------------------------------- |
| Phone, e-mail, addresses, map, social links | `src/content/company.ts`                     |
| Products (text, features, images)           | `src/content/products.ts`                    |
| Hero slides                                 | `src/content/hero.ts`                        |
| Statistics (clients, countries…)            | `src/content/stats.ts`                       |
| Services, About, Testimonials               | `services.ts`, `about.ts`, `testimonials.ts` |
| Section headings and intros                 | `src/content/sections.ts`                    |
| Menu items                                  | `src/content/navigation.ts`                  |

A step-by-step guide for non-developers is in
[docs/guides/content-editing.md](docs/guides/content-editing.md).

## Testing and quality

```bash
npm run validate      # lint + typecheck + format + 63 unit tests
npm run test:e2e      # production build + 59 Playwright checks (desktop and mobile)
```

| Layer            | Tooling                   | What it covers                                                      |
| ---------------- | ------------------------- | ------------------------------------------------------------------- |
| Static analysis  | TypeScript strict, ESLint | Types, React hooks rules, Core Web Vitals rules                     |
| Unit / component | Vitest + Testing Library  | Every interactive component, hooks, content integrity, JSON-LD      |
| End-to-end       | Playwright                | Navigation (incl. no-JS), carousel, counters, catalogue, print view |
| Accessibility    | axe-core in Playwright    | WCAG 2.2 A/AA on every page and the open mobile menu                |
| SEO and security | Playwright                | Meta tags, JSON-LD, sitemap, robots, manifest, security headers     |
| Container        | GitHub Actions            | Image builds, becomes healthy, runs as non-root                     |

**Lighthouse** (v1.0.0, production build, simulated throttling):

| Page               | Performance | Accessibility | Best practices | SEO |
| ------------------ | :---------: | :-----------: | :------------: | :-: |
| Home — mobile      |     96      |      100      |      100       | 100 |
| Home — desktop     |     100     |      100      |      100       | 100 |
| Catalogue — mobile |     96      |      100      |      100       | 100 |

Details: [testing guide](docs/guides/testing.md) and [quality report](docs/quality/quality-report.md).

## Deployment

The app builds to static pages served by a small Node.js server
([`output: "standalone"`](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)).

**Docker**

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://aracpolywrap.com -t aracpolywrap .
docker run -d -p 3000:3000 --name aracpolywrap aracpolywrap
```

The image is multi-stage, runs as an unprivileged user (`nextjs`, uid 1001) and has a `HEALTHCHECK`.

**Vercel**: import the repository and set `NEXT_PUBLIC_SITE_URL`. No other configuration is needed.

**Any Node.js host**

```bash
npm ci && npm run build
PORT=3000 npm start
```

The full guide (environments, reverse proxy, caching, rollback, corporate proxies) is in
[docs/guides/deployment.md](docs/guides/deployment.md).

## Before go-live

The code is production-ready; the **content is not yet**. These items need the business owner
(tracked as backlog items APW-054 and APW-055):

- [ ] Real **phone number** and **e-mail address** (`src/content/company.ts`)
- [ ] Approved **testimonials** and measured **service-level figures** (`src/content/testimonials.ts`).
      Until then they are shown with visible "Sample" badges.
- [ ] **Licences** for three photographs that carry third-party copyright metadata, and a higher
      resolution agricultural hero image. See the [asset register](docs/content/asset-register.md).
- [ ] A **vector (SVG) logo** (the only logo is a 184 × 63 px PNG)
- [ ] Review of rewritten copy marked **Derived** in the [content inventory](docs/content/content-inventory.md)
- [ ] `npm run content:check` passes, then follow the [release checklist](docs/operations/release-checklist.md)

## How this project is run (Agile)

The rebuild was delivered with **Scrum** in four one-week sprints, each ending in a tagged release:

| Sprint | Goal                            | Release  | Points |
| ------ | ------------------------------- | -------- | -----: |
| 0      | Discovery and foundations       | `v0.1.0` |     13 |
| 1      | MVP parity with the legacy site | `v0.2.0` |     26 |
| 2      | Close legacy gaps, new sections | `v0.3.0` |     18 |
| 3      | Production readiness            | `v1.0.0` |     19 |

Every story has an ID (`APW-###`) that appears in the backlog, the sprint report and the commit
footer, so `git log --grep APW-011` shows all work for a story. Start at
[docs/agile/README.md](docs/agile/README.md) for the vision, backlog, Definition of Ready/Done and
sprint reviews and retrospectives.

## Documentation

| Area         | Documents                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Index        | [docs/README.md](docs/README.md)                                                                                                                                                                  |
| Agile        | [Process](docs/agile/README.md) · [Vision](docs/agile/product-vision.md) · [Backlog](docs/agile/product-backlog.md) · [Release plan](docs/agile/release-plan.md) · [Sprints](docs/agile/sprints/) |
| Architecture | [Overview](docs/architecture/overview.md) · [Decision records](docs/architecture/adr/README.md)                                                                                                   |
| Guides       | [Development](docs/guides/development.md) · [Testing](docs/guides/testing.md) · [Deployment](docs/guides/deployment.md) · [Content editing](docs/guides/content-editing.md)                       |
| Operations   | [Release checklist](docs/operations/release-checklist.md) · [Quality report](docs/quality/quality-report.md)                                                                                      |
| Content      | [Content inventory](docs/content/content-inventory.md) · [Asset register](docs/content/asset-register.md)                                                                                         |
| Migration    | [From Create React App](docs/migration/from-create-react-app.md)                                                                                                                                  |
| Project      | [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [Code of conduct](CODE_OF_CONDUCT.md) · [Security](SECURITY.md)                                                                     |

## Contributing

Contributions follow GitHub flow with Conventional Commits and story IDs. Read
[CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Every PR must meet the
[Definition of Done](docs/agile/definition-of-done.md).

## Security

Please do **not** open public issues for vulnerabilities. See [SECURITY.md](SECURITY.md).

## License

Source code: [ISC](LICENSE) © 2024–2026 Md Raiyan Alam.
The ARAC Polywrap name, logo and photographs are **not** covered by this licence. They belong to
ARAC Polywrap Limited or their respective copyright holders.

<div align="center">
<sub>Designed and developed by <a href="https://www.linkedin.com/in/mdraiyanalam/">Md Raiyan Alam</a>.</sub>
</div>

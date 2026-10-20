# Sprint 3 — Production readiness

| Field       | Value                                                                                |
| ----------- | ------------------------------------------------------------------------------------ |
| Sprint goal | The site is findable, accessible, secure, deployable and documented: release v1.0.0. |
| Duration    | 1 week                                                                               |
| Release tag | `v1.0.0`                                                                             |
| Committed   | 6 stories / 17 points                                                                |
| Completed   | 7 stories / 19 points (1 story added mid-sprint)                                     |

## Sprint backlog

| ID      | Story                                                   | Pts | Status |
| ------- | ------------------------------------------------------- | --: | ------ |
| APW-040 | SEO: metadata, Open Graph, sitemap, robots, JSON-LD     |   3 | Done   |
| APW-041 | Accessibility audit and automated axe checks            |   3 | Done   |
| APW-042 | HTTP security headers and Content Security Policy       |   2 | Done   |
| APW-043 | Production container image                              |   3 | Done   |
| APW-044 | Project documentation set                               |   5 | Done   |
| APW-045 | Content-readiness release gate                          |   1 | Done   |
| APW-046 | Meet the mobile performance budget _(added mid-sprint)_ |   2 | Done   |

## Sprint review

**Increment demonstrated:**

- **SEO:** page titles and descriptions, canonical URLs, Open Graph and Twitter cards with a
  branded share image, `sitemap.xml`, `robots.txt`, web-app manifest, PNG/Apple icons and
  `Organization` JSON-LD listing both offices and all six products. Placeholder phone and e-mail
  are deliberately left out of structured data.
- **Accessibility:** axe (WCAG 2.2 A/AA + best practice) reports 0 violations on every page and
  the open mobile menu. The audit found that the catalogue page had no `h1`; fixed. Lighthouse
  Accessibility is 100.
- **Security:** CSP, HSTS, frame denial, nosniff, referrer and permissions policies on every
  response; `X-Powered-By` removed; all asserted by E2E tests.
- **Performance:** first audit 65 on mobile; after removing three paint-heavy effects, 92–96, with
  Total Blocking Time down from 1.9 s to about 0.1 s.
- **Deployment:** standalone build used by `npm start`, the E2E tests and a non-root Docker image
  with a health check. The full E2E suite passes against the running container. CI gains a Docker
  job.
- **Release gate:** `npm run content:check` lists the 17 remaining placeholders and fails; CI
  reports them as warnings.
- **Documentation:** README, CONTRIBUTING, Code of Conduct, Security policy, LICENSE, architecture
  overview, 8 ADRs, development/testing/deployment/content guides, release checklist, quality
  report and migration notes.

**Accepted by Product Owner:** yes. v1.0.0 is technically ready; **go-live waits on APW-054 and
APW-055** (real contact details, testimonials, figures, photo licences and a vector logo).

## Retrospective

| Went well                                                                                              | To improve                                                                                                 | Action (owner)                                                                                                      |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Testing the Docker image with the same E2E suite gave high confidence that the shipped artefact works. | Performance was not measured until the last sprint; a 1.9 s blocking time had been present since Sprint 1. | Add a Lighthouse CI budget to the pipeline in release 1.1 (dev team).                                               |
| axe found a real issue (missing `h1` on the catalogue) that manual review missed.                      | `next start` turned out to be unsupported with standalone output; found only when wiring Docker.           | Read the version-matched Next.js docs for build/deploy options at sprint planning, not mid-sprint (dev team).       |
| Keeping placeholders visible and gated made the go-live conversation with the PO concrete.             | Content is still blocking launch after four sprints.                                                       | PO to deliver contact details and testimonials before release 1.1 planning; make APW-054 the top backlog item (PO). |

## Carried over / follow-ups

- APW-054 and APW-055 are the only items between v1.0.0 and go-live.
- Release 1.1 candidates: Lighthouse CI budget, enquiry form (APW-050), product detail pages (APW-056).

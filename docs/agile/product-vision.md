# Product vision

## Vision statement

> **For** B2B buyers of industrial and agricultural packaging films
> **who** need a dependable local manufacturer,
> **the ARAC Polywrap website** is a fast, credible online showroom
> **that** explains the product range, proves manufacturing capability and makes contacting sales effortless.
> **Unlike** the legacy single-page React prototype, **our product** is production-ready: accessible,
> search-engine friendly, secure by default and easy to keep up to date.

## Background

ARAC Polywrap Limited manufactures polyethylene films in Bangladesh: stretch film, shrink film, FMCG
lamination film, agricultural film, protection film and custom-made films. The first version of the
website was a Create React App prototype with a Bootstrap layout. It was never finished. Its
`work_left.txt` listed these open problems:

- the navigation links did not scroll to their sections,
- there was no consistent colour scheme,
- the products section was undecorated,
- the testimonials section had no circular progress bars,
- the contact section had no phone number,
- there was no back-to-top control,
- the footer social links looked poor,
- the code needed cleaning up.

Several sections (Services, Testimonials, About Us, Download) were empty placeholders.

## Target users (personas)

| Persona                                                | Goal on the site                                                | Key needs                                                       |
| ------------------------------------------------------ | --------------------------------------------------------------- | --------------------------------------------------------------- |
| **Rahim — Procurement manager, FMCG / beverage plant** | Find a reliable supplier of stretch, shrink and lamination film | Product specs at a glance, proof of capacity, quick contact     |
| **Nadia — Agribusiness buyer**                         | Source greenhouse, mulch and silage film                        | Clear agricultural range, UV and biodegradability options       |
| **Kenji — International importer**                     | Assess export capability                                        | Export track record, downloadable catalogue, English content    |
| **Content editor (ARAC marketing)**                    | Keep products and contact details current                       | Content in one obvious place, no code knowledge for small edits |

## Goals and success measures

| Goal                      | Measure                                                           | Target       |
| ------------------------- | ----------------------------------------------------------------- | ------------ |
| Credible first impression | Lighthouse Performance (mobile)                                   | ≥ 90         |
| Usable by everyone        | Automated axe checks (WCAG 2.2 A/AA rules)                        | 0 violations |
| Easy to find              | Lighthouse SEO; structured data validates                         | 100; valid   |
| Easy to contact           | Phone, email and address reachable in ≤ 1 click from any section  | Yes          |
| Maintainable              | CI green on every merge; unit + E2E tests for every story         | Always       |
| Easy content updates      | Product, contact and statistics changes touch only `src/content/` | Yes          |

## Scope

**In scope for v1.0:** single-page marketing site (hero, products, achievements, services,
testimonials, about, contact, download), a printable product catalogue page, SEO and social
metadata, accessibility, security headers, CI/CD and container deployment.

**Out of scope for v1.0** (kept in the backlog): enquiry form with e-mail delivery, Bangla
localisation, headless CMS, analytics, team members section, per-product pages.

## Constraints and assumptions

- Business content (phone number, e-mail address, testimonials, KPI figures) must come from the
  Product Owner. Until then, clearly marked placeholders are used and tracked in
  [content inventory](../content/content-inventory.md).
- Existing photography is reused. Some images carry third-party copyright metadata; licences must be
  confirmed before launch (see the [asset register](../content/asset-register.md)).
- The legacy domain `aracpolywrap.com` did not resolve when this project started, so no content
  could be recovered from the live site.

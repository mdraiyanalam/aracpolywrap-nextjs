# Sprint 0 — Discovery and foundations

| Field       | Value                                                                        |
| ----------- | ---------------------------------------------------------------------------- |
| Sprint goal | Understand the legacy app and stand up a tested, CI-ready Next.js code base. |
| Duration    | 1 week                                                                       |
| Release tag | `v0.1.0`                                                                     |
| Committed   | 6 stories / 13 points                                                        |
| Completed   | 6 stories / 13 points                                                        |

## Discovery findings (legacy Create React App prototype)

| Area          | Finding                                                                                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation    | Menu anchors pointed at `#Product`, `#Services`, `#TeamMembers`… but those sections were empty or missing, and some content rendered outside them. Section links did nothing useful.                                  |
| Structure     | `NavBar.js` rendered the carousel and products as well as the menu; `App.js` rendered the same empty sections again, so IDs were duplicated.                                                                          |
| Styling       | Three CSS systems were loaded at once: Bootstrap 4 from a CDN, a vendored Bootstrap 5 copy and react-bootstrap. jQuery was loaded but unused. A template's `gtco-*` classes were referenced without their stylesheet. |
| React hygiene | `class` used instead of `className` throughout (React warnings). `config,js` had a comma in its file name. `prop-types` was imported without being a dependency.                                                      |
| Accessibility | Every product image had `alt="Description"`; carousel slides had no alt text; the map iframe had no title.                                                                                                            |
| Content       | Six products with full copy, two office addresses, a Google Maps embed, three statistics and a Facebook link were usable. Services, Testimonials, About, Download and Team were empty.                                |
| Images        | 6 MB in total. Four JPEGs were CMYK (colours vary between browsers). One photo contained GPS coordinates. Three carried third-party copyright metadata.                                                               |
| Live site     | `aracpolywrap.com` did not resolve, so no further content could be recovered.                                                                                                                                         |

## Sprint backlog

| ID      | Story                                           | Pts | Status |
| ------- | ----------------------------------------------- | --: | ------ |
| APW-001 | Scaffold Next.js App Router project             |   3 | Done   |
| APW-002 | Code-quality tooling and commit conventions     |   2 | Done   |
| APW-003 | Unit and end-to-end test harness                |   3 | Done   |
| APW-004 | Continuous integration and repository templates |   2 | Done   |
| APW-005 | Migrate and optimise legacy image assets        |   2 | Done   |
| APW-006 | Agile artefacts: vision, backlog, DoR, DoD      |   1 | Done   |

## Sprint review

**Increment demonstrated:**

- `npm run dev` serves a placeholder page from the new Next.js 16 / React 19 / TypeScript / Tailwind CSS 4 code base.
- `npm run validate` (lint, typecheck, format, unit tests) and `npm run test:e2e` (desktop and mobile Chromium) pass.
- Images reduced from about 6 MB to 1.1 MB, converted to sRGB, metadata stripped.
- Backlog of 34 stories with acceptance criteria, mapped to every item in the legacy `work_left.txt`.

**Accepted by Product Owner:** yes.

## Retrospective

| Went well                                                       | To improve                                                                                                                       | Action (owner)                                                                                   |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Auditing the legacy code first gave a clear, traceable backlog. | Next.js 16.4 differs from earlier versions (`next lint` removed, Cache Components on by default, `preload` replaces `priority`). | Read the version-matched docs in `node_modules/next/dist/docs/` before using any API (dev team). |
| Pre-installed Chromium let E2E tests run without downloads.     | Missing business content (phone, e-mail) will block "Done" for some stories.                                                     | PO to supply contact details; placeholders tracked in the content inventory (PO).                |

## Carried over / follow-ups

- None.

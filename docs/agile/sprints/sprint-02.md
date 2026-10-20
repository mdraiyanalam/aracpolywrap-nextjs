# Sprint 2 — Close the legacy gaps and add the missing sections

| Field       | Value                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------- |
| Sprint goal | Every section the legacy menu promised exists, and every remaining `work_left.txt` item is closed. |
| Duration    | 1 week                                                                                             |
| Release tag | `v0.3.0`                                                                                           |
| Committed   | 6 stories / 18 points                                                                              |
| Completed   | 6 stories / 18 points                                                                              |

## Sprint backlog

| ID      | Story                                          | Pts | Status |
| ------- | ---------------------------------------------- | --: | ------ |
| APW-012 | Highlight the active section in the navigation |   2 | Done   |
| APW-014 | Back-to-top button                             |   1 | Done   |
| APW-024 | Services section                               |   3 | Done   |
| APW-025 | Testimonials with circular progress indicators |   5 | Done\* |
| APW-026 | About us section                               |   2 | Done   |
| APW-027 | Downloadable product catalogue                 |   5 | Done   |

\* Done in code. Quotes and percentages are illustrative and visibly badged; real content is
tracked as APW-054.

## Sprint review

**Increment demonstrated:**

- All seven menu items (Home, Products, Services, Testimonials, About, Contact, Download) lead to a
  real section, and the item for the section in view is highlighted.
- Testimonials section with four circular meters that fill on scroll — closes the last open
  `work_left.txt` item. Every legacy item is now resolved (see the
  [traceability table](../product-backlog.md#legacy-work_lefttxt-traceability)).
- Back-to-top button (legacy item) with keyboard focus handling.
- `/catalogue` renders the whole range from the same data as the home page. Printing it (or saving
  as PDF) gives a 4-page A4 document with a letterhead and no site chrome — checked by generating a
  PDF with headless Chromium.
- 58 unit tests and 35 end-to-end checks pass on desktop and mobile Chromium.

**Accepted by Product Owner:** yes. The PO asked that sample testimonials stay visibly labelled
until approved quotes are supplied.

## Retrospective

| Went well                                                                                          | To improve                                                                                                                                                    | Action (owner)                                                                                               |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Generating the catalogue from `src/content/products.ts` meant zero duplicated copy.                | Two E2E tests failed on first run because of wrong assumptions: Playwright treats `opacity: 0` as visible, and the catalogue has one more `h2` than expected. | Assert on what the user perceives; hidden UI is now `invisible` + `inert`, not just transparent (dev team).  |
| Choosing ARIA `meter` over `progressbar` gave screen readers the right meaning for static figures. | No real testimonials or KPI figures exist yet.                                                                                                                | Rendered visible "Sample" badges so invented content cannot be mistaken for real; PO to supply content (PO). |
| Checking layouts at 1024 px caught the 7-item menu crowding before review.                         | —                                                                                                                                                             | Keep 1024 px in the manual check list (added to DoD widths in Sprint 3).                                     |

## Carried over / follow-ups

- APW-054 now also covers testimonials and service-level figures.
- APW-028 (Team members) stays blocked; the legacy "Team Members" menu item was not carried over.

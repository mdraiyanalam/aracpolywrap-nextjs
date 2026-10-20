# Sprint 1 — MVP parity with the legacy site

| Field       | Value                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------ |
| Sprint goal | Everything the legacy site showed, rebuilt in Next.js — and the navigation actually works. |
| Duration    | 1 week                                                                                     |
| Release tag | `v0.2.0`                                                                                   |
| Committed   | 8 stories / 26 points                                                                      |
| Completed   | 8 stories / 26 points                                                                      |

## Sprint backlog

| ID      | Story                                                 | Pts | Status |
| ------- | ----------------------------------------------------- | --: | ------ |
| APW-010 | Brand colour scheme and typography                    |   3 | Done   |
| APW-011 | Sticky header with working section navigation         |   3 | Done   |
| APW-013 | Accessible mobile navigation menu                     |   3 | Done   |
| APW-015 | Footer with structured links and social icons         |   2 | Done   |
| APW-020 | Hero carousel                                         |   5 | Done   |
| APW-021 | Products showcase with decorated layout               |   5 | Done   |
| APW-022 | Animated achievement counters                         |   2 | Done   |
| APW-023 | Contact section with phone, e-mail, addresses and map |   3 | Done\* |

\* Done in code. The real phone number and e-mail address are still placeholders, tracked
separately as APW-054 (blocked on the Product Owner).

## Sprint review

**Increment demonstrated:**

- Header menu items scroll to their sections on desktop and mobile, with and without JavaScript —
  the main legacy bug is fixed and covered by end-to-end tests.
- Brand colours from the logo applied consistently; all text pairs meet WCAG AA contrast.
- Hero carousel: 4 slides, autoplay with pause, swipe, keyboard-friendly controls; no autoplay with
  reduced motion.
- Products presented on a vertical timeline with numbered nodes and horizontal connectors
  (legacy "not well decorated" item).
- Counters animate once when visible; final numbers are in the HTML for search engines and no-JS.
- Contact cards for both offices, phone and e-mail, plus the original Google Maps embed.
- Footer redesigned with icon social links; the dead Skype link removed.
- 31 unit tests and 20 end-to-end checks across desktop and mobile Chromium.

**Accepted by Product Owner:** yes, with the request to supply the real phone number and e-mail.

## Retrospective

| Went well                                                                                                | To improve                                                                                                                                                         | Action (owner)                                                                                                                          |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Keeping content in `src/content/` made a content-integrity test possible (every link target must exist). | A Tailwind class conflict (`hidden` vs `inline-flex`) showed the desktop "Request a quote" button in the mobile header. Tests did not catch it; visual review did. | Added an E2E regression check; wrap responsive visibility in a container rather than overriding a component's display class (dev team). |
| End-to-end tests proved the navigation fix in a real browser, including with JavaScript disabled.        | The Google Maps embed cannot load in the sandbox/CI network, which produced console noise.                                                                         | Console-error fixture ignores third-party embed errors only (done).                                                                     |
| Reusing the legacy copy kept the PO review short.                                                        | Contact details are still missing.                                                                                                                                 | PO to provide phone and e-mail before Sprint 3 (PO).                                                                                    |

## Carried over / follow-ups

- APW-054 (placeholder phone and e-mail) remains blocked on the Product Owner.

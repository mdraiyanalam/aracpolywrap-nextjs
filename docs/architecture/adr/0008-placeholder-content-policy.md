# 0008. Placeholder content: visible badges and a release gate

- **Status:** Accepted
- **Date:** 2026-10-20
- **Story:** APW-025, APW-045, APW-054

## Context

Several sections needed content that did not exist: phone number, e-mail address, customer
testimonials and service-level percentages. The legacy live site could not be reached to recover
any. Publishing invented testimonials or figures as if they were real would mislead customers.

## Decision

1. Every unapproved value in `src/content/` carries a trailing `// @placeholder` comment and a
   row in the [content inventory](../../content/content-inventory.md).
2. Illustrative testimonials and figures render a **visible badge** ("Sample testimonial",
   "Illustrative figures — awaiting confirmation") controlled by data flags (`sample`,
   `serviceLevelsAreSamples`). A unit test ensures every testimonial declares the flag.
3. Placeholder contact values are **omitted from JSON-LD**, so search engines never index them.
4. `npm run content:check` lists all placeholders and exits non-zero. It warns in CI and is a
   mandatory step of the [release checklist](../../operations/release-checklist.md).

## Consequences

- Development and stakeholder demos can proceed with realistic layouts.
- Invented content cannot be mistaken for real content on the page, and cannot reach production
  unnoticed if the release checklist is followed.
- Replacing content is a data-only change: set the real value and delete the marker and flag.

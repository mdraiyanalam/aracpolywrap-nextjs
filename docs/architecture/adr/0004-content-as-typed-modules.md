# 0004. Business content as typed modules in the repository

- **Status:** Accepted
- **Date:** 2026-10-19
- **Story:** APW-021

## Context

In the legacy app, product copy was hard-coded in deeply nested JSX, so changing a sentence meant
editing markup. The site has six products and a handful of sections; content changes are rare
and are reviewed by the Product Owner.

## Decision

Keep all business content in **typed TypeScript modules under `src/content/`**, with types in
`src/content/types.ts`. Components only read from these modules. Images are statically imported
there so Next.js knows their dimensions.

## Consequences

- One obvious place for every content change; reviewable in pull requests (CODEOWNERS routes
  `src/content/` to the Product Owner).
- Type checking catches missing fields; `content.test.ts` checks cross-references (every link
  target exists).
- The same data feeds the home page, catalogue, footer, sitemap and JSON-LD, with no duplication.
- Non-developers still need a pull request to change copy; a headless CMS remains an option
  (APW-052) and would only replace this layer.

## Alternatives considered

| Option            | Why not now                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| Headless CMS      | Cost and operational overhead not justified for rarely changing content |
| JSON / YAML files | No types or comments; images cannot be statically imported              |
| MDX per section   | Good for long-form prose, awkward for structured lists like features    |

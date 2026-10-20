# 0005. Testing strategy: Vitest, Playwright and axe

- **Status:** Accepted
- **Date:** 2026-10-19
- **Story:** APW-003

## Context

The legacy app had only the default CRA test file. The rebuild must prove that the legacy bugs are
fixed (especially navigation) and stay fixed, and that the site meets WCAG 2.2 AA.

## Decision

A test pyramid with three layers, all run in CI on every pull request:

1. **Vitest + Testing Library (jsdom)** for components, hooks, content invariants and helpers.
   Browser APIs that jsdom lacks (`IntersectionObserver`, `matchMedia`, scrolling) are mocked in
   `src/test/`, with helpers to trigger intersections and reduced motion. `next/image` renders as a
   plain `<img>`.
2. **Playwright** against the **production standalone build** in desktop and mobile Chromium:
   navigation (including with JavaScript disabled), carousel, counters, catalogue print view, SEO
   tags and security headers. Every test fails on unexpected console errors.
3. **axe-core** inside Playwright for WCAG 2.2 A/AA on every page and the open mobile menu.

## Consequences

- Fast feedback locally (unit suite runs in seconds) and realistic checks in CI.
- E2E tests also run against the Docker image (`E2E_BASE_URL=http://localhost:3000`), so the
  shipped artefact is what gets tested.
- Visual regressions are not covered automatically; layout is reviewed with screenshots in PRs.

## Alternatives considered

| Option                           | Why not                                                         |
| -------------------------------- | --------------------------------------------------------------- |
| Jest                             | Slower, needs more configuration for ESM/TypeScript than Vitest |
| Cypress                          | Playwright covers multiple devices and runs faster in CI        |
| Manual accessibility checks only | Not repeatable; regressions slip through                        |

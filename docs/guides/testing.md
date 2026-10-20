# Testing guide

See [ADR 0005](../architecture/adr/0005-testing-strategy.md) for the strategy. This guide is the
practical how-to.

## Overview

| Suite          | Command                 | Location                             | Runs in                    |
| -------------- | ----------------------- | ------------------------------------ | -------------------------- |
| Unit/component | `npm test`              | `src/**/*.test.ts(x)` (next to code) | jsdom (Vitest)             |
| Coverage       | `npm run test:coverage` | report in `coverage/`                | jsdom                      |
| End-to-end     | `npm run test:e2e`      | `e2e/*.spec.ts`                      | Chromium desktop + Pixel 7 |
| Accessibility  | part of E2E             | `e2e/accessibility.spec.ts`          | axe-core in Chromium       |
| Content gate   | `npm run content:check` | `scripts/check-content.mjs`          | Node                       |

Currently: **68 unit tests** in 15 files. The E2E suite has 66 cases: against the Node server,
**59 pass** and 7 are skipped by design (desktop-only/mobile-only cases and the static-only CSP
test); against the static export, **55 pass** and 11 are skipped (HTTP header tests cannot apply
to a static host).

## Unit tests

- Use Testing Library queries by role and accessible name (`getByRole("button", { name: "Menu" })`).
  This tests behaviour and accessibility together.
- Helpers in `src/test/`:

  | Helper                          | Use                                      |
  | ------------------------------- | ---------------------------------------- |
  | `triggerIntersection(el, true)` | Simulate an element scrolling into view  |
  | `setReducedMotion(true)`        | Emulate `prefers-reduced-motion: reduce` |

- `vitest.setup.ts` also mocks `next/image` (plain `<img>`), `next/navigation` (`usePathname` →
  `/`) and the scrolling APIs. Override the path with
  `vi.mocked(usePathname).mockReturnValue("/catalogue")`.
- Timers and animation frames: `vi.useFakeTimers({ toFake: ["requestAnimationFrame", "performance"] })`
  and `vi.advanceTimersByTime(ms)` inside `act()`.
- Async Server Components cannot be rendered by Testing Library; keep logic in client components
  or plain functions, or cover it in E2E.

## End-to-end tests

```bash
npm run test:e2e                         # builds, starts the standalone server on :3100, runs all
npx playwright test e2e/navigation.spec.ts --project=mobile   # one file, one device
npx playwright show-report               # open the last HTML report
```

- Import `test` and `expect` from `./fixtures`, not from `@playwright/test`. The fixture fails any
  test that logs a console error. Expected errors (such as the 404 page's own status) can be
  allowed per describe block with `test.use({ ignoredConsoleErrors: [/status of 404/] })`.
- `expectBelowHeader(page, "#id")` asserts a section scrolled into view without being hidden
  under the sticky header.
- Use `isMobile` to skip tests that only apply to one layout.

### Testing the static export (GitHub Pages build)

```bash
npm run test:e2e:static     # builds out/ without a base path, serves it like GitHub Pages, runs the suite
```

`E2E_STATIC_EXPORT=true` switches the web server to `scripts/serve-static.mjs`, skips the HTTP
header tests and runs a `<meta>` CSP test instead. The deploy workflow runs this before every
GitHub Pages deployment, and CI runs it on every pull request.

### Running against another server

```bash
E2E_BASE_URL=http://localhost:3000 npx playwright test   # e.g. a running Docker container
```

### Pre-installed browsers

In environments with a Chromium binary but no Playwright download access:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chromium npm run test:e2e
```

## Accessibility tests

`e2e/accessibility.spec.ts` runs axe with the tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`,
`wcag22aa` and `best-practice` on `/`, `/catalogue`, the 404 page and the open mobile menu, with
reduced motion emulated so animations have settled. The Google Maps iframe is excluded (third-party
markup). Any violation fails the build and prints the rule, impact and selectors.

Automated checks catch roughly a third of accessibility issues. Before each release also do the
manual checks in the [release checklist](../operations/release-checklist.md): keyboard-only pass,
screen reader spot check and 200% zoom.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `master`/`main` and every pull request:

1. **quality**: `npm ci` → lint → typecheck → format check → unit tests with coverage (artefact)
   → content check (warnings only).
2. **e2e** (after quality): installs Chromium, builds and runs Playwright; uploads the HTML report
   on failure.
3. **docker** (after quality): builds the image, waits for the health check, smoke-tests key URLs
   and headers, and asserts the container runs as uid 1001.

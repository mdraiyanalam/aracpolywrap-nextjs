# Quality report — v1.0.0

Results of the verification run for release `v1.0.0` (end of Sprint 3). All checks were run
against the **production build** (`.next/standalone/server.js`) unless noted.

## Summary

| Area                  | Result                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| Static analysis       | ESLint 0 errors, 0 warnings · TypeScript strict: 0 errors · Prettier clean                              |
| Unit tests            | **63 passed** in 13 files (Vitest 5)                                                                    |
| End-to-end tests      | **59 passed**, 5 skipped by design (desktop/mobile-only cases), 0 failed                                |
| E2E against Docker    | **59 passed** against the running container image                                                       |
| Accessibility (axe)   | **0 violations** (WCAG 2.2 A/AA + best practice) on `/`, `/catalogue`, 404 and the open mobile menu     |
| Lighthouse            | Mobile 96 / 100 / 100 / 100 · Desktop 100 / 100 / 100 / 100                                             |
| Security headers      | CSP, HSTS, nosniff, frame denial, referrer and permissions policies on every route; no `X-Powered-By`   |
| Production deps audit | 0 vulnerabilities (`npm audit --omit=dev`)                                                              |
| Docker image          | Builds; healthy within 30 s; runs as uid 1001; ~340 MB uncompressed                                     |
| Content readiness     | ❌ **17 placeholders** remain (phone, e-mail, testimonials, KPI figures). This blocks go-live (APW-054) |

## Lighthouse detail

Lighthouse 12, simulated throttling (mobile: Moto G Power profile, slow 4G, 4× CPU slowdown).

| Page / form factor  | Performance | Accessibility | Best practices | SEO | FCP   | LCP   | TBT    | CLS |
| ------------------- | :---------: | :-----------: | :------------: | :-: | ----- | ----- | ------ | --- |
| `/` mobile          |     96      |      100      |      100       | 100 | 1.0 s | 2.5 s | 110 ms | 0   |
| `/` desktop         |     100     |      100      |      100       | 100 | 0.3 s | 0.8 s | 0 ms   | 0   |
| `/catalogue` mobile |     96      |      100      |      100       | 100 | —     | —     | —      | —   |

Repeated mobile runs varied between 92 and 96 for Performance.

### Performance fix made in Sprint 3

The first measurement scored **65** on mobile with a Total Blocking Time of 1.9 s. JavaScript was
not the cause (about 0.7 s of script evaluation at 4× CPU slowdown). Most main-thread time was
unattributed rendering work caused by three paint-heavy effects:

1. a full-screen blurred placeholder (SVG blur filter) behind each hero image,
2. `backdrop-filter: blur` on the sticky header and carousel buttons, and
3. a CSS `grayscale` filter on the full-width statistics background photo.

Removing them raised mobile Performance to 92–96 and cut TBT to about 0.1 s with no visible loss
in design quality.

## Page weight

About **320 KB** transferred for the home page on first load (HTML, CSS, JavaScript, fonts and
above-the-fold images), measured by Lighthouse.

## How to reproduce

```bash
npm ci
npm run validate
npm run test:e2e
npm start &                    # serves .next/standalone on :3000
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo
```

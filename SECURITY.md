# Security policy

## Supported versions

Only the latest release on `master` receives security fixes.

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |
| < 1.0   | ❌        |

## Reporting a vulnerability

**Do not open a public issue.** Report privately through
[GitHub private vulnerability reporting](https://github.com/mdraiyanalam/aracpolywrap/security/advisories/new)
(Security tab → _Report a vulnerability_).

Please include the affected URL or file, steps to reproduce, the impact you expect, and any
proof-of-concept. We aim to:

| Step                            | Target                     |
| ------------------------------- | -------------------------- |
| Acknowledge the report          | 3 working days             |
| Confirm and assess severity     | 7 working days             |
| Release a fix for high/critical | 14 days after confirmation |

We will credit you in the release notes unless you prefer to remain anonymous.

## How the site is hardened

The site has no database, no user accounts and no forms that send data to a server, which keeps
its attack surface small. In addition:

- **HTTP security headers** on every response (configured in `next.config.ts`, verified by
  `e2e/security.spec.ts`): Content Security Policy, `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`,
  `Permissions-Policy` and `Cross-Origin-Opener-Policy`. `X-Powered-By` is removed.
- **CSP** allows scripts, styles, fonts and images only from the site itself. The single
  third-party origin is Google Maps, allowed only as a frame. See
  [ADR 0007](docs/architecture/adr/0007-csp-without-nonces.md) for why `'unsafe-inline'` is
  allowed for scripts.
- **JSON-LD** is serialised with `<` escaped to prevent script injection.
- **External links** open with `rel="noopener noreferrer"`.
- **Container** runs as an unprivileged user (uid 1001) from a minimal Alpine image.
- **Dependencies** are updated weekly by Dependabot; `npm audit --omit=dev` reports no known
  vulnerabilities in production dependencies at v1.0.0.
- **Image metadata** (including GPS coordinates) is stripped from all published photographs.

## Known issues

- `npm audit` reports one high-severity advisory in `braces` (stack exhaustion with deeply nested
  glob patterns), reached through `micromatch` → `fast-glob` → `@next/eslint-plugin-next` →
  `eslint-config-next`, so it is counted five times. It affects only the **development-time**
  linter, which processes our own trusted file patterns. It is never shipped to browsers or
  included in the Docker runtime image. Dependabot will pick up the fix when `eslint-config-next`
  releases one.

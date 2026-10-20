# 0007. Content Security Policy without nonces

- **Status:** Accepted
- **Date:** 2026-10-20
- **Story:** APW-042

## Context

A strict CSP limits the damage of any injected script. Next.js needs inline scripts for
hydration. A nonce-based CSP would allow only scripts carrying a per-request nonce, but nonces
force every page to render dynamically on each request, which gives up static prerendering.

## Decision

Use the [Next.js-recommended CSP without nonces](https://nextjs.org/docs/app/guides/content-security-policy#without-nonces),
set in `next.config.ts`:

```text
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self'; connect-src 'self';
frame-src https://www.google.com https://maps.google.com; object-src 'none';
base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

Development adds `'unsafe-eval'` and WebSocket connections for hot reload only.
`upgrade-insecure-requests` is omitted because HSTS already enforces HTTPS and the directive
breaks plain-HTTP local and CI testing.

## Consequences

- Scripts, styles, fonts and images can only come from the site itself; no third-party script can
  load. The site renders no user-supplied content, which limits the practical risk of
  `'unsafe-inline'`.
- Adding a third-party service (analytics, chat) requires a deliberate CSP change and review.
- `e2e/security.spec.ts` fails if the policy is weakened (for example, `unsafe-eval` in production).

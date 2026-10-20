# 0006. Standalone output and a Docker image for deployment

- **Status:** Accepted
- **Date:** 2026-10-20
- **Story:** APW-043

## Context

The hosting provider is not decided. The site must be deployable to Vercel, a plain Node.js
server or a container platform, and the artefact that is tested should be the one that ships.

## Decision

- Build with `output: "standalone"`. A `postbuild` script copies `public/` and `.next/static/`
  into `.next/standalone/`, making it self-contained.
- `npm start`, the Playwright web server and the Docker image all run
  `node .next/standalone/server.js`.
- A three-stage `Dockerfile` (deps → build → runtime) on `node:22-alpine`, running as uid 1001,
  with a `HEALTHCHECK`. Optional build secret `ca_cert` supports building behind TLS-inspecting
  corporate proxies.

## Consequences

- One artefact for every target. Vercel ignores `standalone` and works unchanged.
- `next start` is no longer used (it is not supported with standalone output).
- The image is about 340 MB uncompressed, mostly the Node.js base image.

## Alternatives considered

| Option                           | Why not                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `output: "export"` (pure static) | Loses image optimisation, security headers from `next.config.ts` and Cache Components revalidation |
| Full `node_modules` image        | Several times larger; slower cold starts                                                           |

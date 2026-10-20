# 0009. Static export for GitHub Pages; Cache Components off

- **Status:** Accepted (supersedes the Cache Components part of [0002](./0002-nextjs-app-router-typescript.md))
- **Date:** 2026-10-20
- **Story:** APW-047

## Context

The owner asked to host the site on GitHub. GitHub Pages serves only static files: no Node.js
server, no custom HTTP headers, no image optimisation, and project sites live under a sub-path
(`https://<user>.github.io/<repository>/`).

Next.js supports this with `output: "export"`. However, in Next.js 16.4.2, **Cache Components
cannot be combined with a static export that has metadata routes** (`sitemap.ts`, `robots.ts`,
`manifest.ts`):

- the export requires `export const dynamic = "force-static"` on those routes, and
- Cache Components rejects that config: _Route segment config "dynamic" is not compatible with
  `nextConfig.cacheComponents`_.

The site gained nothing from Cache Components: every page is static, and its only use was to
refresh the copyright year daily.

## Decision

1. **Turn Cache Components (and Partial Prefetching) off.** Metadata routes declare
   `dynamic = "force-static"`.
2. **Copyright year:** rendered at build time, then corrected in the browser by a tiny client
   component using `useSyncExternalStore` (no hydration mismatch, no revalidation needed).
3. **Two build targets from one code base**, selected by `STATIC_EXPORT=true`
   (`npm run build:static`):

   | Setting         | Server build (default) | Static export                                                                                                      |
   | --------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
   | `output`        | `standalone`           | `export` → `out/`                                                                                                  |
   | `basePath`      | none                   | `NEXT_PUBLIC_BASE_PATH` (e.g. `/repo`)                                                                             |
   | `trailingSlash` | `false`                | `true` (GitHub Pages serves folders as `/page/`; matching URLs keep in-page links on the same page so they scroll) |
   | Images          | optimised (AVIF/WebP)  | `unoptimized` (sources pre-optimised)                                                                              |
   | Security        | HTTP headers           | `<meta>` Content Security Policy                                                                                   |

4. URL helpers in `src/lib/site.ts` (`absoluteUrl`, `pagePath`, `withBasePath`, `assetUrl`) apply
   the base path and trailing-slash rules consistently. `metadataBase` is the origin only,
   because Next.js already prefixes file-based metadata (icons, share image) with the base path.
5. `.github/workflows/deploy-pages.yml` runs the full E2E suite against the static export, then
   rebuilds with the repository's Pages URL (`actions/configure-pages`) and deploys.

## Consequences

- The site can be hosted free on GitHub Pages, with automatic, tested deployments.
- Server-mode pages are fully static (`Cache-Control: s-maxage=31536000`) instead of revalidating
  daily; content changes need a deployment, which was already the workflow.
- On GitHub Pages: no HSTS/frame-protection headers (CSP via meta tag only; `frame-ancestors`
  is ignored there), and `robots.txt` is only honoured with a custom domain.
- If a future Next.js release supports static export with Cache Components, it can be re-enabled
  by reverting points 1–2.

## Alternatives considered

| Option                                                           | Why not                                                                          |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Keep Cache Components; delete the metadata routes in export mode | Mutating source files during a build is fragile; loses sitemap/manifest on Pages |
| Hand-written static `robots.txt`/`sitemap.xml`                   | URLs depend on the deployment address; would drift from the routes               |
| Host only on Vercel or Docker                                    | The owner specifically asked for GitHub hosting; both remain supported           |

# Deployment guide

## Build artefact

There are two build targets from the same code:

| Build                  | Output                                                                                                                  | Used by                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `npm run build`        | `.next/standalone/` — a self-contained Node.js server (`server.js`, minimal `node_modules`, `public/`, `.next/static/`) | Docker, any Node.js host (Vercel builds its own) |
| `npm run build:static` | `out/` — plain HTML, CSS, JS and images                                                                                 | GitHub Pages or any static host (Option D)       |

## Environments

| Environment  | URL (example)                                | `NEXT_PUBLIC_SITE_URL`               | Deployed from            |
| ------------ | -------------------------------------------- | ------------------------------------ | ------------------------ |
| Local        | http://localhost:3000                        | `http://localhost:3000`              | working copy             |
| Preview      | per pull request (e.g. Vercel preview)       | the preview URL                      | PR branch                |
| Production   | https://aracpolywrap.com                     | `https://aracpolywrap.com` (default) | tag `vX.Y.Z` on `master` |
| GitHub Pages | https://mdraiyanalam.github.io/aracpolywrap/ | set automatically by the workflow    | push to `main`/`master`  |

`NEXT_PUBLIC_SITE_URL` is read at **build time**. It sets canonical URLs, Open Graph URLs,
`sitemap.xml`, `robots.txt` and JSON-LD. Build once per environment.

## Option A — Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://aracpolywrap.com \
  -t ghcr.io/mdraiyanalam/aracpolywrap:1.0.0 .

docker run -d --name aracpolywrap --restart unless-stopped \
  -p 3000:3000 ghcr.io/mdraiyanalam/aracpolywrap:1.0.0
```

| Property     | Value                                                      |
| ------------ | ---------------------------------------------------------- |
| Base image   | `node:22-alpine` (multi-stage; build tools not in runtime) |
| User         | `nextjs` (uid 1001), non-root                              |
| Port         | `3000` (`PORT` env to change)                              |
| Health check | `wget --spider http://127.0.0.1:$PORT/` every 30 s         |
| Writable dir | `.next/cache` (image optimisation cache)                   |

**Behind a TLS-inspecting corporate proxy**, pass the proxy and its CA certificate as a build
secret (it is not stored in the image):

```bash
docker build --build-arg HTTPS_PROXY=http://proxy:8080 \
  --secret id=ca_cert,src=/path/to/proxy-ca.pem -t aracpolywrap .
```

## Option B — Vercel

1. Import the GitHub repository in Vercel; the framework is detected automatically.
2. Set `NEXT_PUBLIC_SITE_URL` for Production (and Preview if desired).
3. Production deploys on merge to `master`; previews on pull requests.

Security headers from `next.config.ts` apply on Vercel too.

## Option C — Any Node.js server (VM, PaaS)

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://aracpolywrap.com npm run build
PORT=3000 HOSTNAME=0.0.0.0 npm start
```

Run it under a process manager (systemd, PM2) and copy only `.next/standalone/` to the server if
you build elsewhere.

## Option D — GitHub Pages (free, static)

The static export is published by `.github/workflows/deploy-pages.yml` on every push to `main`
or `master`, after the E2E suite has passed against it.

1. Settings → Pages → Build and deployment → **Source: GitHub Actions**.
2. Push to `main` (or Actions → _Deploy to GitHub Pages_ → _Run workflow_).
3. The site appears at `https://<user>.github.io/<repository>/`; a custom domain can be added in
   Settings → Pages.

Trade-offs: no custom HTTP headers (a `<meta>` CSP is used instead), no on-the-fly image
optimisation. Full step-by-step instructions, DNS records and troubleshooting are in the
[GitHub guide](./github.md).

## Reverse proxy and TLS

Terminate TLS at a reverse proxy or load balancer (nginx, Caddy, cloud LB) and forward to port 3000.

```nginx
server {
  listen 443 ssl http2;
  server_name aracpolywrap.com;
  # ssl_certificate …; ssl_certificate_key …;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

The app already sends security headers; do not duplicate them at the proxy (duplicate CSP headers
are combined by browsers and become stricter).

## Caching

- `/_next/static/*` is content-hashed and served with `Cache-Control: public, max-age=31536000, immutable`.
  It is safe to put a CDN in front with default settings.
- HTML pages are fully static and sent with `Cache-Control: s-maxage=31536000`. A new deployment
  replaces them; purge your CDN cache after deploying if you put one in front.
- Optimised images are cached in `.next/cache/images` (default `minimumCacheTTL` four hours).

## Release and rollback

Follow the [release checklist](../operations/release-checklist.md). Every release is a git tag and
(for Docker) an image tag, so rolling back means redeploying the previous tag:

```bash
docker run -d --name aracpolywrap -p 3000:3000 ghcr.io/mdraiyanalam/aracpolywrap:0.3.0
```

On Vercel use _Instant Rollback_ on the previous production deployment.

## Post-deployment smoke test

```bash
BASE=https://aracpolywrap.com
curl -fsS -o /dev/null -w "%{http_code} /\n" $BASE/
curl -fsS -o /dev/null -w "%{http_code} /catalogue\n" $BASE/catalogue
curl -fsS $BASE/robots.txt | grep -q Sitemap && echo "robots ok"
curl -fsSI $BASE/ | grep -qi content-security-policy && echo "headers ok"
E2E_BASE_URL=$BASE npx playwright test     # full suite against production (read-only)
```

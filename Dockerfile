# syntax=docker/dockerfile:1.7
# Production image for the ARAC Polywrap website (Next.js standalone output).
#   docker build -t aracpolywrap .
#   docker run --rm -p 3000:3000 aracpolywrap
#
# Behind a TLS-inspecting corporate proxy, pass the proxy and its CA certificate:
#   docker build --build-arg HTTPS_PROXY=http://proxy:8080 \
#     --secret id=ca_cert,src=/path/to/proxy-ca.pem -t aracpolywrap .

ARG NODE_VERSION=22-alpine

# ---- 1. Install dependencies (cached until package*.json changes) ----
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# HUSKY=0: git hooks are not needed inside the image.
RUN --mount=type=secret,id=ca_cert,required=false \
    if [ -f /run/secrets/ca_cert ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/ca_cert; fi && \
    HUSKY=0 npm ci --no-audit --no-fund

# ---- 2. Build ----
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://aracpolywrap.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_TELEMETRY_DISABLED=1
# Fetches Google Fonts at build time (next/font self-hosts them afterwards).
RUN --mount=type=secret,id=ca_cert,required=false \
    if [ -f /run/secrets/ca_cert ]; then export NODE_EXTRA_CA_CERTS=/run/secrets/ca_cert; fi && \
    npm run build

# ---- 3. Minimal runtime ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# The standalone folder already contains public/ and .next/static (see scripts/copy-standalone-assets.mjs).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]

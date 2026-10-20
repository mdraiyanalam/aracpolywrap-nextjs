/**
 * Security policy shared by the Node.js server (HTTP headers in next.config.ts) and the
 * static export for GitHub Pages (a `<meta>` CSP in the root layout, because static hosts
 * cannot send custom headers).
 */
export function contentSecurityPolicy({
  isDev = false,
  forMetaTag = false,
}: { isDev?: boolean; forMetaTag?: boolean } = {}): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "frame-src https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // Browsers ignore frame-ancestors in a <meta> tag, so it is only sent as a header.
    ...(forMetaTag ? [] : ["frame-ancestors 'none'"]),
  ].join("; ");
}

export function securityHeaders({ isDev = false } = {}) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ isDev }) },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
}

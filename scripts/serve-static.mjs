#!/usr/bin/env node
/**
 * Previews out/ the way GitHub Pages serves it:
 *   /dir → 301 to /dir/, /dir/ → dir/index.html, /page → page.html, unknown → 404.html (404).
 *
 *   npm run preview:static                                  # http://localhost:4173/
 *   npm run preview:static -- --base-path /aracpolywrap     # http://localhost:4173/aracpolywrap/
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4173);
const flagIndex = process.argv.indexOf("--base-path");
const basePath = (flagIndex > -1 ? (process.argv[flagIndex + 1] ?? "") : "").replace(/\/$/, "");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

if (!existsSync(root)) {
  console.error("out/ not found. Run `npm run build:static` first.");
  process.exit(1);
}

const isFile = (path) => existsSync(path) && statSync(path).isFile();

function resolve(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(root, safe), join(root, `${safe}.html`), join(root, safe, "index.html")];
  return candidates.find((candidate) => candidate.startsWith(root) && isFile(candidate));
}

createServer((req, res) => {
  const fullPath = new URL(req.url ?? "/", "http://localhost").pathname;
  if (basePath && fullPath === basePath) return redirect(res, `${basePath}/`);
  if (basePath && !fullPath.startsWith(`${basePath}/`)) return notFound(res);
  const path = fullPath.slice(basePath.length);
  // Like GitHub Pages: a folder requested without its slash is redirected.
  if (!path.endsWith("/") && isFile(join(root, path, "index.html"))) {
    return redirect(res, `${fullPath}/`);
  }
  const file = resolve(path);
  if (!file) return notFound(res);
  res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Serving out/ at http://localhost:${port}${basePath}/`);
});

function redirect(res, location) {
  res.writeHead(301, { Location: location });
  res.end();
}

function notFound(res) {
  const page = join(root, "404.html");
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  if (isFile(page)) createReadStream(page).pipe(res);
  else res.end("Not found");
}

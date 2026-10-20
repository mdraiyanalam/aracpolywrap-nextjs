#!/usr/bin/env node
/**
 * `output: "standalone"` does not copy static assets into the server bundle
 * (Next.js expects a CDN to serve them). Copy them so `.next/standalone/server.js`
 * is self-contained for `npm start`, E2E tests and the Docker image.
 */
import { cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const standalone = ".next/standalone";
if (!existsSync(standalone)) {
  console.error("No .next/standalone directory — run `next build` first.");
  process.exit(1);
}

await rm(`${standalone}/.next/static`, { recursive: true, force: true });
await cp(".next/static", `${standalone}/.next/static`, { recursive: true });
await rm(`${standalone}/public`, { recursive: true, force: true });
if (existsSync("public")) await cp("public", `${standalone}/public`, { recursive: true });
console.log("Copied .next/static and public/ into .next/standalone.");

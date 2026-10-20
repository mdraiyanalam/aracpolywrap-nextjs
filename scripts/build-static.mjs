#!/usr/bin/env node
/**
 * Builds the static export for GitHub Pages (or any static host) into out/.
 * Works on Windows, macOS and Linux (no shell-specific env syntax).
 *
 *   npm run build:static                                  # served from a domain root
 *   npm run build:static -- --base-path /aracpolywrap     # GitHub Pages project site
 *
 * NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_BASE_PATH environment variables are respected too.
 */
import { spawnSync } from "node:child_process";

const flagIndex = process.argv.indexOf("--base-path");
const basePath = (
  flagIndex > -1 ? (process.argv[flagIndex + 1] ?? "") : (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
).replace(/\/$/, "");

if (basePath && !basePath.startsWith("/")) {
  console.error(`--base-path must start with "/" (got "${basePath}").`);
  process.exit(1);
}

const env = { ...process.env, STATIC_EXPORT: "true", NEXT_PUBLIC_BASE_PATH: basePath };
console.log(`Building static export${basePath ? ` with base path ${basePath}` : ""}…`);

const result = spawnSync("npx", ["next", "build"], { env, stdio: "inherit", shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);
console.log("\nStatic site written to out/. Preview it with: npm run preview:static");

#!/usr/bin/env node
/**
 * Builds the static export (no base path) and runs the Playwright suite against it, served
 * the way GitHub Pages serves files. Extra arguments are passed to `playwright test`.
 *   npm run test:e2e:static
 */
import { spawnSync } from "node:child_process";

const run = (command, args, env = process.env) => {
  const result = spawnSync(command, args, { env, stdio: "inherit", shell: true });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const env = { ...process.env, NEXT_PUBLIC_BASE_PATH: "" };
run("node", ["scripts/build-static.mjs"], env);
run("npx", ["playwright", "test", ...process.argv.slice(2)], { ...env, E2E_STATIC_EXPORT: "true" });

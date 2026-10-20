#!/usr/bin/env node
/**
 * Content-readiness release gate (APW-045).
 *
 * Lists every line in src/content/ marked `@placeholder` and exits with code 1 if any remain.
 *   npm run content:check            → fails while placeholders exist (use before a release)
 *   npm run content:check -- --warn  → reports only; emits GitHub Actions warnings in CI
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const CONTENT_DIR = join(ROOT, "src", "content");
const MARKER = "@placeholder";
const warnOnly = process.argv.includes("--warn");
const inCi = process.env.GITHUB_ACTIONS === "true";

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) yield path;
  }
}

const findings = [];
for await (const file of walk(CONTENT_DIR)) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (line.includes(MARKER) && !line.trimStart().startsWith("*")) {
      findings.push({ file: relative(ROOT, file), line: index + 1, text: line.trim() });
    }
  });
}

if (findings.length === 0) {
  console.log("✔ Content check passed: no placeholder content in src/content/.");
  process.exit(0);
}

console.log(`✖ ${findings.length} placeholder(s) must be replaced before launch (APW-054):\n`);
for (const { file, line, text } of findings) {
  console.log(`  ${file}:${line}  ${text}`);
  if (inCi) console.log(`::warning file=${file},line=${line}::Placeholder content (APW-054)`);
}
console.log("\nSee docs/content/content-inventory.md for owners and sources.");
process.exit(warnOnly ? 0 : 1);

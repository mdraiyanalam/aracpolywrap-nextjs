import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

/**
 * Next.js turns static image imports into `{ src, width, height, blurDataURL }` objects.
 * Vite returns a plain URL string, so emulate the Next.js shape in unit tests.
 */
function nextStaticImages(): Plugin {
  return {
    name: "next-static-images",
    enforce: "pre",
    load(id) {
      if (/\.(png|jpe?g|gif|webp|avif)$/i.test(id)) {
        const src = JSON.stringify(`/${basename(id)}`);
        return `export default { src: ${src}, width: 1200, height: 800, blurDataURL: "data:image/jpeg;base64,AA==" };`;
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [nextStaticImages(), react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/test/**", "src/app/**/{robots,sitemap,manifest}.ts"],
      reporter: ["text", "html", "lcov"],
    },
  },
});

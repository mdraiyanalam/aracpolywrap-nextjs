import { expect, test } from "./fixtures";

const staticExport = process.env.E2E_STATIC_EXPORT === "true";

test.describe("HTTP security headers", () => {
  test.skip(staticExport, "static hosts (GitHub Pages) cannot send custom HTTP headers");

  for (const path of ["/", "/catalogue", "/robots.txt"]) {
    test(`${path} sends the hardened header set`, async ({ request }) => {
      const response = await request.get(path);
      const headers = response.headers();

      expect(headers["content-security-policy"]).toContain("default-src 'self'");
      expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
      expect(headers["content-security-policy"]).toContain("frame-src https://www.google.com");
      expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
      expect(headers["strict-transport-security"]).toMatch(/max-age=\d{8}/);
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["x-frame-options"]).toBe("DENY");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["permissions-policy"]).toContain("camera=()");
      expect(headers["x-powered-by"]).toBeUndefined();
    });
  }
});

test.describe("static export security", () => {
  test.skip(!staticExport, "only the static export ships its CSP as a meta tag");

  test("pages carry a Content Security Policy meta tag", async ({ page }) => {
    for (const path of ["/", "/catalogue/"]) {
      await page.goto(path);
      const csp = page.locator('meta[http-equiv="Content-Security-Policy"]');
      await expect(csp).toHaveAttribute("content", /default-src 'self'/);
      await expect(csp).toHaveAttribute("content", /frame-src https:\/\/www\.google\.com/);
      await expect(csp).not.toHaveAttribute("content", /unsafe-eval/);
    }
  });
});

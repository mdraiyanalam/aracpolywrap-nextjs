import { expect, test } from "./fixtures";

test.describe("HTTP security headers", () => {
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

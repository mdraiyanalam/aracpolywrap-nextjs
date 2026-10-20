import { expect, test } from "./fixtures";

test.describe("SEO and metadata", () => {
  test("home page has canonical, description, Open Graph and Twitter tags", async ({ page }) => {
    await page.goto("/");
    const head = page.locator("head");
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https?:\/\/[^/]+\/?$/,
    );
    await expect(head.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
    await expect(head.locator('meta[property="og:title"]')).toHaveAttribute("content", /ARAC/);
    await expect(head.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /^https?:\/\//,
    );
    await expect(head.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /.+/);
    await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(head.locator('link[rel="manifest"]')).toBeAttached();
    await expect(head.locator('link[rel="icon"]').first()).toBeAttached();
  });

  test("home page publishes valid Organization JSON-LD", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw ?? "{}");
    expect(data).toMatchObject({ "@context": "https://schema.org", "@type": "Organization" });
    expect(data.address).toHaveLength(2);
    expect(data.hasOfferCatalog.itemListElement).toHaveLength(6);
  });

  test("catalogue has its own canonical URL", async ({ page }) => {
    await page.goto("/catalogue");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/catalogue$/);
  });

  test("robots.txt, sitemap.xml and the manifest are served", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toMatch(/Sitemap: .+\/sitemap\.xml/);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    const xml = await sitemap.text();
    expect(xml).toContain("/catalogue</loc>");

    const manifest = await request.get("/manifest.webmanifest");
    expect(manifest.ok()).toBe(true);
    expect(await manifest.json()).toMatchObject({ name: "ARAC Polywrap Limited", start_url: "/" });
  });

  test.describe("404", () => {
    test.use({ ignoredConsoleErrors: [/status of 404/] });

    test("unknown URLs return a branded 404 that is not indexed", async ({ page }) => {
      const response = await page.goto("/no-such-page");
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
      await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
        "content",
        /noindex/,
      );
    });
  });
});

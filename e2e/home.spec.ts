import { expect, test } from "./fixtures";

test.describe("home page", () => {
  test("renders the main landmarks and a single h1", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/ARAC Polywrap Limited/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("hero carousel moves between slides", async ({ page }) => {
    await page.goto("/");
    const carousel = page.getByRole("region", { name: "Highlights" });
    const active = carousel.locator('[aria-roledescription="slide"][data-active="true"]');

    await expect(active).toHaveAttribute("aria-label", "1 of 4");
    await carousel.getByRole("button", { name: "Next slide" }).click();
    await expect(active).toHaveAttribute("aria-label", "2 of 4");
    await carousel.getByRole("button", { name: /Show slide 4/ }).click();
    await expect(active).toHaveAttribute("aria-label", "4 of 4");
  });

  test("lists all six products", async ({ page }) => {
    await page.goto("/");
    const products = page.getByRole("region", { name: "Our products" });
    await expect(products.getByRole("heading", { level: 3 })).toHaveCount(6);
  });

  test("achievement counters reach their final values", async ({ page }) => {
    await page.goto("/");
    await page.locator("#achievements").scrollIntoViewIfNeeded();
    const values = page.getByTestId("count-up-display");
    await expect(values).toHaveText(["100+", "12+", "287+"], { timeout: 5_000 });
  });

  test("contact section offers phone, e-mail and map", async ({ page }) => {
    await page.goto("/");
    const contact = page.getByRole("region", { name: "Contact us" });
    await expect(contact.locator('a[href^="tel:"]')).toBeVisible();
    await expect(contact.locator('a[href^="mailto:"]')).toBeVisible();
    await expect(contact.locator("iframe[title]")).toHaveAttribute("loading", "lazy");
  });

  test("footer social links open safely in a new tab", async ({ page }) => {
    await page.goto("/");
    const social = page.getByRole("contentinfo").getByRole("list", { name: "Social media" });
    for (const link of await social.getByRole("link").all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
  });
});

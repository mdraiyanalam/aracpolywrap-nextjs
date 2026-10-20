import { expect, expectBelowHeader, test } from "./fixtures";

test.describe("section navigation (legacy bug: 'section calling doesn't work')", () => {
  test("desktop menu links scroll to their sections, clear of the sticky header", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "desktop menu only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const [label, id] of [
      ["Products", "products"],
      ["Contact", "contact"],
      ["Home", "home"],
    ] as const) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expectBelowHeader(page, `#${id}`);
    }
  });

  test("the header stays visible after scrolling", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.getByRole("banner")).toBeInViewport();
  });

  test("product shortcuts jump to a product", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Product shortcuts" })
      .getByRole("link", { name: "Protection film" })
      .click();
    await expectBelowHeader(page, "#protection-film");
  });

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile menu only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    const quoteButtons = page.getByRole("banner").getByRole("link", { name: "Request a quote" });

    // Regression (Sprint 1 review): the desktop call-to-action must not squeeze the mobile header.
    await expect(quoteButtons.filter({ visible: true })).toHaveCount(0);

    await toggle.click();
    await expect(quoteButtons.filter({ visible: true })).toHaveCount(1);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "Contact" })
      .click();

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expectBelowHeader(page, "#contact");
  });

  test("works without JavaScript because links are plain anchors", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator('header a[href="/#products"]').first()).toBeAttached();
    await page.goto("/#contact");
    await expect(page.locator("#contact")).toBeInViewport();
    await context.close();
  });
});

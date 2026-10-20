import { expect, expectBelowHeader, test } from "./fixtures";

test.describe("sections added in Sprint 2", () => {
  test("every menu item has a matching section on the page", async ({ page }) => {
    await page.goto("/");
    for (const id of ["services", "testimonials", "about", "download"]) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
    }
  });

  test("testimonials show four circular meters that fill when visible", async ({ page }) => {
    await page.goto("/");
    await page.locator("#testimonials").scrollIntoViewIfNeeded();
    const meters = page.getByRole("meter");
    await expect(meters).toHaveCount(4);
    for (const meter of await meters.all()) {
      await expect(meter).toHaveAttribute("aria-valuenow", /^\d+$/);
    }
  });

  test("the active section is highlighted in the desktop menu", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop menu only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    await nav.getByRole("link", { name: "Services" }).click();
    await expect(nav.getByRole("link", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "true",
    );

    await nav.getByRole("link", { name: "About" }).click();
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "true");
    await expect(nav.getByRole("link", { name: "Services" })).not.toHaveAttribute("aria-current");
  });

  test("back-to-top appears after scrolling and returns to the top", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Back to top" });
    await expect(button).toBeHidden();

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(button).toBeVisible();
    await button.click();

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });
});

test.describe("product catalogue page", () => {
  test("is reachable from the Download section", async ({ page }) => {
    await page.goto("/#download");
    await page
      .getByRole("region", { name: "Product catalogue" })
      .getByRole("link", { name: "View catalogue" })
      .click();
    await expect(page).toHaveURL(/\/catalogue\/?$/);
    await expect(page).toHaveTitle(/^Product catalogue \| ARAC Polywrap Limited$/);
  });

  test("lists all six products and offers print / save as PDF", async ({ page }) => {
    await page.goto("/catalogue");
    const headings = page.getByRole("main").getByRole("heading", { level: 2 });
    for (const name of [
      "Stretch film",
      "Shrink film",
      "FMCG lamination film",
      "Agricultural film",
      "Protection film",
      "Custom-made films",
    ]) {
      await expect(headings.filter({ hasText: new RegExp(`^${name}$`) })).toHaveCount(1);
    }
    await expect(page.getByRole("button", { name: "Print or save as PDF" })).toBeVisible();
  });

  test("hides site chrome when printed", async ({ page }) => {
    await page.goto("/catalogue");
    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("banner")).toBeHidden();
    await expect(page.getByRole("contentinfo")).toBeHidden();
    await expect(page.getByRole("button", { name: "Print or save as PDF" })).toBeHidden();
  });

  test("header links lead back to home-page sections", async ({ page, isMobile }) => {
    await page.goto("/catalogue");
    if (isMobile) {
      await page.getByRole("button", { name: "Menu" }).click();
      await page
        .getByRole("navigation", { name: "Mobile" })
        .getByRole("link", { name: "Services" })
        .click();
    } else {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "Services" })
        .click();
    }
    await expect(page).toHaveURL(/\/#services$/);
    await expectBelowHeader(page, "#services");
  });
});

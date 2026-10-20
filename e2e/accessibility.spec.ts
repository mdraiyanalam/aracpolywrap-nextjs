import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

async function scan(page: Page) {
  // Let entrance animations (counters, meters, carousel fade) settle before scanning.
  await page.emulateMedia({ reducedMotion: "reduce" });
  const results = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    // Third-party Google Maps frame: not our markup, and blocked in offline CI.
    .exclude("iframe")
    .analyze();
  return results.violations.map(({ id, impact, help, nodes }) => ({
    id,
    impact,
    help,
    targets: nodes.map((node) => node.target.join(" ")),
  }));
}

test.describe("accessibility (axe-core, WCAG 2.2 A/AA)", () => {
  for (const path of ["/", "/catalogue"]) {
    test(`${path} has no violations`, async ({ page }) => {
      await page.goto(path);
      expect(await scan(page)).toEqual([]);
    });
  }

  test.describe("404 page", () => {
    // The browser logs the document's own 404 status as a console error.
    test.use({ ignoredConsoleErrors: [/status of 404/] });

    test("has no violations", async ({ page }) => {
      await page.goto("/this-page-does-not-exist");
      expect(await scan(page)).toEqual([]);
    });
  });

  test("open mobile menu has no violations", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile menu only");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    expect(await scan(page)).toEqual([]);
  });

  test("skip link is the first focusable element and moves focus to main", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "keyboard navigation is a desktop concern");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });
});

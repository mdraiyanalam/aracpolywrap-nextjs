import { test as base, expect, type Page } from "@playwright/test";

/**
 * Every test fails if the page logs a console error or throws an uncaught exception
 * (automatic fixture — no need to request it).
 */
export const test = base.extend<{ consoleErrors: string[]; ignoredConsoleErrors: RegExp[] }>({
  /** Override per test file with `test.use({ ignoredConsoleErrors: [/…/] })`. */
  ignoredConsoleErrors: [[], { option: true }],
  consoleErrors: [
    async ({ page, ignoredConsoleErrors }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        // Third-party embeds (Google Maps) are outside our control and may be blocked offline/in CI.
        if (message.location().url.includes("google.com")) return;
        if (ignoredConsoleErrors.some((pattern) => pattern.test(message.text()))) return;
        errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** The sticky header covers the top of the viewport; content scrolled to must sit below it. */
export async function expectBelowHeader(page: Page, selector: string) {
  const headerBox = await page.locator("header").first().boundingBox();
  await expect
    .poll(async () => (await page.locator(selector).boundingBox())?.y ?? -1, { timeout: 5_000 })
    .toBeGreaterThanOrEqual(Math.floor(headerBox?.height ?? 0) - 1);
  await expect(page.locator(selector)).toBeInViewport();
}

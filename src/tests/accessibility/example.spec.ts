import { expect } from "@playwright/test";
import { test } from "../../hooks";
import { logger } from "../../utils/logger";

test.describe("Accessibility Tests", () => {
  test("page should have no title missing", async ({ page }) => {
    logger.step("Navigating to Playwright homepage");
    await page.goto("https://playwright.dev");

    const title = await page.title();
    logger.info(`Page title fetched: "${title}"`);

    expect(title).not.toBe("");
    logger.success("Page title is not empty ✅");
  });

  test("logo should have alt text", async ({ page }) => {
    logger.step("Navigating to Playwright homepage");
    await page.goto("https://playwright.dev");

    const logo = await page.locator("//img[@alt='Playwright logo']");
    await expect(logo).toBeVisible();

    logger.success("Playwright logo is visible with alt text ✅");
  });

  test("skip link should be visible for keyboard users", async ({ page }) => {
    logger.step("Navigating to Playwright homepage");
    await page.goto("https://playwright.dev");

    logger.info("Pressing Tab key to focus skip link");
    await page.keyboard.press("Tab");

    const skipLink = await page.locator('//a[@class="getStarted_Sjon"]');
    await expect(skipLink).toBeVisible();

    logger.success("Skip link is visible for keyboard users ✅");
  });
});

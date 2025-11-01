import { expect } from "@playwright/test";
import { test } from "../../hooks";
import { logger } from "../../utils/logger";

test.describe("Performance Tests", () => {
  test("homepage loads under 3 seconds", async ({ page }) => {
    logger.step("Measuring homepage load time");
    const start = Date.now();
    await page.goto("https://playwright.dev");
    const loadTime = Date.now() - start;
    logger.info(`Homepage loaded in ${loadTime} ms`);

    expect(loadTime).toBeLessThan(3000);
    logger.success("Homepage load time is under 3 seconds ✅");
  });

  test("navigation is quick", async ({ page }) => {
    logger.step("Measuring navigation speed to Get Started page");
    await page.goto("https://playwright.dev");
    const start = Date.now();
    await page.click('a:has-text("Get started")');
    const loadTime = Date.now() - start;
    logger.info(`Navigation took ${loadTime} ms`);

    expect(loadTime).toBeLessThan(3000);
    logger.success("Navigation completed in under 3 seconds ✅");
  });

  test("page renders the docs content", async ({ page }) => {
    logger.step("Checking if docs content renders correctly");
    await page.goto("https://playwright.dev/docs/intro");
    const heading = await page.locator("h1");
    await expect(heading).toHaveText(/Installation/);
    logger.success("Docs page rendered with correct heading ✅");
  });
});

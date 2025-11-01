import { expect } from "@playwright/test";
import { test } from "../../hooks";
import { logger } from "../../utils/logger";

test.describe("Regression Tests", () => {
  test("verify homepage title", async ({ page }) => {
    logger.step("Navigating to the homepage");
    await page.goto("https://playwright.dev");

    logger.info("Checking if the page title contains 'Playwright'");
    await expect(page).toHaveTitle(/Playwright/);
    logger.success("Homepage title verified ✅");
  });

  test("verify navbar links exist", async ({ page }) => {
    logger.step("Opening homepage to verify navbar links");
    await page.goto("https://playwright.dev");

    const links = page.locator("nav a");
    const count = await links.count();
    logger.info(`Found ${count} navbar links`);

    expect(count).toBeGreaterThan(0);
    logger.success("Navbar links are present ✅");
  });

  test("verify footer visibility", async ({ page }) => {
    logger.step("Checking if footer is visible on the homepage");
    await page.goto("https://playwright.dev");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    logger.success("Footer is visible ✅");
  });
});

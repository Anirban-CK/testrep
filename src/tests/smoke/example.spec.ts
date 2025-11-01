import { expect } from "@playwright/test";
import { test } from "../../hooks";
import { logger } from "../../utils/logger";

test.describe("Smoke Tests", () => {
  test("homepage loads", async ({ page }) => {
    logger.step("Navigating to homepage");
    await page.goto("https://playwright.dev");

    logger.info("Verifying page title contains 'Playwright'");
    await expect(page).toHaveTitle(/Playwright/);
    logger.success("Homepage loaded successfully ✅");
  });

  test("get started link works", async ({ page }) => {
    logger.step("Opening homepage to check 'Get started' link");
    await page.goto("https://playwright.dev");

    logger.info("Clicking on 'Get started' link");
    await page.getByRole("link", { name: "Get started" }).click();

    logger.info("Verifying Installation heading is visible");
    await expect(
      page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
    logger.success("'Get started' link works correctly ✅");
  });

  test("docs page is accessible", async ({ page }) => {
    logger.step("Navigating to Playwright docs intro page");
    await page.goto("https://playwright.dev/docs/intro");

    logger.info("Checking if 'Installation' heading is present");
    await expect(page.locator("h1")).toContainText("Installation");
    logger.success("Docs page is accessible ✅");
  });
});

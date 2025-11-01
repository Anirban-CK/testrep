import { expect } from "@playwright/test";
import { test } from "../hooks";
import { logger } from "../utils/logger";

test("has title", { tag: "@fast" }, async ({ page }) => {
  logger.step("Navigating to Playwright homepage");
  await page.goto("https://playwright.dev/");

  logger.info("Checking page title contains 'Playwright'");
  await expect(page).toHaveTitle(/Playwright/);
  logger.success("Page title verification passed ✅");
});

test("get started link", async ({ page }) => {
  logger.step("Navigating to Playwright homepage");
  await page.goto("https://playwright.dev/");

  logger.info("Clicking 'Get started' link");
  await page.getByRole("link", { name: "Get started" }).click();

  logger.info("Verifying 'Installation' heading is visible");
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
  logger.success("'Get started' link works correctly ✅");
});

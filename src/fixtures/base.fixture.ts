import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login/LoginPage";
import { HomePage } from "../pages/home/HomePage";
import { config } from "../config/environments";
import { logger } from "../logger/Logger";

type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    logger.info("Initializing LoginPage fixture");
    const loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    logger.info("Initializing HomePage fixture");
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from "@playwright/test";

import { test, expect } from "../../../fixtures/base.fixture";
import { config } from "../../../config/environments";
import { logger } from "../../../logger/Logger";
import * as allure from "allure-js-commons";

test.describe("Home Page Functionality", () => {
  test.beforeEach(async ({ loginPage, homePage }) => {
    await allure.epic("E-commerce");
    await allure.feature("Product Catalog");

    logger.testStart("Home Page Test Setup");
    const user = config.users.standard;
    await loginPage.login(user.username, user.password);
    await expect(homePage.isHomePageDisplayed()).resolves.toBe(true);
  });

  test("TC005 - Should display products on home page", async ({ homePage }) => {
    await allure.severity("critical");
    await allure.story("View Products");

    logger.testStart("TC005 - Display Products");

    // Assert
    const itemsCount = await homePage.getInventoryItemsCount();
    expect(itemsCount).toBeGreaterThan(0);

    await allure.attachment("Items Count", String(itemsCount), "text/plain");
    logger.info(`Products displayed: ${itemsCount}`);

    logger.testEnd("TC005 - Display Products", "PASSED");
  });

  test("TC006 - Should add item to cart", async ({ homePage }) => {
    await allure.severity("critical");
    await allure.story("Add to Cart");

    logger.testStart("TC006 - Add to Cart");

    // Act
    await homePage.addItemToCart(0);

    // Assert
    const cartCount = await homePage.getCartItemCount();
    expect(cartCount).toBe("1");

    logger.testEnd("TC006 - Add to Cart", "PASSED");
  });

  test("TC007 - Should logout successfully", async ({ homePage, loginPage }) => {
    await allure.severity("high");
    await allure.story("Logout");

    logger.testStart("TC007 - Logout");

    // Act
    await homePage.logout();

    // Assert
    await expect(loginPage.isLoginPageDisplayed()).resolves.toBe(true);

    logger.testEnd("TC007 - Logout", "PASSED");
  });
});

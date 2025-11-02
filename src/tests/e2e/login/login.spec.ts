import { test, expect } from "../../../fixtures/base.fixture";
import { config } from "../../../config/environments";
import { logger } from "../../../logger/Logger";
import { ERROR_MESSAGES } from "../../../data/constants/errorMessages";
import { users } from "../../../data/testData/users";
import * as allure from "allure-js-commons";

/**
 * @description Verify that login functionality is working as expected
 * @since 2025-11-01
 */
test.describe("Login Functionality", { tag: ["@login"] }, () => {
  test.beforeAll(async () => {
    logger.testStart("Login Test Setup");
    await allure.epic("Authentication");
    await allure.feature("Login");
  });

  /**
   * @name TC001 - Should login successfully with valid credentials
   * @description TC001 - Should login successfully with valid credentials
   * @author Anirban Mishra <anirban.mishra@cloudkaptan.com>
   * @createdBy   Anirban Mishra on 2025-11-01
   * @modifiedBy  ANIRBAN MISHRA <anirbanmishra7005@gmail.com> on 2025-11-02
   */
  test("TC001 - Should login successfully with valid credentials", async ({
    loginPage,
    homePage,
  }) => {
    await allure.severity("critical");
    await allure.story("Successful Login");

    logger.testStart("TC001 - Valid Login");

    // Arrange
    const user = config.users.standard;
    await allure.parameter("username", user.username);

    // Act
    await loginPage.login(user.username, user.password);

    // Assert
    await expect(homePage.isHomePageDisplayed()).resolves.toBe(true);
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toBe("Products");

    logger.testEnd("TC001 - Valid Login", "PASSED");
  });

  /**
   * @name TC002 - Should show error for locked out user
   * @description TC002 - Should show error for locked out user
   * @author Anirban Mishra <anirban.mishra@cloudkaptan.com>
   * @createdBy   Anirban Mishra on 2025-11-01
   * @modifiedBy  ANIRBAN MISHRA <anirbanmishra7005@gmail.com> on 2025-11-02
   */
  test("TC002 - Should show error for locked out user", async ({
    loginPage,
  }) => {
    await allure.severity("high");
    await allure.story("Failed Login - Locked User");

    logger.testStart("TC002 - Locked User Login");

    // Arrange
    const lockedUser = users.invalidUsers[0];

    // Act
    await loginPage.login(lockedUser.username, lockedUser.password);

    // Assert
    await expect(loginPage.isErrorDisplayed()).resolves.toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(ERROR_MESSAGES.LOCKED_OUT);

    await loginPage.takeScreenshot("locked-user-error");

    logger.testEnd("TC002 - Locked User Login", "PASSED");
  });

  /**
   * @name TC003 - Should show error for invalid credentials
   * @description TC003 - Should show error for invalid credentials
   * @author Anirban Mishra <anirban.mishra@cloudkaptan.com>
   * @createdBy   Anirban Mishra on 2025-11-01
   * @modifiedBy 12345tyh
   */
  test("TC003 - Should show error for invalid credentials", async ({
    loginPage,
  }) => {
    await allure.severity("high");
    await allure.story("Failed Login - Invalid Credentials");

    logger.testStart("TC003 - Invalid Credentials");

    // Arrange...
    const invalidUser = users.invalidUsers[1];

    // Act
    await loginPage.login(invalidUser.username, invalidUser.password);

    // Assert
    await expect(loginPage.isErrorDisplayed()).resolves.toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS);

    logger.testEnd("TC003 - Invalid Credentials", "PASSED");
  });

  /**
   * @name TC004 - Should show error when username is empty
   * @description TC004 - Should show error when username is empty
   * @author Anirban Mishra <anirban.mishra@cloudkaptan.com>
   * @createdBy   Anirban Mishra on 2025-11-01
   * @modifiedBy  ANIRBAN MISHRA <anirbanmishra7005@gmail.com> on 2025-11-02
   */
  test("TC004 - Should show error when username is empty", async ({
    loginPage,
  }) => {
    await allure.severity("medium");
    await allure.story("Failed Login - Empty Username");

    logger.testStart("TC004 - Empty Username");

    // Act
    await loginPage.login("", "secret_sauce");

    // Assert
    await expect(loginPage.isErrorDisplayed()).resolves.toBe(true);
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain(ERROR_MESSAGES.USERNAME_REQUIRED);

    logger.testEnd("TC004 - Empty Username", "PASSED");
  });
});

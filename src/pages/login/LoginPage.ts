import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { logger } from "../../logger/Logger";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator = this.page.locator(
    '[data-test="username"]'
  );
  private readonly passwordInput: Locator = this.page.locator(
    '[data-test="password"]'
  );
  private readonly loginButton: Locator = this.page.locator(
    '[data-test="login-button"]'
  );
  private readonly errorMessage: Locator = this.page.locator(
    '[data-test="error"]'
  );
  private readonly logoImage: Locator = this.page.locator(".login_logo");

  /**
   * @param page
   * @constructor
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * @param username
   * @param password
   */
  async login(username: string, password: string) {
    logger.info(`Attempting login with username: ${username}`);
    await this.fill(this.usernameInput, username, "Username");
    await this.fill(this.passwordInput, password, "Password");
    await this.click(this.loginButton, "Login Button");
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    logger.step("Checking if login page is displayed");
    return await this.logoImage.isVisible();
  }

  /**
   * @returns {Promise<string>}
   */
  async getErrorMessage(): Promise<string> {
    logger.step("Getting error message");
    return await this.getText(this.errorMessage);
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}

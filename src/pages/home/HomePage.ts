import type { Locator, Page } from '@playwright/test'
import { BasePage } from '../base/BasePage'
import { logger } from '../../logger/Logger'

export class HomePage extends BasePage {
  private readonly pageTitle: Locator = this.page.locator('.title')
  private readonly inventoryItems: Locator = this.page.locator('.inventory_item')
  private readonly shoppingCartBadge: Locator = this.page.locator('.shopping_cart_badge')
  private readonly hamburgerMenu: Locator = this.page.locator('#react-burger-menu-btn')
  private readonly logoutLink: Locator = this.page.locator('#logout_sidebar_link')
  private readonly addToCartButtons: Locator = this.page.locator('[data-test^="add-to-cart"]')

  /**
   * @param page
   * @constructor
   */
  constructor(page: Page) {
    super(page)
  }

  /**
   * @returns {Promise<boolean>}
   */
  async isHomePageDisplayed(): Promise<boolean> {
    logger.step('Checking if home page is displayed')
    return await this.pageTitle.isVisible()
  }

  /**
   * @returns {Promise<string>}
   */
  async getPageTitle(): Promise<string> {
    logger.step('Getting page title')
    return await this.getText(this.pageTitle)
  }

  /**
   * @returns {Promise<number>}
   */
  async getInventoryItemsCount(): Promise<number> {
    logger.step('Getting inventory items count')
    const count = await this.inventoryItems.count()
    logger.info(`Found ${count} inventory items`)
    return count
  }

  /**
   * @returns {Promise<void>}
   */
  async addItemToCart(itemIndex: number = 0): Promise<void> {
    logger.step(`Adding item ${itemIndex} to cart`)
    await this.click(this.addToCartButtons.nth(itemIndex), `Add to Cart Button ${itemIndex}`)
  }

  /**
   * @returns {Promise<string>}
   */
  async getCartItemCount(): Promise<string> {
    logger.step('Getting cart item count')
    return await this.getText(this.shoppingCartBadge)
  }

  /**
   * @returns {Promise<void>}
   */
  async logout(): Promise<void> {
    logger.step('Logging out')
    await this.click(this.hamburgerMenu, 'Hamburger Menu')
    await this.waitForElement(this.logoutLink, 'Logout Link')
    await this.click(this.logoutLink, 'Logout Link')
  }
}

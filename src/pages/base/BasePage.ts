import type { Page, Locator } from '@playwright/test'
import { logger } from '../../logger/Logger'
import * as allure from 'allure-js-commons'

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigate(url: string): Promise<void> {
    logger.step(`Navigating to: ${url}`)
    await allure.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url)
    })
  }

  async click(locator: Locator, elementName: string = 'element'): Promise<void> {
    logger.step(`Clicking on: ${elementName}`)
    await allure.step(`Click on ${elementName}`, async () => {
      await locator.click()
    })
  }

  async fill(locator: Locator, text: string, fieldName: string = 'field'): Promise<void> {
    logger.step(`Filling '${fieldName}' with: ${text}`)
    await allure.step(`Fill ${fieldName}`, async () => {
      await locator.fill(text)
    })
  }

  async getText(locator: Locator): Promise<string> {
    const text = (await locator.textContent()) || ''
    logger.debug(`Retrieved text: ${text}`)
    return text
  }

  async waitForElement(locator: Locator, elementName: string = 'element'): Promise<void> {
    logger.step(`Waiting for: ${elementName}`)
    await allure.step(`Wait for ${elementName}`, async () => {
      await locator.waitFor({ state: 'visible' })
    })
  }

  async takeScreenshot(name: string): Promise<void> {
    logger.step(`Taking screenshot: ${name}`)
    const screenshot = await this.page.screenshot()
    await allure.attachment(name, screenshot, 'image/png')
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title()
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url()
  }
}

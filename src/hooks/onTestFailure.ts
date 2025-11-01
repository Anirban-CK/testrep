import { logger } from "@/utils/logger";
import {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from "@playwright/test";

export const testOnFailure = (
  test: TestType<
    PlaywrightTestArgs & PlaywrightTestOptions,
    PlaywrightWorkerArgs & PlaywrightWorkerOptions
  >
) =>
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
      logger.error(`TEST FAILED: ${testInfo.title}`, {
        context: testInfo.file,
      });

      if (page) {
        const screenshotPath = `artifacts/screenshots/${testInfo.title
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        await page.screenshot({ path: screenshotPath });
        logger.info(`Screenshot saved: ${screenshotPath}`, {
          context: testInfo.file,
        });
      }
    }
  });

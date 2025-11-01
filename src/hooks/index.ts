import { test as base, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import path from "path";
import { getLogger } from "@/utils/logger";
import type { Log4jsLogger, WinstonLogger } from "@/utils/logging";

type IBaseTestFixture = {
  logger: WinstonLogger | Log4jsLogger;
  runId: string;
};
const BaseTestFixture: IBaseTestFixture = {
  logger: getLogger(),
  runId: "aaaaaaaaaaaaaaaa",
};

// Extend Playwright test
let test = base.extend<IBaseTestFixture>({
  logger: async ({}, use) => {
    await use(BaseTestFixture.logger);
  },
  runId: async ({}, use) => {
    await use(BaseTestFixture.runId);
  },
});

// test.beforeEach(async ({ logger }, testInfo) => {
//   logger.step(`STARTING TEST: ${testInfo.title}`, { context: testInfo.file });
// });

// test.afterEach(async ({ page, logger }, testInfo) => {
//   if (testInfo.status === "failed") {
//     logger.error(`TEST FAILED: ${testInfo.title}`, {
//       context: testInfo.file,
//     });

//     if (page) {
//       const screenshotPath = `artifacts/screenshots/${testInfo.title
//         .replace(/\s+/g, "_")
//         .toLowerCase()}.png`;
//       await page.screenshot({ path: screenshotPath });
//       logger.info(`Screenshot saved: ${screenshotPath}`, {
//         context: testInfo.file,
//       });
//     }
//   }
// });

// test.afterEach(async ({ logger, runId }, testInfo) => {
//   const reportPath = path.join("reports/html", `run-${runId}`, "index.html");

//   const status = testInfo.status?.toUpperCase() || "UNKNOWN";
//   const context = testInfo.file;

//   // 🧾 Log to your custom logger
//   logger.step(`ENDING TEST: ${testInfo.title}`, { context });
//   logger.info(`Test status: ${status}`, { context });

//   if (status === "FAILED") {
//     logger.error(`Test failed. Check traces and screenshots.`, { context });
//   }

//   // 🧠 Add Allure steps for detailed report
//   allure.step(`Test ${status}`, async () => {});
//   allure.description(`Test file: ${context}`);
//   allure.link(`HTML Report`, reportPath);

//   // Optional: tag report with runId
//   allure.label("runId", runId);

//   logger.success(`Report available at: ${reportPath}`);
// });

// registerLifecycleHooks(test);
export { test, expect };

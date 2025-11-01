import { logger } from "@/utils/logger";
import { allure } from "allure-playwright";
import {
  TestType,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
} from "@playwright/test";
import path from "path";
import crypto from "crypto";

const runId = process.env.RUN_ID || crypto.randomUUID().substring(0, 8);

export const testOnEnd = (
  test: TestType<
    PlaywrightTestArgs & PlaywrightTestOptions,
    PlaywrightWorkerArgs & PlaywrightWorkerOptions
  >
) =>
  test.afterEach(async ({}, testInfo) => {
    const reportPath = path.join("reports/html", `run-${runId}`, "index.html");

    const status = testInfo.status?.toUpperCase() || "UNKNOWN";
    const context = testInfo.file;

    // 🧾 Log to your custom logger
    logger.step(`ENDING TEST: ${testInfo.title}`, { context });
    logger.info(`Test status: ${status}`, { context });

    if (status === "FAILED") {
      logger.error(`Test failed. Check traces and screenshots.`, { context });
    }

    // 🧠 Add Allure steps for detailed report
    allure.step(`Test ${status}`, async () => {});
    allure.description(`Test file: ${context}`);
    allure.link(`HTML Report`, reportPath);

    // Optional: tag report with runId
    allure.label("runId", runId);

    logger.success(`Report available at: ${reportPath}`);
  });

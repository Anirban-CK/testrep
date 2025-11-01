import { logger } from "@/utils/logger";
import {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from "@playwright/test";

export const testOnStart = (
  test: TestType<
    PlaywrightTestArgs & PlaywrightTestOptions,
    PlaywrightWorkerArgs & PlaywrightWorkerOptions
  >
) =>
  test.beforeEach(async ({}, testInfo) => {
    logger.step(`STARTING TEST: ${testInfo.title}`, { context: testInfo.file });
  });

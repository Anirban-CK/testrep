import fs from "fs";
import { allure } from "allure-playwright";
import { logger } from "../logger";

export function attachLogFile(logPath: string) {
  if (fs.existsSync(logPath)) {
    allure.attachment("Execution Log", fs.readFileSync(logPath), "text/plain");
    logger.info("Attached execution log to Allure report");
  }
}

export function attachScreenshot(path: string) {
  if (fs.existsSync(path)) {
    allure.attachment("Screenshot", fs.readFileSync(path), "image/png");
  }
}

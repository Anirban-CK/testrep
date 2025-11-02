import { FullConfig } from "@playwright/test";
import { logger } from "../logger/Logger";

const globalTeardown = async (config: FullConfig) => {
  logger.teardown("🧹 Cleaning up test session...");
};

export default globalTeardown;

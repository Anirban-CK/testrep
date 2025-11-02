import { FullConfig } from "@playwright/test";
import { logger } from "../logger/Logger";

const globalSetup = async (config: FullConfig) => {
  logger.setup("🔧 Running Global Setup...");
  return async () => {};
};

export default globalSetup;

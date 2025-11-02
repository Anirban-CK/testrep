import winston from "winston";
import { LoggerSetup } from "./LogManager";

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger(LoggerSetup);
  }

  info(message: string, meta?: unknown[]) {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: unknown[]) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: unknown[]) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: unknown[]) {
    this.logger.debug(message, meta);
  }

  step(message: string, meta?: unknown[]) {
    this.logger.info(`🔹 STEP: ${message}`, meta);
  }

  testStart(testName: string) {
    this.logger.info(`${"=".repeat(50)}`);
    this.logger.info(`🧪 TEST STARTED: ${testName}`);
  }

  testEnd(testName: string, status: "PASSED" | "FAILED") {
    const emoji = status === "PASSED" ? "✅" : "❌";
    this.logger.info(`${emoji} TEST ${status}: ${testName}`);
    this.logger.info(`${"=".repeat(50)}`);
  }
  setup(msg: string) {
    this.logger.warn(`${"#".repeat(50)}`);
    this.logger.warn(`${msg}`);
    this.logger.warn(`${"#".repeat(50)}`);
  }

  teardown(msg: string) {
    this.logger.warn(`${"#".repeat(50)}`);
    this.logger.warn(`${msg}`);
    this.logger.warn(`${"#".repeat(50)}`);
  }
}

export const logger = new Logger();

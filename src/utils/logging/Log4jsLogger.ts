import fs from "fs";
import path from "path";
import crypto from "crypto";
import log4js, { Logger } from "log4js";
import { LogOptions } from "@/types";

export class Log4jsLogger {
  private logger: Logger;
  private logFile: string;
  private runId: string;

  constructor() {
    // Generate a unique run ID per execution
    this.runId = crypto.randomUUID().substring(0, 8);

    // Create logs directory if it doesn't exist
    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Create a unique log file per run
    this.logFile = path.join(
      logDir,
      `test-run-${new Date().toISOString().split("T")[0]}-run-${this.runId}.log`
    );

    // Configure Log4js
    log4js.configure({
      appenders: {
        console: {
          type: "console",
          layout: {
            type: "pattern",
            pattern: "%[[%p]%] %d{yyyy-MM-dd hh:mm:ss} - %m",
          },
        },
        file: {
          type: "file",
          filename: this.logFile,
          layout: {
            type: "pattern",
            pattern: "[%p] %d{yyyy-MM-dd hh:mm:ss} - %m",
          },
        },
      },
      categories: {
        default: { appenders: ["console", "file"], level: "debug" },
      },
    });

    // Create logger instance
    this.logger = log4js.getLogger("PlaywrightLogger");
  }

  private formatMessage(message: string, options?: LogOptions): string {
    return options?.context ? `[${options.context}] ${message}` : message;
  }

  info(message: string, options?: LogOptions) {
    this.logger.info(this.formatMessage(message, options));
  }

  warn(message: string, options?: LogOptions) {
    this.logger.warn(this.formatMessage(message, options));
  }

  error(message: string, options?: LogOptions) {
    this.logger.error(this.formatMessage(message, options));
  }

  debug(message: string, options?: LogOptions) {
    this.logger.debug(this.formatMessage(message, options));
  }

  success(message: string, options?: LogOptions) {
    this.logger.info(`SUCCESS - ${this.formatMessage(message, options)}`);
  }

  step(message: string, options?: LogOptions) {
    this.logger.debug(`STEP - ${this.formatMessage(message, options)}`);
  }

  clear() {
    fs.writeFileSync(this.logFile, "");
    console.log(`Cleared logs at ${this.logFile}`);
  }

  getLogFilePath(): string {
    return this.logFile;
  }

  getRunId(): string {
    return this.runId;
  }
}

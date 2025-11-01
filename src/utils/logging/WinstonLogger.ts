import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  createLogger,
  format,
  transports,
  Logger as WinstonBaseLogger,
} from "winston";
import { ILogOptions } from "@/types";

export class WinstonLogger {
  private logger: WinstonBaseLogger;
  private logFile: string;
  private runId: string;

  constructor() {
    // Generate unique run ID for this session
    this.runId = crypto.randomUUID().substring(0, 8);

    // Create logs directory if it doesn't exist
    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Define log file path
    this.logFile = path.join(
      logDir,
      `test-run-${new Date().toISOString().split("T")[0]}-run-${this.runId}.log`
    );

    // Create Winston logger instance
    this.logger = createLogger({
      level: "debug",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
          ({ timestamp, level, message }) =>
            `[${level.toUpperCase()}] ${timestamp} - ${message}`
        )
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: this.logFile }),
      ],
    });
    this.logger.info("LOGGER INITIALISED");
  }

  private formatMessage(message: string, options?: ILogOptions): string {
    return options?.context ? `[${options.context}] ${message}` : message;
  }

  info(message: string, options?: ILogOptions) {
    this.logger.info(this.formatMessage(message, options));
  }

  warn(message: string, options?: ILogOptions) {
    this.logger.warn(this.formatMessage(message, options));
  }

  error(message: string, options?: ILogOptions) {
    this.logger.error(this.formatMessage(message, options));
  }

  debug(message: string, options?: ILogOptions) {
    this.logger.debug(this.formatMessage(message, options));
  }

  success(message: string, options?: ILogOptions) {
    this.logger.info(`SUCCESS - ${this.formatMessage(message, options)}`);
  }

  step(message: string, options?: ILogOptions) {
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

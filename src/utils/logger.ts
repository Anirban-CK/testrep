import { Log4jsLogger, WinstonLogger } from "./logging";
import config from "@/config/env.config";

// export const logger =
//   config.LOG_SYSTEM === "winston"
//     ? new Log4jsLogger()
//     : config.LOG_SYSTEM === "log4js"
//     ? new WinstonLogger()

export const logger = new WinstonLogger();

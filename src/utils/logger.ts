import { ILogSystem } from "@/types";
import { Log4jsLogger, WinstonLogger } from "./logging";
import config from "@/config/env.config";

// export const logger =
//   config.LOG_SYSTEM === "winston"
//     ? new WinstonLogger()
//     : config.LOG_SYSTEM === "log4js"
//     ? new Log4jsLogger()
//     : new WinstonLogger();

// export const getLogger = () => {
//   console.log("Logger initialized!");

//   return config.LOG_SYSTEM === "winston"
//     ? new WinstonLogger()
//     : config.LOG_SYSTEM === "log4js"
//     ? new Log4jsLogger()
//     : new WinstonLogger();
// };

let loggerInstance: WinstonLogger | Log4jsLogger | null = null;

export const getLogger = (): WinstonLogger | Log4jsLogger => {
  if (!loggerInstance) {
    console.log("Logger initialized only once ✅");
    switch (config.LOG_SYSTEM as ILogSystem) {
      case "log4js":
        loggerInstance = new Log4jsLogger();
        break;
      case "winston":
      default:
        loggerInstance = new WinstonLogger();
    }
  }
  return loggerInstance;
};

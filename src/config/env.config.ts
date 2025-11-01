import crypto from "crypto";
import devEnv from "./environments/dev.env";
import stagingEnv from "./environments/staging.env";
import prodEnv from "./environments/prod.env";
import { devices } from "@playwright/test";
import { EnvConfig, LogSystem } from "@/types";

const env = process.env.NODE_ENV || "development";

const RUN_ID = crypto.randomUUID().substring(0, 8);
const LOG_SYSTEM: LogSystem =
  process.env.LOG_SYSTEM === "log4js" ? "log4js" : "winston";

let config: EnvConfig;

switch (env) {
  case "production":
    config = prodEnv;
    break;
  case "staging":
    config = stagingEnv;
    break;
  default:
    config = devEnv;
    break;
}

const PROJECTS = [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },
];

// Expose everything as a single object
export default { ...config, LOG_SYSTEM, RUN_ID, PROJECTS };

import { devConfig } from "./dev.config";
import { stagingConfig } from "./staging.config";
import { prodConfig } from "./prod.config";

const ENV = process.env.ENV || "dev";

const configs = {
  dev: devConfig,
  staging: stagingConfig,
  prod: prodConfig,
};

export const config = configs[ENV as keyof typeof configs] || devConfig;

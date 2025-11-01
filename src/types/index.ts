export type EnvConfig = {
  NODE_ENV: string;
  HEADLESS?: boolean;
};

export type LogSystem = "winston" | "log4js";

export type LogOptions = {
  context?: string;
};

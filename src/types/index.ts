export type IEnvConfig = {
  NODE_ENV: string;
  HEADLESS?: boolean;
};
export type ILogSystem = "winston" | "log4js";

export type ILogOptions = {
  context?: string;
};

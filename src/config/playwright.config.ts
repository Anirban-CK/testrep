import { defineConfig } from "@playwright/test";
import path from "path";
import env from "./env.config";

export default defineConfig({
  testDir: path.join(__dirname, "../tests"),
  timeout: 60 * 1000,
  fullyParallel: true,
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: path.join(
          process.cwd(),
          "reports/html",
          `run-${env.RUN_ID}`
        ),
      },
    ],
    [
      "allure-playwright",
      {
        outputFolder: path.join(
          process.cwd(),
          "reports/allure-results",
          `run-${env.RUN_ID}`
        ),
      },
    ],
  ],

  use: {
    headless: process.env.HEADLESS === "true",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  projects: env.PROJECTS,
  outputDir: path.join(process.cwd(), "artifacts/test-output"),
});

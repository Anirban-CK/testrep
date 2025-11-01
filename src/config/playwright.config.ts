import { defineConfig, devices } from "@playwright/test";
import path from "path";

const runId = crypto.randomUUID().substring(0, 8);
export default defineConfig({
  testDir: path.join(__dirname, "../tests"),
  timeout: 60 * 1000,
  fullyParallel: true,
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: path.join(process.cwd(), "reports/html", `run-${runId}`),
      },
    ],
    [
      "allure-playwright",
      {
        outputFolder: path.join(
          process.cwd(),
          "reports/allure-results",
          `run-${runId}`
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

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  outputDir: path.join(process.cwd(), "artifacts/test-output"),
});

# Project Overview — PlaywrightTest

**Very brief, comprehensive summary of structure, architecture, scripts, and how to run/tests.**

## Repository tree (top-level view)

```text
- playwright_inspect
  - PlaywrightTest
    - .env.example
    - .gitignore
    - .prettierignore
    - .prettierrc
    - README.md
    - eslint.config.js
    - package-lock.json
    - package.json
    - playwright.config.ts
    - tsconfig.json
    - .github
      - workflows
        - ci.yml
        - nightly.yml
        - playwright.yml
    - .husky
      - pre-commit
      - _
        - .gitignore
        - applypatch-msg
        - commit-msg
        - h
        - husky.sh
        - post-applypatch
        - post-checkout
        - post-commit
        - post-merge
        - post-rewrite
        - pre-applypatch
        - pre-auto-gc
        - pre-commit
        - pre-merge-commit
        - pre-push
        - pre-rebase
        - prepare-commit-msg
    - allure-report
      - app.js
      - favicon.ico
      - index.html
      - styles.css
      - data
        - behaviors.csv
        - behaviors.json
        - categories.csv
        - categories.json
        - packages.json
        - suites.csv
        - suites.json
        - timeline.json
        - attachments
          - 22b0c5303a3f6ddb.txt
          - 39494beec932fabd.txt
          - 3ad49b82344b875c.txt
          - 423e5efff24aac31.txt
          - 6b4d604da4ea9057.png
          - 81eaac338d90d1ec.txt
          - a3babb259fbb7ee8.txt
          - ad08942c39ae7586.txt
          - b1693cb5e364dd8a.txt
          - b73f15f6a5fa2389.txt
          - bb3bb02aa263f8b5.txt
          - c08b3945b50310ae.png
          - d6be4e819b70379b.txt
          - e9234359bb41e8be.txt
          - e9dfd498107dd4e3.txt
          - faec3e9673059b28.txt
          - ff202f485a077246.txt
          - ff3254504ccf5df9.txt
        - test-cases
          - 338d4b774b2eadcf.json
          - 342b2cceb54af517.json
          - 3ec96b63abd2598b.json
          - 4d5a4f9de313d94e.json
          - 4fa007ceec21db26.json
          - 602b13307bdeac3d.json
          - 64c4a5ce55391728.json
          - 83e6f28ce6f1e1cc.json
          - a59d59f16076f8ad.json
          - a725ee4788358294.json
          - a85df80a95f431f7.json
          - a893994cfd18af4b.json
          - dc1832acd26d28e6.json
          - e3c143803dc816c1.json
      - export
        - influxDbData.txt
        - mail.html
        - prometheusData.txt
      - history
        - categories-trend.json
        - duration-trend.json
        - history-trend.json
        - history.json
        - retry-trend.json
      - plugin
        - behaviors
          - index.js
        - packages
          - index.js
        - screen-diff
          - index.js
          - styles.css
      - widgets
        - behaviors.json
        - categories-trend.json
        - categories.json
        - duration-trend.json
        - duration.json
        - environment.json
        - executors.json
        - history-trend.json
        - launch.json
        - retry-trend.json
        - severity.json
        - status-chart.json
        - suites.json
        - summary.json
    - allure-results
      - 10e9c422-40eb-47ec-956e-ab795f8b6510-result.json
      - 159f9f46-9cf1-4002-87ec-0c8c08a12aee-attachment.txt
      - 15afa9da-e29b-4af2-82a5-7adc6311f24d-result.json
      - 168e1898-921f-4891-bd37-d87727339d32-attachment.png
      - 217ab6ee-7077-4ca9-a5d2-8679244626d2-attachment.txt
      - 279c94b5-c1f9-4ad5-bb1f-b76535aa5a8f-result.json
      - 2f63418a-7bae-42f7-bdad-ead9caae95b9-result.json
      - 4c7188bb-2de8-402d-9210-877062557fa5-attachment.png
      - 60c63de1-197b-4b3b-b1d3-fe324ef65337-attachment.txt
      - 73e727f3-576b-4bce-a5bd-5ac399117db5-attachment.txt
      - 7af537fb-0e45-43ee-8cc3-caea0a839064-result.json
      - 86ac4e2c-aa0d-4977-89eb-ff2bdfeb1e72-attachment.txt
      - 8756e0a0-f2c8-4389-88a8-e03ee253c9f7-attachment.txt
      - 9361cd0a-e024-4d20-bed5-7f2907d31f74-attachment.txt
      - 94e92a0f-9389-44ec-bcd1-075132707323-result.json
      - 95bd2c58-4127-403c-858e-dd4cf96e5611-result.json
      - 9a6e9d53-b72a-4aab-8f25-c12ff6149620-result.json
      - 9b1494c0-eb0e-4ece-8a2d-0500654f5b68-result.json
      - a5a8ce0b-2a82-490c-b5da-9abde1931845-attachment.txt
      - a78419dd-233c-4ecc-a6cd-fc08599407ac-attachment.txt
      - ad77907c-dbe4-4bb5-9a04-9194778a47cc-result.json
      - aeddef9a-17a1-42b8-8c9c-6a9d9cc4f8af-attachment.txt
      - af8ef134-16e2-4ad5-9fcf-e811cce98afc-result.json
      - bb72fbab-4025-4365-826b-38bf8c88a025-attachment.txt
      - d2b5a7ca-8a3d-48ca-8a6d-481efec23ce2-result.json
      - d332839c-1c29-4ecc-a5bc-9e86a228970d-attachment.txt
      - e3a92ffe-af86-46de-9f19-f4d29f0dfe0d-attachment.txt
      - e927d6d2-2c1f-4b00-97d5-49c6294058dc-attachment.txt
      - eb43af66-fdf1-40be-b2b4-76bbaafa7930-attachment.txt
      - ef46eb1f-a62a-4197-92a2-24a5e89195bc-attachment.txt
      - f6ecc94a-e6da-428f-9207-55136df047fd-result.json
      - fcf93b51-d1db-40a7-b312-82318b280f10-result.json
    - docker
      - docker-compose.yml
      - Dockerfile
    - logs
      - test-execution-2025-11-02.log
      - test-execution-audit.json
    - scripts
      - generate-report.sh
      - run-tests.sh
      - setup.sh
      - update-jsdoc.ts
    - src
      - api
        - clients
          - AuthApiClient.ts
          - BaseApiClient.ts
          - UserApiClient.ts
        - interceptors
          - RequestInterceptor.ts
        - models
          - request
            - LoginRequest.ts
          - response
            - LoginResponse.ts
      - config
        - browser.config.ts
        - global-setup.ts
        - global-teardown.ts
        - logger.config.ts
        - test.config.ts
        - environments
          - dev.config.ts
          - index.ts
          - prod.config.ts
          - staging.config.ts
      - data
        - builders
          - ProductBuilder.ts
          - UserBuilder.ts
        - constants
          - errorMessages.ts
          - timeouts.ts
          - urls.ts
        - testData
          - credentials.json
          - products.json
          - users.ts
      - fixtures
        - api.fixture.ts
```

## package.json (key fields)
- **name:** `baseple`
- **version:** `1.0.0`
- **useful scripts:**
  - `test` → `playwright test`
  - `test:ui` → `playwright test --ui`
- **top dependencies:**
- **top devDependencies:**
  - `@eslint/js`: `^9.39.0`
  - `@playwright/test`: `^1.56.1`
  - `@types/eslint__js`: `^8.42.3`
  - `@types/node`: `^24.9.2`
  - `@types/uuid`: `^10.0.0`
  - `@typescript-eslint/eslint-plugin`: `^8.46.2`
  - `@typescript-eslint/parser`: `^8.46.2`
  - `allure-commandline`: `^2.34.1`
  - `allure-playwright`: `^3.4.2`
  - `dotenv`: `^17.2.3`
  - `eslint`: `^9.0.0`
  - `eslint-config-prettier`: `^10.1.8`

## Playwright configuration
- Located at `PlaywrightTest - Copy/playwright.config.ts`
```ts
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./src/tests",

  // Add global setup and teardown
  globalSetup: require.resolve("./src/config/global-setup.ts"),
  globalTeardown: require.resolve("./src/config/global-teardown.ts"),

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html", { outputFolder: "test-results/html-report" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    [
      "allure-playwright",
      {
        outputFolder: "allure-results",
        detail: true,
        suiteTitle: true,
      },
    ],
    ["list"],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  outputDir: "test-results/artifacts",
});
```

## Source layout & architecture (observed)
- Top-level directories: PlaywrightTest - Copy
- Total source files scanned: 121

- Testing framework detected: Mocha/Chai, Playwright Test

## How to run
1. Install dependencies:
```bash
npm install
```
2. Run Playwright tests (examples):
```bash
npm test
```

## CI / Recommended automation
- Use GitHub Actions or GitLab CI to run `npm ci` and `npx playwright install --with-deps` then `npm test`.
- Save Playwright traces/screenshots on failures by configuring `playwright.config` to enable `trace: 'on-first-retry'` and `screenshot: 'only-on-failure'`.

## Notes & Recommendations
- Ensure Node.js version in `engines` or `.nvmrc` matches project requirements.
- If TypeScript is used, ensure `tsconfig.json` and `ts-node` are configured; compile before running if needed.
- Consider adding `npm run test:ci` script that runs headless and outputs JUnit XML for CI.

----
_Generated by ChatGPT — concise project map for quick onboarding._



# 🎭 Playwright POC

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Playwright](https://img.shields.io/badge/Playwright-Testing%20Framework-2ea44f)
![Allure](https://img.shields.io/badge/Allure-Report-orange)
![GitHub CI](https://img.shields.io/github/actions/workflow/status/your-org/PlaywrightPOC/playwright.yml?label=CI%20Status)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 🧠 Overview

**Playwright POC** is a robust **end-to-end (E2E) test automation framework** built using **Playwright + TypeScript**.  
It demonstrates best practices for **scalable, maintainable, and CI-ready test automation**, featuring:
- Modular architecture using **Page Object Model (POM)**  
- Centralized configuration and reusable **fixtures**  
- Powerful **logging**, **custom reporting**, and **parallel test execution**
- Integration with **Allure Reports**, **Slack notifications**, and **GitHub Actions CI**

---

## ⚙️ Tech Stack

| Category | Tools / Libraries |
|-----------|------------------|
| Language | TypeScript |
| Framework | Playwright Test |
| Reporting | Allure, Playwright HTML Report |
| CI/CD | GitHub Actions |
| Logging | Winston / Custom Logger |
| Containerization | Docker |
| Linting & Formatting | ESLint, Prettier, Husky (pre-commit hooks) |

---

## 🏗️ Architecture

The framework follows a **layered and modular design**, promoting scalability and separation of concerns.

src/
├─ config/ # Environment, browser, and test configuration files
├─ fixtures/ # Reusable Playwright test fixtures
├─ pages/ # Page Object Model classes (BasePage, LoginPage, HomePage, etc.)
├─ api/ # API client utilities for backend testing
├─ data/ # Test data, constants, and builders
├─ logger/ # Custom logger with file & console formatters
├─ reporters/ # Allure, Slack, and custom reporting logic
├─ tests/ # Organized test suites (e2e, api, integration)
└─ utils/ # Helper utilities (waits, assertions, actions, etc.)

markdown
Copy code

### 🔹 Key Components
- **`playwright.config.ts`** — Centralized Playwright settings (timeouts, browsers, retries, traces).
- **`src/config/environments/`** — Environment-specific URLs and credentials.
- **`src/fixtures/`** — Provides browser, page, and API clients via dependency injection.
- **`src/pages/`** — Implements the Page Object Model for UI abstraction.
- **`src/reporters/`** — Handles Allure report generation, Slack messages, and custom event reporting.

---

## 🔁 Test Execution Flow

1. **Global Setup**
   - Loads environment config and credentials.
2. **Fixture Initialization**
   - Browser, Page, and API clients are created.
3. **Test Execution**
   - Tests run in isolated contexts (parallel by default).
4. **Logging & Reporting**
   - Results logged to `/logs` and reported via Allure & HTML.
5. **Teardown**
   - Closes browser sessions and cleans up temporary data.

---

## 🧪 Running the Tests

### 1️⃣ Install Dependencies
```bash
npm install
2️⃣ Run All Tests
bash
Copy code
npx playwright test
3️⃣ Run Specific Tests
bash
Copy code
npx playwright test tests/e2e/login/login.spec.ts
4️⃣ Headless / Headed Mode
bash
Copy code
npm run test:headless    # Run in CI
npm run test:ui          # Run with Playwright UI mode
📊 Reporting
Allure Report
Generates rich, interactive reports with test steps, attachments, and screenshots.

bash
Copy code
# Generate and open Allure report
npm run allure:report
Reports are saved under:

bash
Copy code
/allure-results
/allure-report
Playwright HTML Report
Auto-generated after each run:

bash
Copy code
/test-results/html-report/index.html
Logs
Runtime and audit logs:

bash
Copy code
/logs/test-execution-YYYY-MM-DD.log
🧰 Useful npm Scripts
Script	Description
npm run base-test	Run base Playwright tests
npm run test:headless	Run tests in headless mode
npm run test:ui	Launch Playwright UI runner
npm run lint	Lint codebase
npm run format	Auto-format code using Prettier
npm run allure:report	Generate and open Allure report

🧑‍💻 CI/CD Integration
This project includes GitHub Actions workflows located in:

bash
Copy code
.github/workflows/
 ├─ playwright.yml
 ├─ ci.yml
 └─ nightly.yml
CI Workflow Example
yaml
Copy code
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npm test
      - name: Generate Allure Report
        run: npm run allure:report
🧩 Docker Support
Run tests in an isolated Docker container:

bash
Copy code
docker-compose up --build
Docker files:

bash
Copy code
/docker/Dockerfile
/docker/docker-compose.yml
🧹 Code Quality & Hooks
ESLint + Prettier — Code style & linting

Husky — Pre-commit checks to ensure code quality before pushes

TypeScript strict mode — Ensures strong typing and safer code

🪄 Future Enhancements
Integrate TestRail / Zephyr for test case management

Add Visual Regression tests using toHaveScreenshot()

Add parallel containerized testing on multiple browser types

Expand API test coverage with advanced interceptors and mocks

🧑‍🤝‍🧑 Contributing
Fork the repository

Create a feature branch

Commit your changes following Conventional Commits

Submit a pull request


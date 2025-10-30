# Playwright Project

This document explains the structure of the Playwright testing framework project. The goal of this project is to provide an organized, scalable, and efficient automation testing setup using Playwright with TypeScript.

---

## Root Directory

### Files:

- **`package.json`**:
  - Contains the project metadata, dependencies, and scripts for automation (e.g., for running tests, linting, and building).
  - Essential for dependency management.
- **`package-lock.json`**:
  - Automatically generated file that locks the dependency versions to ensure reproducible builds.
- **`tsconfig.json`**:
  - TypeScript configuration file. It specifies compiler options and ensures that the project compiles TypeScript into JavaScript correctly.
  - It also defines the root directory (`src`) and output directory (`dist`).
- **`README.md`**:

  - Contains an introduction to the project, how to set it up, and any important instructions for contributors or developers.

- **`.gitignore`**:

  - A file that tells Git which files and directories to ignore when committing code.
  - Typically includes files like `node_modules/`, `.DS_Store`, `dist/`, and any other files generated during testing (e.g., reports, logs, etc.).

- **`.DS_Store`**:
  - A macOS-specific file that stores custom attributes for folders, can be ignored in Git.

---

## Folders Overview

### 1. **`/artifacts`**

This folder stores test-related artifacts that are generated during test execution, including screenshots, videos, and trace files. These help in debugging test failures and visualizing the test steps.

#### Contents:

- **`screenshots/`**: Stores screenshots taken during the test execution.
- **`traces/`**: Stores Playwright trace files which help in debugging and visualizing each step in the test.
- **`videos/`**: Stores video recordings of test executions.

---

### 2. **`/logs`**

Contains log files for test executions. Logs provide insights into test runs, system messages, and error details.

#### Contents:

- **`test-run.log`**: A log file that contains detailed information about the test execution, including success or failure messages, errors, and additional debug information.
- **`.gitkeep`**: An empty file used to track the empty `logs` folder in Git (Git does not track empty directories).

---

### 3. **`/reports`**

Contains all the generated reports, including Playwright’s HTML reports and results from other tools like Allure.

#### Contents:

- **`allure-results/`**: Stores results for Allure reporting, a popular test reporting tool that provides rich, visual reports for test results.
- **`html/`**: Stores the default Playwright HTML reports generated after each test run.

---

### 4. **`/src`**

This is the main source code directory for your Playwright framework. It contains various folders and files that define the configuration, test cases, utility functions, and pages used for tests.

#### Contents:

- **`/config/`**:

  - Holds configuration files for different environments, test settings, and Playwright options.

  - **`environments/`**: Contains environment-specific configuration files such as `dev.env.ts`, `prod.env.ts`, and `staging.env.ts` for different deployment stages.
  - **`env.config.ts`**: Global configuration for environment variables.
  - **`playwright.config.ts`**: The main Playwright configuration file that sets up Playwright's test options like test timeouts, base URL, retries, and reporters.
  - **`testConfig.ts`**: Additional configuration or settings that can be shared across multiple tests.

- **`/fixtures/`**:

  - Contains test data and setup/teardown logic that runs before/after tests.

  - **`testData/`**: Stores test data files, such as `users.json`, that will be used by the tests.
  - **`globalSetup.ts`**: Contains logic that is executed once before all tests. For example, setting up the test environment or global data.
  - **`globalTeardown.ts`**: Contains logic that is executed after all tests to clean up resources (e.g., closing databases, stopping servers).

- **`/hooks/`**:

  - Defines lifecycle hooks that can be used globally across tests or for specific tests.

  - **`onTestStart.ts`**: Executed before each test starts.
  - **`onTestFailure.ts`**: Executed if a test fails.
  - **`onTestEnd.ts`**: Executed after each test ends.

- **`/middlewares/`**:

  - Contains network interception and authentication middleware for testing purposes.

  - **`auth.middleware.ts`**: Handles authentication-related actions, like injecting tokens or managing sessions during tests.
  - **`network.interceptor.ts`**: Intercepts network requests to mock backend calls or simulate certain network conditions.

- **`/pages/`**:

  - Implements the **Page Object Model (POM)** design pattern, which helps in separating the UI elements and actions from the test logic.

  - **`/components/`**: Stores reusable UI components, like the navbar component (`navbar.component.ts`).
  - **`dashboard.page.ts`**: Contains the logic for interacting with the dashboard page of the application.
  - **`home.page.ts`**: Contains the logic for interacting with the homepage of the application.
  - **`login.page.ts`**: Contains the logic for the login page.

- **`/tests/`**:

  - Stores all the Playwright test suites and organizes them by test type (e.g., smoke, regression, performance).

  - **`/smoke/`**: Contains smoke tests to verify critical paths and basic functionality.
  - **`/regression/`**: Contains regression tests to ensure existing functionality is not broken.
  - **`/performance/`**: Contains performance-related tests, such as load testing.
  - **`/api/`**: Contains API tests for backend services.
  - **`/accessibility/`**: Contains accessibility tests (a11y).
  - **`example.spec.ts`**: An example test case that could be used as a reference for writing new tests.

- **`/utils/`**:

  - Contains utility functions that help simplify tasks in test scripts, such as logging, date formatting, and API helper functions.

  - **`apiHelper.ts`**: Contains helper functions for API testing (e.g., sending HTTP requests, validating responses).
  - **`dateHelper.ts`**: Contains utility functions for working with dates.
  - **`logger.ts`**: Provides centralized logging functionality for test executions.
  - **`testHelper.ts`**: Contains generic helper functions used across multiple tests.

---

### 5. **`/test-results`**

Contains test execution results, especially from CI/CD pipelines. These results are important for analyzing test failures and debugging issues. The results typically include Playwright trace files that can be inspected for troubleshooting.

#### Contents:

- **`example-get-started-link-chromium/`**: A directory containing trace files for a specific test run.
- **`example-has-title-chromium/`**: Another test run result folder containing trace files.

---

## How It Works

1. **Configuration Files**: The `playwright.config.ts` file in the `/src/config/` folder defines the global test configuration, such as base URL, retry count, test timeouts, etc. Environment-specific configurations are also stored in the `environments/` folder.

2. **Test Organization**: Test cases are organized in `/tests` based on the type of testing (e.g., smoke, regression, API, accessibility). This allows you to quickly locate tests based on their purpose.

3. **Page Object Model (POM)**: The `pages/` folder contains the Page Object Models that encapsulate UI interaction logic. This makes tests cleaner, easier to maintain, and reusable.

4. **Test Execution**: The tests are executed using Playwright’s test runner, which will read the configurations from `playwright.config.ts` and run the test cases. Test artifacts, like screenshots, traces, and videos, are saved in the `artifacts` folder for debugging purposes.

5. **Reports & Logs**: After tests are executed, reports are generated and stored in the `/reports` folder. Logs for each test run are stored in the `logs` folder for tracking execution details.

---

## Conclusion

This folder structure is designed to be scalable, maintainable, and easily adaptable for any Playwright testing project. It ensures separation of concerns, making it easier to manage configuration, fixtures, test cases, utilities, and reporting. By organizing tests, configuration, and artifacts into different directories, this structure provides a clear overview of the entire testing process.

---

This structure is ready to be used in a CI/CD pipeline for continuous testing of Salesforce or any other web application.

### BASIC FOLDER STRUCTURE

```
└── 📁Demo
    └── 📁artifacts
        └── 📁screenshotsX
        └── 📁traces
        └── 📁videos
    └── 📁logs
        ├── .gitkeep
        ├── test-run.log
    └── 📁reports
        └── 📁allure-results
        └── 📁html
    └── 📁src
        └── 📁config
            └── 📁environments
                ├── dev.env.ts
                ├── prod.env.ts
                ├── staging.env.ts
            ├── env.config.ts
            ├── playwright.config.ts
            ├── testConfig.ts
        └── 📁fixtures
            └── 📁testData
                ├── users.json
            ├── globalSetup.ts
            ├── globalTeardown.ts
        └── 📁hooks
            ├── onTestEnd.ts
            ├── onTestFailure.ts
            ├── onTestStart.ts
        └── 📁middlewares
            ├── auth.middleware.ts
            ├── network.interceptor.ts
        └── 📁pages
            └── 📁components
                ├── navbar.component.ts
            ├── dashboard.page.ts
            ├── home.page.ts
            ├── login.page.ts
        └── 📁tests
            └── 📁accessibility
            └── 📁api
            └── 📁performance
            └── 📁regression
            └── 📁smoke
            ├── example.spec.ts
        └── 📁utils
            ├── apiHelper.ts
            ├── dateHelper.ts
            ├── logger.ts
            ├── testHelper.ts
    └── 📁test-results
        └── 📁example-get-started-link-chromium
            ├── trace.zip
        └── 📁example-has-title-chromium
            ├── trace.zip
    ├── .DS_Store
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```

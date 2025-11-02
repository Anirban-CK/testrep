import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";

export default tseslint.config(
  // Ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/allure-results/**",
      "**/allure-report/**",
      "**/playwright-report/**",
      "**/logs/**",
      "**/.husky/**",
      "**/package-lock.json",
      "**/pnpm-lock.yaml",
      "**/yarn.lock",
      "playwright.config.ts",
      "playwright.config.ts",
    ],
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Global config for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        NodeJS: "readonly",
      },
    },

    rules: {
      // General ESLint rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "quote-props": ["error", "as-needed"],

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      // Code quality
      "no-duplicate-imports": "error",
      "no-unreachable": "error",
      "no-constant-condition": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],

      // Best practices
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",
    },
  },

  // Playwright specific configuration
  {
    files: ["src/tests/**/*.spec.ts", "src/tests/**/*.test.ts"],
    ...playwright.configs["flat/recommended"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/no-conditional-in-test": "error",
      "playwright/no-element-handle": "warn",
      "playwright/no-eval": "error",
      "playwright/no-focused-test": "error",
      "playwright/no-force-option": "warn",
      "playwright/no-networkidle": "warn",
      "playwright/no-page-pause": "error",
      "playwright/no-skipped-test": "warn",
      "playwright/no-useless-await": "error",
      "playwright/no-wait-for-timeout": "warn",
      "playwright/prefer-web-first-assertions": "error",
      "playwright/require-top-level-describe": "error",
      "playwright/expect-expect": "error",
      "playwright/valid-expect": "error",
      "playwright/valid-title": [
        "error",
        {
          mustMatch: {
            test: "^TC\\d+ - ",
            describe: "^[A-Z]",
          },
        },
      ],
    },
  },

  // Page Objects configuration
  {
    files: ["src/pages/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
        },
      ],
      "no-console": "off", // Allow console in page objects for debugging
    },
  },

  // Config files configuration
  {
    files: ["*.config.ts", "src/config/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },

  // Scripts configuration
  {
    files: ["scripts/**/*.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Disable type-checking for JavaScript files
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },

  // Prettier config (must be last to override other configs)
  prettier
);

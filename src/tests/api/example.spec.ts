import { expect } from "@playwright/test";
import { test } from "../../hooks";
import { logger } from "../../utils/logger";

test.describe("API Tests", () => {
  test("GET request should return 200", async ({ request }) => {
    logger.step("Sending GET request to GitHub API root");
    const response = await request.get("https://api.github.com");
    logger.info(`Response status: ${response.status()}`);

    expect(response.status()).toBe(200);
    logger.success("GET request returned 200 ✅");
  });

  test("GET Playwright repo details", async ({ request }) => {
    logger.step("Fetching Playwright repository details from GitHub API");
    const response = await request.get(
      "https://api.github.com/repos/microsoft/playwright"
    );
    const body = await response.json();
    logger.info(`Repository name fetched: ${body.name}`);

    expect(body.name).toBe("playwright");
    logger.success("Repository name is correct ✅");
  });

  test("Check user endpoint rate limit header", async ({ request }) => {
    logger.step("Checking rate limit header for GitHub user endpoint");
    const response = await request.get("https://api.github.com/users/octocat");
    const headers = response.headers();
    logger.info(`Headers received: ${JSON.stringify(headers)}`);

    expect(headers).toHaveProperty("x-ratelimit-limit");
    logger.success("Rate limit header exists ✅");
  });
});

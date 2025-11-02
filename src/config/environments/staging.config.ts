export const stagingConfig = {
  baseUrl: "https://staging.example.com",
  apiBaseUrl: "https://api.staging.example.com",
  timeout: 45000,
  retries: 2,
  users: {
    standard: {
      username: process.env.STAGING_USER || "test_user",
      password: process.env.STAGING_PASS || "test_pass",
    },
  },
};

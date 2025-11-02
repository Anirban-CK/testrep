export const devConfig = {
  baseUrl: "https://www.saucedemo.com",
  apiBaseUrl: "https://api.dev.example.com",
  timeout: 30000,
  retries: 1,
  users: {
    standard: {
      username: "standard_user",
      password: "secret_sauce",
    },
    locked: {
      username: "locked_out_user",
      password: "secret_sauce",
    },
  },
};

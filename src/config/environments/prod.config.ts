export const prodConfig = {
  baseUrl: "https://www.example.com",
  apiBaseUrl: "https://api.example.com",
  timeout: 60000,
  retries: 3,
  users: {
    standard: {
      username: process.env.PROD_USER || "",
      password: process.env.PROD_PASS || "",
    },
  },
};

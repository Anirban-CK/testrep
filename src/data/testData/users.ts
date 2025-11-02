export const users = {
  validUsers: [
    {
      username: "standard_user",
      password: "secret_sauce",
      description: "Standard user with full access",
    },
    {
      username: "problem_user",
      password: "secret_sauce",
      description: "User with UI issues",
    },
  ],
  invalidUsers: [
    {
      username: "locked_out_user",
      password: "secret_sauce",
      expectedError: "Epic sadface: Sorry, this user has been locked out.",
    },
    {
      username: "invalid_user",
      password: "wrong_password",
      expectedError:
        "Epic sadface: Username and password do not match any user in this service",
    },
  ],
};

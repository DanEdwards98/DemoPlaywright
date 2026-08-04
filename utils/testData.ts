/**
 * Test Data and Constants
 *
 * Keep test data separate from test code for:
 * - Easy updates
 * - Reusability
 * - Environment-specific configurations
 */

export const TEST_USERS = {
  validUser: {
    email: "user@example.com",
    password: "ValidPassword123",
  },
  invalidUser: {
    email: "invalid@example.com",
    password: "WrongPassword",
  },
  adminUser: {
    email: "admin@example.com",
    password: "AdminPassword123",
  },
};

export const TEST_URLS = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  profile: "/profile",
};

export const TEST_TIMEOUTS = {
  short: 5000,
  medium: 10000,
  long: 30000,
};

export const TEST_SEARCH_QUERIES = [
  "getting started",
  "advanced usage",
  "api reference",
  "examples",
];

export const VALIDATION_MESSAGES = {
  requiredEmail: "Email is required",
  invalidEmail: "Please enter a valid email",
  requiredPassword: "Password is required",
  weakPassword: "Password is too weak",
  loginSuccess: "Login successful",
  loginFailed: "Invalid credentials",
};

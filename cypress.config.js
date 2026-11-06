require("dotenv").config();
const { defineConfig } = require("cypress");

const REQUIRED_ENV = ["USER_EMAIL", "USER_PASSWORD"];

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    baseUrl: process.env.BASE_URL || "https://practicesoftwaretesting.com",

    viewportWidth: 1280,
    viewportHeight: 720,

    video: true,
    screenshotOnRunFailure: true,

    retries: {
      runMode: 2,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push(
            "--disable-blink-features=AutomationControlled"
          );
        }

        return launchOptions;
      });

      const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

      if (missing.length > 0) {
        throw new Error(
          `Missing environment variables: ${missing.join(", ")}. ` +
            "Copy .env.example to .env and fill in the values."
        );
      }

      config.env.USER_EMAIL = process.env.USER_EMAIL;
      config.env.USER_PASSWORD = process.env.USER_PASSWORD;

      return config;
    },
  },
});

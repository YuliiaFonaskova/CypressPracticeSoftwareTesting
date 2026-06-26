const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: "https://practicesoftwaretesting.com",

    viewportWidth: 1280,

    viewportHeight: 720,

    video: true,

    screenshotOnRunFailure: true,

    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});

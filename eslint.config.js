const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "node_modules/",
      "cypress/reports/",
      "cypress/screenshots/",
      "cypress/videos/",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
  },
];

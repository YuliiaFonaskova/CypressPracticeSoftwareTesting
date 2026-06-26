# Cypress Practice Software Testing

UI test automation project created with Cypress for the Practice Software Testing application.

## Technologies

* JavaScript
* Cypress
* Page Object Model (POM)
* Mochawesome Reporter
* Environment Variables (cypress.env.json)

## Test Scenarios

✅ Successful login

✅ Unsuccessful login

✅ Search product

✅ View product details

✅ Add product to cart

## Project Structure

```text
pages/
├── LoginPage.js
├── MainPage.js
└── ProductPage.js

cypress/
├── e2e/
│   ├── login.cy.js
│   ├── search.cy.js
│   ├── product.cy.js
│   └── cart.cy.js
├── fixtures/
├── reports/
├── screenshots/
├── support/
│   ├── commands.js
│   └── e2e.js
└── videos/

cypress.config.js
cypress.env.json
package.json
```

## Features

* Cross-browser testing

  * Chrome
  * Firefox
  * Edge

* Headless execution

* Retry failed tests (2 retries)

* Screenshots on failure

* Video recording of test execution

* HTML and JSON reports generated with Mochawesome

* Environment variables stored in `cypress.env.json`

## Installation

```bash
npm install
```

## Open Cypress Test Runner

```bash
npm run cy:open
```

## Run all tests in headless mode

```bash
npm run cy:run
```

## Run tests in Chrome

```bash
npm run cy:chrome
```

## Run tests in Firefox

```bash
npm run cy:firefox
```

## Run tests in Edge

```bash
npm run cy:edge
```

## Generate and View Reports

Reports are generated automatically after test execution and can be found in:

```text
cypress/reports/
```

Open the HTML report:

```bash
start cypress/reports/mochawesome.html
```

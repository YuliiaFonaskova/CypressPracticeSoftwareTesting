# Cypress Practice Software Testing

UI test automation project created with Cypress for the Practice Software Testing application.

## Technologies

- JavaScript
- Cypress
- Page Object Model (POM)
- Mochawesome Reporter
- Environment Variables (`.env` via `dotenv`)

## Test Scenarios

- [AUTH-01](docs/test-cases.md#auth-01--login-with-valid-credentials) — Successful login
- [AUTH-02](docs/test-cases.md#auth-02--login-with-invalid-credentials) — Unsuccessful login
- [SRCH-01](docs/test-cases.md#srch-01--search-for-a-product-and-add-it-to-the-cart) — Search product
- [PRD-01](docs/test-cases.md#prd-01--product-details-are-displayed) — View product details
- [CART-01](docs/test-cases.md#cart-01--add-a-product-to-the-cart) — Add product to cart

## Test Documentation

The full test-case suite lives in [`docs/test-cases.md`](docs/test-cases.md). It
contains 25 manual test cases across five suites, each with an ID, priority,
preconditions, steps and expected results. The cases that are already automated
are linked to their spec files, so every Cypress test can be traced back to a
test case.

| Suite          | Cases             | Automated |
| -------------- | ----------------- | --------- |
| Authentication | AUTH-01 … AUTH-07 | 4 of 7    |
| Search         | SRCH-01 … SRCH-05 | 1 of 5    |
| Product        | PRD-01 … PRD-04   | 1 of 4    |
| Cart           | CART-01 … CART-07 | 1 of 7    |
| Checkout (E2E) | E2E-01 … E2E-02   | 0 of 2    |

The coverage matrix in that document lists the exact spec file (or the missing
one) for every case, together with the known gaps and the recommended automation
order.

> **Note:** AUTH-01 signs in to the public demo, where the shared seeded account
> can be locked after too many failed attempts. A failure with "Account locked"
> is an environment issue, not a test defect — CI runs against a locally seeded
> instance instead.

## AI-Assisted Development

Parts of this project are written with [OpenCode](https://opencode.ai), an
open-source AI coding agent that works directly against the repository. The
agent's context and configuration are versioned here, so the setup is
reproducible instead of living in a chat window.

### `AGENTS.md`

[`AGENTS.md`](AGENTS.md) is the compact project context loaded automatically at
the start of every agent session: architecture, setup, commands, conventions and
CI constraints. Because it is committed and updated together with the code, it
also works as a short onboarding document for humans.

### MCP (Model Context Protocol)

MCP is an open protocol that gives an AI agent a standard interface to external
tools. This repository declares its tools in [`opencode.json`](opencode.json):

- **GitHub MCP server** (remote) — lets the agent read issues and pull requests
  and act on them in the context of the repository.
- **Least privilege** — the toolset is restricted to `default,actions`, and the
  access token is referenced via `{file:.opencode/github-token}`. That file is
  gitignored, so no secret ever reaches the repository.
- **Team-friendly** — the configuration is versioned with the code, so everyone
  who clones the repository gets the same agent setup without personal paths.

### Guardrails

- The agent proposes changes; every diff is reviewed before it is committed.
- `npm run lint` and `prettier --check .` must pass, and the affected spec is run
  before a commit.
- AI is used for scaffolding page objects and specs, maintaining the test-case
  documentation, refactoring and failure triage. Test design, prioritisation and
  the final review stay manual.
- Real credentials live in a local `.env` that never leaves the machine.

## Project Structure

```text
cypress/
├── e2e/
│   ├── login.cy.js
│   ├── search.cy.js
│   ├── product.cy.js
│   └── cart.cy.js
├── fixtures/
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── MainPage.js
│   └── ProductPage.js
├── reports/
├── screenshots/
├── support/
│   ├── commands.js
│   ├── e2e.js
│   └── routes.js
└── videos/

docs/
└── test-cases.md

cypress.config.js
package.json
AGENTS.md
opencode.json
```

## Features

- Cross-browser testing

  - Chrome
  - Firefox
  - Edge

- Headless execution

- Retry failed tests (2 retries)

- Screenshots on failure

- Video recording of test execution

- HTML and JSON reports generated with Mochawesome

- Environment variables stored in `cypress.env.json`

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

## Continuous Integration

The public demo is protected by Cloudflare, which returns `403 Forbidden` to GitHub-hosted runners. The CI workflow therefore starts a local copy of the application with Docker before running Cypress:

```bash
docker compose -f docker-compose.ci.yml up -d --wait
docker compose -f docker-compose.ci.yml exec -T api php artisan migrate:fresh --seed --force
```

Cypress then runs against `http://localhost:4200` with the default seeded test account (`customer@practicesoftwaretesting.com` / `welcome01`). Stop and remove the stack with:

```bash
docker compose -f docker-compose.ci.yml down -v
```

## Generate and View Reports

Reports are generated automatically after test execution and can be found in:

```text
cypress/reports/
```

Open the reports folder and pick the newest HTML file:

```bash
start cypress/reports
```

Mochawesome runs with `overwrite: false`, so each execution adds a new numbered
report (`mochawesome.html`, `mochawesome_001.html`, ...) instead of replacing the
previous one. Pick the file with the highest number for the latest run.

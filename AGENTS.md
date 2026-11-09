# AGENTS.md

Compact context for OpenCode sessions. Trust `cypress.config.js` and the filesystem over the README where they disagree.

## Project

- Cypress 15 + JavaScript E2E suite for the public Practice Software Testing demo (`https://practicesoftwaretesting.com`). There is no local app/server, API layer, or mocking: every run hits the live site, so failures can be network/UI flakiness. `runMode` retries twice.
- Page objects live in `cypress/pages/`, specs in `cypress/e2e/`, shared URL constants in `cypress/support/routes.js`.

## Setup

- `npm ci`, then create `.env` from `.env.example` (`Copy-Item .env.example .env` on PowerShell).
- `cypress.config.js` loads `.env` through dotenv and throws if `USER_EMAIL` or `USER_PASSWORD` is missing. `cypress.env.json` is gitignored/legacy and does not satisfy this check.
- Tests read valid credentials with `cy.env(["USER_EMAIL", "USER_PASSWORD"])`; invalid credentials come from `cypress/fixtures/users.json`.

## Commands

- `npm run cy:run` — all specs headless; `cy:chrome`, `cy:firefox`, `cy:edge` select a browser; `npm run cy:open` starts the runner.
- Single spec: `npx cypress run --spec cypress/e2e/login.cy.js --browser chrome --headless`.
- CI gate (run before finishing): `npm run lint`, then `npx prettier --check .`. Fix formatting with `npm run format`.
- There is no `npm test` or typecheck script.
- Windows CRLF quirk: a fresh checkout has CRLF files, so `prettier --check .` flags nearly everything even when style is fine. Add `--end-of-line crlf` to isolate genuine formatting problems.

## Conventions and gotchas

- `BasePage` is exported as a class; `LoginPage`, `MainPage`, and `ProductPage` export singleton instances.
- Use `BasePage.getByTestId()` (maps to `[data-test="..."]`) and import `ROUTES` instead of hardcoding paths.
- Getter properties such as `ProductPage.productTitle`, `addToCartButton`, and `cartMessage` are used without parentheses in every spec (`search.cy.js`, `cart.cy.js`); follow that pattern.
- `allowCypressEnv: false` in `cypress.config.js`: `Cypress.env()` throws. Use `cy.env([...])`.
- Mochawesome uses `overwrite: false`, so reports accumulate as `cypress/reports/mochawesome_NNN.html`; there is no stable `mochawesome.html`. Reports, screenshots, and videos are gitignored generated output.
- Project tree in `README.md` is maintained: page objects are under `cypress/pages/`, and test cases live in `docs/test-cases.md`.

## CI

- `.github/workflows/cypress.yml`: the lint job runs ESLint then `prettier --check .`; the test job starts the local Sprint 5 app from `docker-compose.ci.yml`, seeds the database, then runs `npm run cy:chrome` with `BASE_URL=http://localhost:4200`. The public demo is Cloudflare-protected and returns 403 to GitHub-hosted runners, so CI must not target it.
- CI does not use the GitHub secrets for E2E runs: the local seeded account is set directly in the workflow, and `BASE_URL` points at the local UI. Workflow triggers include `refactor/page-objects` in addition to `main`/`master`.

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
- Getter properties such as `ProductPage.productTitle`, `addToCartButton`, and `cartMessage` are used without parentheses. `cypress/e2e/search.cy.js` mistakenly calls several as methods and will fail; `cart.cy.js` shows the correct pattern.
- `allowCypressEnv: false` in `cypress.config.js`: `Cypress.env()` throws. Use `cy.env([...])`.
- Mochawesome uses `overwrite: false`, so reports accumulate as `cypress/reports/mochawesome_NNN.html`; there is no stable `mochawesome.html`. Reports, screenshots, and videos are gitignored generated output.
- README project tree is stale: pages are under `cypress/pages/`, not repo-root `pages/`.

## CI

- `.github/workflows/cypress.yml`: the lint job runs ESLint then `prettier --check .`; the test job runs `npm run cy:chrome` after a live-site availability check.
- CI supplies `USER_EMAIL`/`USER_PASSWORD` as GitHub secrets and leaves `BASE_URL` unset (so it defaults to the public site). Workflow triggers include `refactor/page-objects` in addition to `main`/`master`.

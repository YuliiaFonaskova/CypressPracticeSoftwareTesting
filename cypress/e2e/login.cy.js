import LoginPage from "../../pages/LoginPage";

describe("Login functionality", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("Successful login", () => {
    LoginPage.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));

    cy.url().should("include", "/account");
  });

  it("Unsuccessful login", () => {
    LoginPage.login(
      Cypress.env("USER_WRONG_EMAIL"),
      Cypress.env("USER_WRONG_PASSWORD"),
    );

    LoginPage.errorMessage().should("be.visible");
  });
});

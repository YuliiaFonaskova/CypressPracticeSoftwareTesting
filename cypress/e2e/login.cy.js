import LoginPage from "../pages/LoginPage";
import users from "../fixtures/users.json";
import { ROUTES } from "../support/routes";

describe("Login functionality", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("logs in with valid credentials", () => {
    cy.env(["USER_EMAIL", "USER_PASSWORD"]).then(
      ({ USER_EMAIL, USER_PASSWORD }) => {
        LoginPage.login(USER_EMAIL, USER_PASSWORD);
      }
    );

    cy.location("pathname").should("eq", ROUTES.account);
  });

  it("displays an error message with invalid credentials", () => {
    LoginPage.login(users.invalid.email, users.invalid.password);

    LoginPage.errorMessage.should("be.visible").and("not.be.empty");

    cy.location("pathname").should("eq", ROUTES.login);
  });
});

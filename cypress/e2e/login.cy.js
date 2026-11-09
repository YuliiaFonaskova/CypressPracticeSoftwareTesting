import LoginPage from "../pages/LoginPage";
import users from "../fixtures/users.json";
import messages from "../fixtures/messages.json";
import { ROUTES } from "../support/routes";

describe("Login functionality", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("AUTH-01 logs in with valid credentials", () => {
    cy.env(["USER_EMAIL", "USER_PASSWORD"]).then(
      ({ USER_EMAIL, USER_PASSWORD }) => {
        LoginPage.login(USER_EMAIL, USER_PASSWORD);
      }
    );

    cy.location("pathname").should("eq", ROUTES.account);
  });

  it("AUTH-02 displays an error message with invalid credentials", () => {
    LoginPage.login(users.invalid.email, users.invalid.password);

    LoginPage.errorMessage.should("be.visible").and("not.be.empty");

    cy.location("pathname").should("eq", ROUTES.login);
  });

  it("AUTH-03 shows validation when the login form is submitted empty", () => {
    LoginPage.loginButton.click();

    LoginPage.emailFieldError
      .should("be.visible")
      .and("contain.text", messages.login.emailRequired);
    LoginPage.passwordFieldError
      .should("be.visible")
      .and("contain.text", messages.login.passwordRequired);

    cy.location("pathname").should("eq", ROUTES.login);
  });

  it("AUTH-04 rejects an invalid email format", () => {
    LoginPage.login("abc", users.invalid.password);

    LoginPage.emailFieldError
      .should("be.visible")
      .and("contain.text", messages.login.emailFormat);

    cy.location("pathname").should("eq", ROUTES.login);
  });
});

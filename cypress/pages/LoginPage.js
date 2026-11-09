import BasePage from "./BasePage";
import { ROUTES } from "../support/routes";

class LoginPage extends BasePage {
  constructor() {
    super(ROUTES.login);
  }

  get emailField() {
    return this.getByTestId("email");
  }

  get passwordField() {
    return this.getByTestId("password");
  }

  get loginButton() {
    return this.getByTestId("login-submit");
  }

  get errorMessage() {
    return this.getByTestId("login-error");
  }

  // Validation errors are form-level alerts: the input points to them via
  // aria-describedby (email -> email-error), so the stable lookup is by id.
  get emailFieldError() {
    return cy.get("#email-error");
  }

  get passwordFieldError() {
    return cy.get("#password-error");
  }

  login(email, password) {
    this.fillField("email", email);
    this.fillField("password", password, { log: false });
    // Disable command logging to avoid exposing sensitive password data.

    return this.loginButton.click();
  }
}

export default new LoginPage();

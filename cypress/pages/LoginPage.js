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

  login(email, password) {
    this.fillField("email", email);
    this.fillField("password", password, { log: false });
    // Disable command logging to avoid exposing sensitive password data.

    return this.loginButton.click();
  }
}

export default new LoginPage();

class LoginPage {
  visit() {
    cy.visit("/auth/login");
  }

  emailField() {
    return cy.get('[data-test="email"]');
  }

  passwordField() {
    return cy.get('[data-test="password"]');
  }

  loginButton() {
    return cy.get('[data-test="login-submit"]');
  }

  errorMessage() {
    return cy.get('[data-test="login-error"]');
  }

  login(email, password) {
    this.emailField().clear().type(email);
    this.passwordField().clear().type(password);
    this.loginButton().click();
  }
}

export default new LoginPage();

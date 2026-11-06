export default class BasePage {
  constructor(path = "/") {
    this.path = path;
  }

  visit() {
    cy.visit(this.path);
  }

  getByTestId(testId) {
    return cy.get(`[data-test="${testId}"]`);
  }

  fillField(testId, value, options = {}) {
    this.getByTestId(testId).clear();

    if (value) {
      this.getByTestId(testId).type(value, options);
    }
  }
}

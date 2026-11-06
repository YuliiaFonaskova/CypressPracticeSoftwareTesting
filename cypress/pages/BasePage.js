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
    const field = this.getByTestId(testId);

    field.clear();

    if (value !== undefined && value !== null) {
      field.type(String(value), options);
    }
  }
}

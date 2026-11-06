import { ROUTES } from "../support/routes";
class MainPage {
  visit() {
    cy.visit(ROUTES.home);
  }

  get productNames() {
    return cy.get('[data-test="product-name"]');
  }

  openFirstProduct() {
    this.productNames.first().click();
  }

  get searchField() {
    return cy.get('[data-test="search-query"]');
  }

  get searchButton() {
    return cy.get('[data-test="search-submit"]');
  }

  get searchResults() {
    return cy.get('[data-test="product-name"]');
  }

  searchProduct(productName) {
    this.searchField.clear().type(productName);
    this.searchButton.click();
  }
}

export default new MainPage();

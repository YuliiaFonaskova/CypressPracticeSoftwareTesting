class MainPage {
  visit() {
    cy.visit("/");
  }

  get productNames() {
    return cy.get('[data-test="product-name"]');
  }

  openFirstProduct() {
    this.productNames.first().click();
  }

  searchField() {
    return cy.get('[data-test="search-query"]');
  }

  searchButton() {
    return cy.get('[data-test="search-submit"]');
  }

  searchResults() {
    return cy.get('[data-test="product-name"]');
  }

  searchProduct(productName) {
    this.searchField().clear().type(productName);
    this.searchButton().click();
  }
}

export default new MainPage();

class ProductPage {
  get productTitle() {
    return cy.get("h1");
  }

  get addToCartButton() {
    return cy.get('[data-test="add-to-cart"]');
  }

  get cartMessage() {
    return cy.contains("Product added to shopping cart");
  }

  addToCart() {
    this.addToCartButton.click();
  }

  verifyProductDetailsDisplayed() {
    this.productTitle.should("be.visible");
    this.addToCartButton.should("be.visible");
  }
}

export default new ProductPage();

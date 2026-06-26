class ProductPage {
  productTitle() {
    return cy.get("h1");
  }

  addToCartButton() {
    return cy.get('[data-test="add-to-cart"]');
  }

  cartMessage() {
    return cy.contains("Product added to shopping cart");
  }

  addToCart() {
    this.addToCartButton().click();
  }

  verifyProductDetailsDisplayed() {
    this.productTitle().should("be.visible");
    this.addToCartButton().should("be.visible");
  }
}

export default new ProductPage();

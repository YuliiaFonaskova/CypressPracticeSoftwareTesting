import MainPage from "../../pages/MainPage";
import ProductPage from "../../pages/ProductPage";

describe("Product functionality", () => {
  beforeEach(() => {
    MainPage.visit();
  });

  it("User views product details", () => {
    MainPage.openFirstProduct();

    cy.url().should("include", "/product");

    ProductPage.verifyProductDetailsDisplayed();
  });
});

import MainPage from "../pages/MainPage";
import ProductPage from "../pages/ProductPage";
import { ROUTES } from "../support/routes";

describe("Product functionality", () => {
  beforeEach(() => {
    MainPage.visit();
  });

  it("displays product details", () => {
    MainPage.openFirstProduct();

    cy.url().should("include", ROUTES.product);

    ProductPage.verifyProductDetailsDisplayed();
  });
});

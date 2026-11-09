import MainPage from "../pages/MainPage";
import ProductPage from "../pages/ProductPage";
import { ROUTES } from "../support/routes";

describe("Product functionality", () => {
  beforeEach(() => {
    MainPage.visit();
  });

  it("PRD-01 displays product details", () => {
    MainPage.openFirstProduct();

    cy.url().should("include", ROUTES.product);

    ProductPage.verifyProductDetailsDisplayed();
  });
});

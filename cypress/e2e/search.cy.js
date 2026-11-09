import MainPage from "../pages/MainPage";
import ProductPage from "../pages/ProductPage";
import testData from "../fixtures/testData.json";

describe("Search functionality", () => {
  beforeEach(() => {
    MainPage.visit();
  });

  it("SRCH-01 searches for a product and adds it to the shopping cart", () => {
    MainPage.searchProduct(testData.search.productName);

    MainPage.searchResults
      .should("have.length.greaterThan", 0)
      .contains(testData.search.productName)
      .click();

    ProductPage.productTitle.should(
      "contain.text",
      testData.search.productName
    );

    ProductPage.addToCartButton.should("be.visible").and("be.enabled");

    ProductPage.addToCart();

    ProductPage.cartMessage.should("be.visible");
  });
});

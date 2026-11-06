import MainPage from "../pages/MainPage";
import testData from "../fixtures/testData.json";

describe("Search functionality", () => {
  beforeEach(() => {
    MainPage.visit();
  });

  it("searches for a product by exact name", () => {
    MainPage.searchProduct(testData.search.productName);

    MainPage.searchResults
      .should("have.length.greaterThan", 0)
      .first()
      .should("contain", testData.search.productName);
  });
});

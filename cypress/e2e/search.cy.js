import MainPage from "../../pages/MainPage";

describe("Search functionality", () => {
  beforeEach(() => {
    MainPage.visit();
  });

  it("User searches for an exact product", () => {
    MainPage.searchProduct("Combination Pliers");

    MainPage.searchResults()
      .should("have.length.greaterThan", 0)
      .first()
      .should("contain", "Combination Pliers");
  });
});

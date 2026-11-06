import MainPage from "../pages/MainPage";
import ProductPage from "../pages/ProductPage";

describe("Cart functionality", () => {
  beforeEach(() => {
    MainPage.visit();
  });

  it("adds a product to the shopping cart", () => {
    MainPage.openFirstProduct();

    ProductPage.addToCartButton.should("be.visible");
    ProductPage.addToCartButton.should("be.enabled");

    ProductPage.addToCart();

    ProductPage.cartMessage.should("be.visible");
  });
});
const myWishlistPage = require("../pageObjects/myWishlistPage");
const { shoppingCart } = require("./productCommands");
const { wishlist } = require("./productCommands");

Cypress.Commands.add("addAllWishlistProductsToCart", () => {
  cy.reload();
  cy.get(myWishlistPage.sidebarElement).should("be.visible");
  cy.get(myWishlistPage.addAllToCart).click({ force: true });

  wishlist.products.forEach((product) => {
    shoppingCart.addProduct(product);
  });
  cy.get(myWishlistPage.messages, { timeout: 5000 }).should(
    "contain",
    `product(s) have been added to shopping cart:`
  );
  wishlist.clearProducts();
});

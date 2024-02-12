require("cypress-real-events/support");
const productDetailsPage = require("../pageObjects/productDetailsPage");
const ShoppingCart = require("../utils/ShoppingCart");
const Wishlist = require("../utils/Wishlist");
export const shoppingCart = new ShoppingCart();
export const wishlist = new Wishlist();

Cypress.Commands.add(
  "addProductToCart",
  (productName, productQuantity, productSize, productColor) => {
    cy.fixture("products.json").then((productsFromFixtures) => {
      const product = productsFromFixtures.find(
        (product) => product.name === productName
      );
      if (productSize && productColor) {
        product.size = product.size.find((size) => size === productSize);
        product.color = product.color.find((color) => color === productColor);
      }
      product.quantity = parseInt(productQuantity);

      cy.visit(product.url);
      cy.document().its("readyState").should("eq", "complete");
      if (productSize && productColor) {
        cy.contains(productDetailsPage.size, product.size).click();
        cy.get(productDetailsPage.color(product.color)).click();
      }
      cy.get(productDetailsPage.quantity).clear().type(product.quantity);
      cy.get(productDetailsPage.addToCartButton).click();
      cy.get(productDetailsPage.addToCartButton)
        .should("include.text", "Added")
        .then(() => {
          cy.log(product);
          shoppingCart.addProduct(product);
        });
    });
  }
);

Cypress.Commands.add(
  "addProductToWishlist",
  (productName, productQuantity, productSize, productColor) => {
    cy.fixture("products.json").then((productsFromFixtures) => {
      const product = productsFromFixtures.find(
        (product) => product.name === productName
      );
      if (productSize && productColor) {
        product.size = product.size.find((size) => size === productSize);
        product.color = product.color.find((color) => color === productColor);
      }
      product.quantity = parseInt(productQuantity);

      cy.visit(product.url);
      if (productSize && productColor) {
        cy.contains(productDetailsPage.size, product.size)
          .should("be.visible")
          .click();
        cy.get(productDetailsPage.color(product.color))
          .should("be.visible")
          .click();
      }
      cy.get(productDetailsPage.quantity).clear().type(product.quantity);
      cy.get(productDetailsPage.addToWishlistButton)
        .click()
        .then(() => {
          wishlist.addProduct(product);
        });
    });
  }
);

Cypress.Commands.add("clearShoppingCart", () => {
  shoppingCart.clear();
});

const cartPage = require("../pageObjects/cartPage");
const { shoppingCart } = require("./productCommands");

Cypress.Commands.add("verifyCart", () => {
  shoppingCart.products.length === 0
    ? cy
        .get(cartPage.cartEmpty, { timeout: 9000 })
        .should("contain", "You have no items in your shopping cart.")
    : shoppingCart.products.forEach((product, index) => {
        cy.get(cartPage.cartItem(index).quantity)
          .invoke("val")
          .should("eq", shoppingCart.products[index].quantity.toString());
        cy.get(cartPage.cartItem(index).price).should(
          "contain",
          shoppingCart.products[index].price
        );
        cy.get(cartPage.cartItem(index).subtotal).should(
          "contain",
          shoppingCart.products[index].price *
            shoppingCart.products[index].quantity
        );
        if (shoppingCart.products[index].size) {
          cy.get(cartPage.cartItem(index).size).should(
            "contain",
            shoppingCart.products[index].size
          );
        }
        if (shoppingCart.products[index].color) {
          cy.get(cartPage.cartItem(index).color).should(
            "contain",
            shoppingCart.products[index].color
          );
        }
      });
});

Cypress.Commands.add("verifySummary", () => {
  // cy.get(cartPage.summaryLoader).should("not.be.visible");
  cy.get(cartPage.subtotal).should(
    "contain",
    `$${shoppingCart.calculateSubtotalPrice()}`
  );

  shoppingCart.calculateTotalDiscounts() !== 0
    ? cy
        .get(cartPage.discount)
        .should("contain", `-$${shoppingCart.calculateTotalDiscounts()}`)
    : cy.get(cartPage.discount).should("not.be.exist");

  cy.get(cartPage.orderTotal).should(
    "contain",
    `$${shoppingCart.calculateGrandTotal()}`
  );
});

Cypress.Commands.add("proceedToCheckout", () => {
  cy.get(cartPage.orderTotal).should("be.visible");
  // cy.get(cartPage.summaryLoader).should("not.be.visible");
  cy.get(cartPage.proceedToCheckout).click({ force: true });
});

Cypress.Commands.add(
  "updateProductQuantityInCart",
  (productName, productQuantity, productSize, productColor) => {
    let index = shoppingCart.getProductIndex(
      productName,
      productSize,
      productColor
    );

    cy.get(cartPage.cartItem(index).quantity).clear().type(productQuantity);

    cy.get(cartPage.updateShoppingCart)
      .click()
      .then(() => {
        shoppingCart.updateProductQuantity(index, productQuantity);
      });
    cy.get(cartPage.cartItem(index).quantity)
      .invoke("val")
      .should("contain", productQuantity);
    cy.get(".loading-mask").should("not.be.visible");
  }
);

Cypress.Commands.add(
  "removeProductInCart",
  (productName, productSize, productColor) => {
    let index = shoppingCart.getProductIndex(
      productName,
      productSize,
      productColor
    );

    cy.get(cartPage.summaryLoader).should("not.be.visible");
    cy.get(cartPage.cartItem(index).delete)
      .click()
      .then(() => {
        shoppingCart.removeProduct(index);
      });
  }
);

Cypress.Commands.add("addCoupon", (coupon) => {
  cy.get("#block-discount-heading").click();
  cy.get("#coupon_code").clear().type(coupon);
  cy.get("#discount-coupon-form .action")
    .click()
    .then(() => {
      shoppingCart.addCoupon(coupon);
    });
});

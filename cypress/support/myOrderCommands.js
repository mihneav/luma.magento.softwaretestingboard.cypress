const myOrderPage = require("../pageObjects/myOrderPage");
const { shoppingCart } = require("./productCommands");

Cypress.Commands.add("verifyLastOrder", () => {
  cy.get("@user").then((user) => {
    const orderId = parseInt(user.orders.slice(-1)[0].replace("#", ""));
    cy.visit(`/sales/order/view/order_id/${orderId - 1}`);
  });
  cy.verifyLastOrderNumberAndStatus();
  cy.verifyLastOrderRows();
  cy.verifyLastOrderSummary();
  cy.verifyOrderBillingAddress();
  cy.verifyOrderShippingAddress();
});

Cypress.Commands.add("verifyLastOrderNumberAndStatus", () => {
  cy.get("@orderNumber").then((orderNumber) => {
    cy.get(myOrderPage.orderTitle).should("contain", orderNumber);
  });
  cy.get(myOrderPage.orderStatus).should("have.text", "Pending");
});

Cypress.Commands.add("verifyLastOrderRows", () => {
  shoppingCart.products.forEach((product, index) => {
    cy.get(myOrderPage.orderItemRow(index).quantity).should(
      "have.text",
      shoppingCart.products[index].quantity.toString()
    );
    cy.get(myOrderPage.orderItemRow(index).price).should(
      "contain",
      shoppingCart.products[index].price
    );
    cy.get(myOrderPage.orderItemRow(index).subtotal).should(
      "contain",
      shoppingCart.products[index].price * shoppingCart.products[index].quantity
    );
    if (shoppingCart.products[index].size) {
      cy.get(myOrderPage.orderItemRow(index).itemOptions).should(
        "contain",
        shoppingCart.products[index].size
      );
    }
    if (shoppingCart.products[index].color) {
      cy.get(myOrderPage.orderItemRow(index).itemOptions).should(
        "contain",
        shoppingCart.products[index].color
      );
    }
  });
});

Cypress.Commands.add("verifyLastOrderSummary", () => {
  cy.get(myOrderPage.subtotal).should(
    "contain",
    `$${shoppingCart.calculateSubtotalPrice()}`
  );
});

Cypress.Commands.add("verifyOrderInformation", () => {});

Cypress.Commands.add("verifyOrderBillingAddress", () => {
  cy.verifyAddress("billingAddress", myOrderPage);
});

Cypress.Commands.add("verifyOrderShippingAddress", () => {
  cy.verifyAddress("shippingAddress", myOrderPage);
});

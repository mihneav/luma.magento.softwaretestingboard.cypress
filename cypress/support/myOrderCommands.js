const { billingAddress } = require("../pageObjects/checkoutPage");
const myOrderPage = require("../pageObjects/myOrderPage");
const { shoppingCart } = require("./productCommands");

// Cypress.Commands.add("verifyLastOrder", () => {
//   cy.get("@user").then((user) => {
//     const lastOrder = user.orders.slice(-1)[0];
//     const orderId = parseInt(lastOrder.replace("#", ""));
//     cy.visit(`/sales/order/view/order_id/${orderId - 1}`);
//   });
//   cy.verifyLastOrderNumberAndStatus();
//   cy.verifyLastOrderRows();
//   cy.verifyLastOrderSummary();
//   // cy.verifyOrderBillingAddress();
//   // cy.verifyOrderShippingAddress();
// });

// Cypress.Commands.add("verifyLastOrderNumberAndStatus", () => {
//   cy.get("@orderNumber").then((orderNumber) => {
//     cy.get(myOrderPage.orderTitle).should("contain", parseInt(orderNumber));
//   });
//   cy.get(myOrderPage.orderStatus).should("have.text", "Pending");
// });

// Cypress.Commands.add("verifyLastOrderRows", () => {
//   shoppingCart.products.forEach((product, index) => {
//     cy.get(myOrderPage.orderItemRow(index).quantity).should(
//       "have.text",
//       shoppingCart.products[index].quantity.toString()
//     );
//     cy.get(myOrderPage.orderItemRow(index).price).should(
//       "contain",
//       shoppingCart.products[index].price
//     );
//     cy.get(myOrderPage.orderItemRow(index).subtotal).should(
//       "contain",
//       shoppingCart.products[index].price * shoppingCart.products[index].quantity
//     );
//     if (shoppingCart.products[index].size) {
//       cy.get(myOrderPage.orderItemRow(index).itemOptions).should(
//         "contain",
//         shoppingCart.products[index].size
//       );
//     }
//     if (shoppingCart.products[index].color) {
//       cy.get(myOrderPage.orderItemRow(index).itemOptions).should(
//         "contain",
//         shoppingCart.products[index].color
//       );
//     }
//   });
// });

// Cypress.Commands.add("verifyLastOrderSummary", () => {
//   cy.get(myOrderPage.subtotal).should(
//     "contain",
//     `$${shoppingCart.calculateSubtotalPrice()}`
//   );
// });

Cypress.Commands.add("verifyOrders", () => {
  cy.get("@user").then((user) => {
    user.orders.forEach((order) => {
      cy.visit(`/sales/order/view/order_id/${order.orderNumber - 1}`);
      cy.get(myOrderPage.orderTitle).should("contain", order.orderNumber);
      cy.get(myOrderPage.orderStatus).should("have.text", "Pending");
      order.products.forEach((product, index) => {
        cy.get(myOrderPage.orderItemRow(index).quantity).should(
          "have.text",
          order.products[index].quantity.toString()
        );
        cy.get(myOrderPage.orderItemRow(index).price).should(
          "contain",
          order.products[index].price
        );
        cy.get(myOrderPage.orderItemRow(index).subtotal).should(
          "contain",
          order.products[index].price * order.products[index].quantity
        );
        if (order.products[index].size) {
          cy.get(myOrderPage.orderItemRow(index).itemOptions).should(
            "contain",
            order.products[index].size
          );
        }
        if (order.products[index].color) {
          cy.get(myOrderPage.orderItemRow(index).itemOptions).should(
            "contain",
            order.products[index].color
          );
        }
      });
      cy.get(myOrderPage.subtotal).should("contain", order.subtotal.toFixed(2));
      if (order.discount > 0) {
        cy.get(myOrderPage.discount).should(
          "contain",
          order.discount.toFixed(2)
        );
      }

      cy.get(myOrderPage.shipping).should("contain", order.shipping.toFixed(2));
      cy.get(myOrderPage.grandTotal).should("contain", order.total);

      //TODO: refactor
      cy.get(myOrderPage.billingAddress, { timeout: 9000 })
        .should("be.visible")
        .as("billingAddress");
      cy.get(`@billingAddress`).should("contain", user.firstName);
      cy.get(`@billingAddress`).should("contain", user.lastName);
      cy.get(`@billingAddress`).should("contain", user.mobileNumber);

      Object.values(order.billingAddress).forEach((value) => {
        cy.get(`@billingAddress`).should("contain", value);
      });
      cy.get(myOrderPage.shippingAddress, { timeout: 9000 })
        .should("be.visible")
        .as("shippingAddress");
      cy.get(`@shippingAddress`).should("contain", user.firstName);
      cy.get(`@shippingAddress`).should("contain", user.lastName);
      cy.get(`@shippingAddress`).should("contain", user.mobileNumber);

      Object.values(order.shippingAddress).forEach((value) => {
        cy.get(`@shippingAddress`).should("contain", value);
      });
    });
  });
});

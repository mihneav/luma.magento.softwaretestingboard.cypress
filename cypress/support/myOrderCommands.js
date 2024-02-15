const { billingAddress } = require("../pageObjects/checkoutPage");
const myOrderPage = require("../pageObjects/myOrderPage");
const { shoppingCart } = require("./productCommands");

Cypress.Commands.add("verifyOrders", () => {
  cy.get("@user").then((user) => {
    user.orders.forEach((order) => {
      cy.visit(`/sales/order/view/order_id/${order.orderNumber - 1}`);
      cy.get(myOrderPage.orderTitle).should("contain", order.orderNumber);
      cy.get(myOrderPage.orderStatus).should("have.text", "Pending");
      order.products.forEach((product, index) => {
        cy.get(myOrderPage.orderItemRow(index).name)
          .should("be.visible")
          .should("contain", order.products[index].name);
        cy.get(myOrderPage.orderItemRow(index).quantity)
          .should("be.visible")
          .should("have.text", order.products[index].quantity.toString());
        cy.get(myOrderPage.orderItemRow(index).price)
          .should("be.visible")
          .should("contain", order.products[index].price);
        cy.get(myOrderPage.orderItemRow(index).subtotal)
          .should("be.visible")
          .should(
            "contain",
            order.products[index].price * order.products[index].quantity
          );
        if (order.products[index].size) {
          cy.get(myOrderPage.orderItemRow(index).itemOptions)
            .should("be.visible")
            .should("contain", order.products[index].size);
        }
        if (order.products[index].color) {
          cy.get(myOrderPage.orderItemRow(index).itemOptions)
            .should("be.visible")
            .should("contain", order.products[index].color);
        }
      });
      cy.get(myOrderPage.subtotal)
        .should("be.visible")
        .should("contain", order.subtotal.toFixed(2));
      if (order.discount > 0) {
        cy.get(myOrderPage.discount)
          .should("be.visible")
          .should("contain", order.discount.toFixed(2));
      }

      cy.get(myOrderPage.shipping)
        .should("be.visible")
        .should("contain", order.shipping.toFixed(2));
      cy.get(myOrderPage.grandTotal)
        .should("be.visible")
        .should("contain", order.total);

      cy.verifyAddress("billingAddress", myOrderPage, user);
      cy.verifyAddress("shippingAddress", myOrderPage, user);
    });
  });
});

Cypress.Commands.add("reorder", () => {
  cy.get("@user").then((user) => {
    const lastOrderIndex = user.orders.length - 1;
    const lastOrderNumber = user.orders[lastOrderIndex].orderNumber;
    cy.visit(`/sales/order/view/order_id/${lastOrderNumber - 1}`);
    cy.get(myOrderPage.sidebarRecentlyOrdered).should("be.visible");
    cy.get(myOrderPage.reorder).click();
    cy.verifyCart();
    cy.verifySummary();
    cy.proceedToCheckout();
    cy.selectBestWayShippingAndNext();
    cy.verifyShippingAddressCheckout();
    cy.verifyBillingAddressCheckout();
    cy.placeOrder();
    cy.verifyOrderSuccess();
  });
});

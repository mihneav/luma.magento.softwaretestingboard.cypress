const checkoutPage = require("../pageObjects/checkoutPage");
const editAddressPage = require("../pageObjects/editAddressPage");
const { shoppingCart } = require("./productCommands");
const Address = require("../utils/Address");
const Order = require("../utils/Order");
const multiCheckoutPage = require("../pageObjects/multiCheckoutPage");

Cypress.Commands.add("fillShippingAddress", () => {
  cy.get("@user").then((user) => {
    cy.get(checkoutPage.firstName, { timeout: 9000 })
      .clear()
      .type(user.firstName);
    cy.get(checkoutPage.lastName).clear().type(user.lastName);
    cy.get(checkoutPage.company).type(user.company);
    cy.get(checkoutPage.address1).type(user.billingAddress.address1);
    cy.get(checkoutPage.address2).type(user.billingAddress.address2);
    cy.get(checkoutPage.city).type(user.billingAddress.city);
    cy.get(checkoutPage.region).select(user.billingAddress.state);
    cy.get(checkoutPage.postCode).type(user.billingAddress.zipCode);
    cy.get(checkoutPage.country).select(user.billingAddress.country);
    cy.get(checkoutPage.telephone).type(user.mobileNumber);
  });
});

Cypress.Commands.add("selectBestWayShippingAndNext", () => {
  cy.get(checkoutPage.bestWayRadio).check();
  cy.get(checkoutPage.nextButton).click();
});

Cypress.Commands.add("selectFlatRateShippingAndNext", () => {
  cy.get(checkoutPage.flatRateRadio).check();
  cy.get(checkoutPage.nextButton).click();
});

Cypress.Commands.add("verifyBillingAddressCheckout", () => {
  cy.verifyAddress("billingAddress", checkoutPage);
});

Cypress.Commands.add("verifyShippingAddressCheckout", () => {
  cy.verifyAddress("shippingAddress", checkoutPage);
});

Cypress.Commands.add("addShippingAddressForEachCartItem", () => {
  const numberOfItems = shoppingCart.calculateNumberOfItems();
  cy.log(numberOfItems);
  for (let i = 0; i < numberOfItems; i++) {
    cy.url().then((url) => {
      if (!url.includes("/multishipping/checkout_address/newShipping/")) {
        cy.visit("/multishipping/checkout_address/newShipping/");
      }
    });
    cy.addMultiShippingAddress();
  }

  for (let i = 0; i < numberOfItems; i++) {
    cy.get(multiCheckoutPage.productShippingRows).eq(i).select(i);
  }
});

Cypress.Commands.add("clickUpdateQtyAndAddresses", () => {
  cy.get(multiCheckoutPage.updateQtyAndAddresses).click();
});

Cypress.Commands.add("placeMultiCheckoutOrder", () => {
  cy.wait(3000);

  cy.get(multiCheckoutPage.continueButton).click();
  // cy.location("pathname", { timeout: 60000 }).should("include", "/shipping/");

  cy.get(multiCheckoutPage.flatRateRadio).each(($radioButton) => {
    cy.wrap($radioButton).check();
  });

  cy.get(multiCheckoutPage.continueButton).click({ force: true });
  // cy.location("pathname", { timeout: 60000 }).should("include", "/billing/");

  cy.get(multiCheckoutPage.goToReviewOrder).click({ force: true });

  cy.scrollTo("bottom");
  cy.get(multiCheckoutPage.placeOrder).click({ force: true });
});

Cypress.Commands.add("verifyMultiCheckoutSuccess", () => {
  cy.get(multiCheckoutPage.orderIdRows).each((orderId, index) => {
    cy.get(orderId)
      .invoke("text")
      .then((orderNumberText) => {
        cy.get("@user").then((user) => {
          const order = new Order(
            orderNumberText.replaceAll("\n", ""),
            user.multiAddress[0],
            user.multiAddress[index],
            [shoppingCart.products[index]],
            0 // Discount
          );
          user.orders.push(order);
        });
      });
  });
});

Cypress.Commands.add("addMultiShippingAddress", () => {
  cy.get("@user").then((user) => {
    const address = new Address();
    cy.fillAddressFields(address);
    cy.get(editAddressPage.saveAddressButton).click();
    user.multiAddress.push(address);
  });
});

Cypress.Commands.add("checkShippingAddressSame", () => {
  cy.get(checkoutPage.loader).should("not.exist");
  cy.get(checkoutPage.billingAddressCheckbox).click();
  cy.get("@user").then((user) => {
    user.shippingAddress = user.billingAddress;
  });
});

Cypress.Commands.add("placeOrder", () => {
  cy.get(checkoutPage.placeOrderButton).click();
});

Cypress.Commands.add("verifyOrderSuccess", () => {
  cy.get(checkoutPage.successTitle).should(
    "have.text",
    "Thank you for your purchase!"
  );
  cy.get(checkoutPage.orderNumberLink)
    .invoke("text")
    .then((text) => {
      cy.get("@user").then((user) => {
        const order = new Order(
          text.replaceAll("\n", ""),
          user.billingAddress,
          user.shippingAddress,
          shoppingCart.products,
          shoppingCart.calculateTotalDiscounts()
        );
        user.orders.push(order);
      });
    });
});

Cypress.Commands.add("verifyOrderSuccessNoAccount", () => {
  cy.get(checkoutPage.successTitle).should(
    "have.text",
    "Thank you for your purchase!"
  );
  cy.get(checkoutPage.orderNumberText)
    .invoke("text")
    .then((text) => {
      cy.get("@user").then((user) => {
        const order = new Order(
          text.replaceAll("#", ""),
          user.billingAddress,
          user.shippingAddress,
          shoppingCart.products,
          shoppingCart.calculateTotalDiscounts()
        );
        user.orders.push(order);
      });
    });
});

Cypress.Commands.add("createAccountThankYou", () => {
  cy.get(checkoutPage.createAccount).click();
  cy.fillCreateAccountDetails();
});

Cypress.Commands.add("loginInCheckout", () => {
  cy.get(checkoutPage.loader).should("not.exist");
  cy.get("@user").then((user) => {
    cy.get(checkoutPage.signIn).should("be.visible").click();
    cy.get(checkoutPage.emailAddress).type(user.email);
    cy.get(checkoutPage.password).type(user.password);
  });
  cy.get(checkoutPage.signInButton).click();
  cy.get(checkoutPage.loader).should("be.visible");
  cy.get(checkoutPage.loader, { timeout: 15000 }).should("not.be.visible");
});

Cypress.Commands.add("fillEmailAddressCheckout", () => {
  cy.get("@user").then((user) => {
    cy.get(checkoutPage.email).type(user.email);
  });
});

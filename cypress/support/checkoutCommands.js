const checkoutPage = require("../pageObjects/checkoutPage");

Cypress.Commands.add("enterShippingAddress", () => {
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
  cy.get(checkoutPage.orderNumberLink).invoke("text").as("orderNumber");
  cy.get("@orderNumber").then((orderNumber) => {
    cy.get("@user").then((user) => {
      user.orders.push(orderNumber);
    });
  });
});

Cypress.Commands.add("verifyOrderSuccessNoAccount", () => {
  cy.get(checkoutPage.successTitle).should(
    "have.text",
    "Thank you for your purchase!"
  );
  cy.get(checkoutPage.orderNumberText).invoke("text").as("orderNumber");
  cy.get("@orderNumber").then((orderNumber) => {
    cy.get("@user").then((user) => {
      user.orders.push(orderNumber);
    });
  });
});

Cypress.Commands.add("createAccountThankYou", () => {
  cy.get(checkoutPage.createAccount).click();
  cy.enterCreateAccountDetails();
});

Cypress.Commands.add("loginInCheckout", () => {
  cy.get(checkoutPage.loader).should("not.be.visible");
  cy.get("@user").then((user) => {
    cy.get(checkoutPage.signIn).should("be.visible").click();
    cy.get(checkoutPage.emailAddress).type(user.email);
    cy.get(checkoutPage.password).type(user.password);
  });
  cy.get(checkoutPage.signInButton).click();
  cy.get(checkoutPage.loader).should("be.visible");
  cy.get(checkoutPage.loader, { timeout: 15000 }).should("not.be.visible");
});

Cypress.Commands.add("enterEmailAddressCheckout", () => {
  cy.get("@user").then((user) => {
    cy.get(checkoutPage.email).type(user.email);
  });
});

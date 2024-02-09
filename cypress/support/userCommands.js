const editAddressPage = require("../pageObjects/editAddressPage");
const myAccountPage = require("../pageObjects/myAccountPage");
const User = require("../utils/User");

Cypress.Commands.add("generateUser", () => {
  const userInstance = new User();
  const user = userInstance.generateUser();
  return user;
});

Cypress.Commands.add("createAccount", () => {
  cy.visit("/customer/account/create/");
  cy.enterCreateAccountDetails();
});

Cypress.Commands.add("logout", () => {
  cy.visit("/customer/account/logout/");
});

Cypress.Commands.add("login", () => {
  cy.get("@user").then((user) => {
    cy.visit("/customer/account/login/referer/");
    cy.get("#email").type(user.email);
    cy.get(".login-container #pass").type(user.password);
  });
  cy.get("#send2").click();
});

Cypress.Commands.add("addAccountAddress", () => {
  cy.visit("/customer/address/edit/");
  cy.get("@user").then((user) => {
    cy.get(editAddressPage.firstName).clear().type(user.firstName);
    cy.get(editAddressPage.lastName).clear().type(user.lastName);
    cy.get(editAddressPage.company).clear().type(user.company);
    cy.get(editAddressPage.telephone).clear().type(user.mobileNumber);
    cy.get(editAddressPage.street_1).clear().type(user.billingAddress.address1);
    cy.get(editAddressPage.street_2).clear().type(user.billingAddress.address2);
    cy.get(editAddressPage.city).clear().type(user.billingAddress.city);
    cy.get(editAddressPage.region_id).select(user.billingAddress.state);
    cy.get(editAddressPage.zip).clear().type(user.billingAddress.zipCode);
    cy.get(editAddressPage.country).select(user.billingAddress.country);
    cy.get(editAddressPage.saveAddressButton).click();
    cy.get(myAccountPage.editDefaultShippingAddress).click();
    cy.get(editAddressPage.street_1)
      .clear()
      .type(user.shippingAddress.address1);
    cy.get(editAddressPage.street_2)
      .clear()
      .type(user.shippingAddress.address2);
    cy.get(editAddressPage.city).clear().type(user.shippingAddress.city);
    cy.get(editAddressPage.region_id).select(user.shippingAddress.state);
    cy.get(editAddressPage.zip).clear().type(user.shippingAddress.zipCode);
    cy.get(editAddressPage.country).select(user.shippingAddress.country);
    cy.get(editAddressPage.saveAddressButton).click();
  });
});

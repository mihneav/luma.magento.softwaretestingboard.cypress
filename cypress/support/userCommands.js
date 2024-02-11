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
  cy.fillCreateAccountDetails();
});

Cypress.Commands.add("logout", () => {
  cy.visit("/customer/account/logout/");
});

Cypress.Commands.add("login", () => {
  cy.get("@user").then((user) => {
    cy.visit("/customer/account/login/referer/");
    cy.get(loginPage.email).type(user.email);
    cy.get(loginPage.password).type(user.password);
  });
  cy.get(loginPage.signIn).click();
});

Cypress.Commands.add("addAccountAddress", () => {
  cy.visit("/customer/address/edit/");
  cy.get("@user").then((user) => {
    cy.fillAddressFields(user.billingAddress);
    cy.get(editAddressPage.saveAddressButton).click();
    cy.visit("/customer/address/new/");
    cy.fillAddressFields(user.shippingAddress);
    cy.get(editAddressPage.primaryShipping).check();
    cy.get(editAddressPage.saveAddressButton).click();
  });
});

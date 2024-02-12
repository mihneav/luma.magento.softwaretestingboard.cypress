const createAccountPage = require("../pageObjects/createAccountPage");
const editAddressPage = require("../pageObjects/editAddressPage");
const { shoppingCart } = require("./productCommands");

Cypress.Commands.add("goToCart", () => {
  cy.visit("/checkout/cart/");
  cy.log(shoppingCart);
});

Cypress.Commands.add("verifyAddress", (addressType, page) => {
  cy.get("@user").then((user) => {
    cy.get(page[addressType], { timeout: 9000 })
      .should("be.visible")
      .as(addressType);
    cy.get(`@${addressType}`).should("contain", user.firstName);
    cy.get(`@${addressType}`).should("contain", user.lastName);
    cy.get(`@${addressType}`).should("contain", user.mobileNumber);

    Object.values(user[addressType]).forEach((value) => {
      cy.get(`@${addressType}`).should("contain", value);
    });
  });
});

Cypress.Commands.add("fillAddressFields", (address) => {
  cy.get("@user").then((user) => {
    cy.get(editAddressPage.firstName).clear().type(user.firstName);
    cy.get(editAddressPage.lastName).clear().type(user.lastName);
    cy.get(editAddressPage.company).clear().type(user.company);
    cy.get(editAddressPage.telephone).clear().type(user.mobileNumber);
    cy.get(editAddressPage.street_1).clear().type(address.address1);
    cy.get(editAddressPage.street_2).clear().type(address.address2);
    cy.get(editAddressPage.city).clear().type(address.city);
    cy.get(editAddressPage.region_id).select(address.state);
    cy.get(editAddressPage.zip).clear().type(address.zipCode);
    cy.get(editAddressPage.country).select(address.country);
  });
});

Cypress.Commands.add("fillCreateAccountDetails", () => {
  cy.get("@user").then((user) => {
    cy.get(createAccountPage.firstname).clear().type(user.firstName);
    cy.get(createAccountPage.lastname).clear().type(user.lastName);
    cy.get(createAccountPage.emailAddress).clear().type(user.email);
    cy.get(createAccountPage.password).clear().type(user.password);
    cy.get(createAccountPage.passwordConfirmation).clear().type(user.password);
    cy.get(createAccountPage.createAccountButton).click();
    cy.get(createAccountPage.contactInformation).should("contain", user.email);
  });
});

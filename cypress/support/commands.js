const createAccountPage = require("../pageObjects/createAccountPage");

Cypress.Commands.add("goToCart", () => {
  cy.visit("/checkout/cart/");
  // cy.get(".counter-number").should("be.visible");
  // cy.get(".showcart").click();
  // cy.get(".viewcart").click();
});

Cypress.Commands.add("cleanUp", () => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
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

Cypress.Commands.add("enterCreateAccountDetails", () => {
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

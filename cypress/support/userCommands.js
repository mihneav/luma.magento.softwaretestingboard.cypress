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

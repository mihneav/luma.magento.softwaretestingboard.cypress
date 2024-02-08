describe("Validate Add/Update/Remove Cart Functionality", () => {
  before(() => {
    cy.cleanUp();
  });

  beforeEach(() => {
    cy.clearShoppingCart();
  });

  it(`Update Quantities`, () => {
    // Add "Aether Gym Pant" to the Cart
    // Add "Radiant Tee" to the Cart
    // Modify "Radiant Tee" quantity from 4 to 7
    // Modify "Aether Gym Pant" from 1 to 3
    // Verify product details

    cy.addProductToCart("Aether Gym Pant", 1, "34", "Brown");
    cy.addProductToCart("Radiant Tee", 4, "S", "Blue");
    cy.goToCart();
    cy.updateProductQuantityInCart("Radiant Tee", 7, "S", "Blue");
    cy.updateProductQuantityInCart("Aether Gym Pant", 3, "34", "Brown");
    cy.verifyCart();
  });

  it(`Remove Products`, () => {
    // Add "Aether Gym Pant" to the Cart
    // Add "Radiant Tee" to the Cart
    // Verify product details
    // Remove "Aether Gym Pant"
    // Verify product details
    // Remove "Radiant Tee"
    // Verify that the cart is empty

    cy.addProductToCart("Aether Gym Pant", 1, "34", "Brown");
    cy.addProductToCart("Radiant Tee", 4, "S", "Blue");
    cy.goToCart();
    cy.removeProductInCart("Radiant Tee", "S", "Blue");
    cy.verifyCart();
    cy.removeProductInCart("Aether Gym Pant", "34", "Brown");
    cy.verifyCart();
  });
});

describe("Validate Add/Update/Remove Cart Functionality", () => {
  beforeEach(() => {
    cy.clearShoppingCart();
  });

  it(`Update Quantities`, () => {
    // Add "Aether Gym Pant" to the Cart
    // Add "Radiant Tee" to the Cart
    // Modify "Radiant Tee" quantity from 4 to 7
    // Modify "Aether Gym Pant" from 1 to 3
    // Verify cart product details
    // Verify cart Summary

    cy.addProductToCart("Aether Gym Pant", 2, "34", "Brown");
    cy.addProductToCart("Radiant Tee", 2, "S", "Blue");
    cy.goToCart();
    cy.verifyCart();
    cy.updateProductQuantityInCart("Radiant Tee", 4, "S", "Blue");
    cy.updateProductQuantityInCart("Aether Gym Pant", 1, "34", "Brown");
    cy.verifyCart();
    cy.verifySummary();
  });

  it(`Remove Products`, () => {
    // Add "Aether Gym Pant" to the Cart
    // Add "Radiant Tee" to the Cart
    // Verify cart product details
    // Remove "Aether Gym Pant"
    // Verify cart product details
    // Remove "Radiant Tee"
    // Verify that the cart is empty

    cy.addProductToCart("Aether Gym Pant", 1, "34", "Brown");
    cy.addProductToCart("Radiant Tee", 4, "S", "Blue");
    cy.goToCart();
    cy.verifyCart();
    cy.removeProductInCart("Radiant Tee", "S", "Blue");
    cy.verifyCart();
    cy.removeProductInCart("Aether Gym Pant", "34", "Brown");
    cy.verifyCart();
  });

  it(`Add Products To Wishlist and Add All to Cart`, () => {
    // Add "Radiant Tee", quantity 4 to Wishlist
    // Add "Arcadio Gym Short", quantity 1 to Wishlist
    // Add All Wishlist Products to Cart
    // Go to Cart
    // Verify cart product details
    // Verify cart Summary
    cy.generateUser().as("user");
    cy.createAccount();
    cy.addProductToWishlist("Radiant Tee", 4, "S", "Blue");
    cy.addProductToWishlist("Arcadio Gym Short", 1, "32", "Blue");
    // cy.addProductToWishlist("Affirm Water Bottle", 2); // (uncaught exception)TypeError: Cannot read properties of undefined (reading 'setOptions')
    cy.addAllWishlistProductsToCart();
    cy.goToCart();
    cy.verifyCart();
    cy.verifySummary();
  });
});

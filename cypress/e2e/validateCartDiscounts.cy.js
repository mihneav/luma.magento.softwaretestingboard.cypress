describe("Validate Discounts Functionality", () => {
  beforeEach(() => {
    cy.clearShoppingCart();
  });

  it(`Verifies 3 for 1 for t-shirts`, () => {
    // Add "Radiant Tee" to the Cart, quantity 3
    // Verify product details
    // Verify Order Summary with no discount applied
    // Modify "Radiant Tee" quantity from 3 to 4
    // Verify product details
    // Verify Order Summary with Discount

    cy.addProductToCart("Radiant Tee", 3, "M", "Orange");
    cy.goToCart();
    cy.verifyCart();
    cy.verifySummary();
    cy.updateProductQuantityInCart("Radiant Tee", 4, "M", "Orange");
    cy.verifyCart();
    cy.verifySummary();
  });

  it(`Verifies discount coupons`, () => {
    // Add "Affirm Water Bottle" to the Cart, quantity 1
    // Verify product details
    // Verify Order Summary with no discount applied
    // Add "h20" voucher
    // Verify Order Summary with Discount
    // Modify "Affirm Water Bottle" quantity from 1 to 3
    // Verify product details
    // Verify Order Summary with Discount

    cy.addProductToCart("Affirm Water Bottle", 1);
    cy.goToCart();
    cy.verifyCart();
    cy.verifySummary();
    cy.addCoupon("h20");
    cy.verifySummary();
    cy.updateProductQuantityInCart("Affirm Water Bottle", 3);
    cy.verifyCart();
    cy.verifySummary();
  });

  it(`Verifies 20% off $200 purchase FAIL`, () => {
    //fails, promotion does not apply to all products
    // Add "Overnight Duffle" to the Cart, quantity 4
    // Verify product details
    // Verify Order Summary with no discount applied
    // Modify "Overnight Duffle" quantity from 4 to 5
    // Verify product details
    // Verify Order Summary with Discount

    cy.addProductToCart("Cruise Dual Analog Watch", 3);
    cy.goToCart();
    cy.verifyCart();
    cy.verifySummary();
    cy.updateProductQuantityInCart("Cruise Dual Analog Watch", 4);
    cy.verifyCart();
    cy.verifySummary();
  });
});

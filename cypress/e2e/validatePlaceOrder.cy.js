describe("Validate Place Order Functionality", () => {
  before(() => {
    cy.cleanUp();
  });

  beforeEach(() => {
    cy.clearShoppingCart();
    cy.generateUser().as("user");
  });

  it(`Place order with user logged`, () => {
    // Create Account
    // Add "Radiant Tee" to the Cart, quantity 3
    // Add "Arcadio Gym Short", quantity 1
    // Verify product details
    // Verify Order Summary
    // Proceed to checkout
    // Type Shipping Address Details
    // Select "Best Way" shipping and click "Next"
    // Check "Shipping Address is the same as Billing Address"
    // Place Order
    // Verify Order Success Message
    // Verify last order in My Orders:
    //  Order Number, Order Status, Order Rows,
    //  SubTotal, Total,
    //  Billing Address, Shipping Address

    cy.createAccount();
    cy.addProductToCart("Radiant Tee", 3, "M", "Orange");
    cy.addProductToCart("Arcadio Gym Short", 1, "32", "Blue");
    cy.goToCart();
    cy.verifyCart();
    cy.verifySummary();
    cy.proceedToCheckout();
    cy.enterShippingAddress();
    cy.selectBestWayShippingAndNext();
    cy.verifyShippingAddress();
    cy.checkShippingAddressSame();
    cy.placeOrder();
    cy.verifyOrderSuccess();
    cy.verifyLastOrder();
  });

  it(`Place order and create user in checkout`, () => {
    // Add "Radiant Tee" to the Cart, quantity 3
    // Add "Arcadio Gym Short", quantity 1
    // Add "Affirm Water Bottle", quantity 2
    // Verify product details
    // Verify Order Summary
    // Add "h20" voucher
    // Verify product details
    // Verify Order Summary
    // Proceed to checkout
    // Type Shipping Address Details
    // Type Email
    // Select "Best Way" shipping and click "Next"
    // Check "Shipping Address is the same as Billing Address"
    // Place Order
    // Verify Order Success Message
    // Click Create Account
    // Enter Create Account Details and Submit
    // Verify last order in My Orders:
    //  Order Number, Order Status, Order Rows,
    //  SubTotal, Total,
    //  Billing Address, Shipping Address

    cy.addProductToCart("Radiant Tee", 4, "S", "Blue");
    cy.addProductToCart("Arcadio Gym Short", 1, "32", "Blue");
    cy.addProductToCart("Affirm Water Bottle", 2);
    cy.goToCart();
    cy.verifyCart();
    cy.verifySummary();
    cy.addCoupon("h20");
    cy.verifyCart();
    cy.verifySummary();
    cy.proceedToCheckout();
    cy.enterShippingAddress();
    cy.enterEmailAddressCheckout();
    cy.selectBestWayShippingAndNext();
    cy.verifyShippingAddress();
    cy.checkShippingAddressSame();
    cy.placeOrder();
    cy.verifyOrderSuccessNoAccount();
    cy.createAccountThankYou();
    cy.verifyLastOrder();
  });

  it(`Place order and login user in checkout`, () => {
    // Create User Account
    // Logout
    // Add "Short" to the Cart, quantity 3
    // Verify product details
    // Verify Order Summary
    // Proceed to checkout
    // Log in Checkout
    // Type Shipping Address Details
    // Select "Best Way" shipping and click "Next"
    // Check "Shipping Address is the same as Billing Address"
    // Place Order
    // Verify Order Success Message
    // Verify last order in My Orders:
    //  Order Number, Order Status, Order Rows,
    //  SubTotal, Total,
    //  Billing Address, Shipping Address

    cy.createAccount();
    cy.logout();
    cy.addProductToCart("Arcadio Gym Short", 3, "32", "Blue");
    cy.goToCart();
    cy.verifyCart();
    cy.verifySummary();
    cy.proceedToCheckout();
    cy.loginInCheckout();
    cy.enterShippingAddress();
    cy.selectBestWayShippingAndNext();
    cy.verifyShippingAddress();
    cy.checkShippingAddressSame();
    cy.placeOrder();
    cy.verifyOrderSuccess();
    cy.verifyLastOrder();
  });

  //   it(`Place order with existing addresses`, () => {
  //     // Create User Account
  //     // Logout
  //     // Add "Short" to the Cart, quantity 3
  //     // Verify product details
  //     // Verify Order Summary
  //     // Proceed to checkout
  //     // Log in Checkout
  //     // Type Shipping Address Details
  //     // Select "Best Way" shipping and click "Next"
  //     // Check "Shipping Address is the same as Billing Address"
  //     // Place Order
  //     // Verify Order Success Message
  //     // Verify last order in My Orders:
  //     //  Order Number, Order Status, Order Rows,
  //     //  SubTotal, Total,
  //     //  Billing Address, Shipping Address

  //     cy.createAccount();
  //     cy.addAccountAddress();
  //     // cy.logout();
  //     // cy.addProductToCart("Arcadio Gym Short", 3, "32", "Blue");
  //     // cy.goToCart();
  //     // cy.verifyCart();
  //     // cy.verifySummary();
  //     // cy.proceedToCheckout();
  //     // cy.loginInCheckout();
  //     // cy.enterShippingAddress();
  //     // cy.selectBestWayShippingAndNext();
  //     // cy.verifyShippingAddress();
  //     // cy.checkShippingAddressSame();
  //     // cy.placeOrder();
  //     // cy.verifyOrderSuccess();
  //     // cy.verifyLastOrder();
  //   });
});

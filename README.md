
# Cypress Automation Project for https://magento.softwaretestingboard.com/

Regression test suite for the order placement process for https://magento.softwaretestingboard.com/

## Prerequisites
Ensure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
## Installation

```
npm install
```

## Run
```
npx cypress run --browser chrome --headless
```
or
```
npx cypress open
```

## Known Issues with the AUT:
- The AUT rarely throws "(uncaught exception)TypeError: $(...).AddFotoramaVideoEvents is not a function" in Product Details pages.
- The AUT rarely throws Unable to process binding "blockLoader: function(){return isLoading }"
- The AUT rarely Message: Cannot read properties of undefined (reading 'clone') in Product Details pages.
- The AUT rarely throws (uncaught exception)ReferenceError: Unable to process binding "afterRender: function(){return setModalElement }" Message: setModalElement is not defined in the Cart Page
- Not all promotions are implemented
- 
## Known Issues with the Current Implementation
- validatePlaceOrder.cy.js - Place order with multiple addresses sometimes fails due to not proceeding in the Multi Shipping process

- validatePlaceOrder.cy.js - Reoder process sometimes fails due to not proceeding after pressing the Reorder Button

- Tests fail when encountering issues mentioned in Known Issues with the AUT
- Order Total validation fails due to some states having taxes implemented

- Tests don't properly run Firefox

## Bugs

Summary: Discounts are incorrectly calculated when Promotions overlap

Description: Discounts are incorrectly calculated when product promotions overlap with 20% off orders > $200:

Steps to reproduce:

- Navigate to https://magento.softwaretestingboard.com/overnight-duffle.html and add quantity 5 to the Shopping Cart
- Go to the Shopping Cart
- Check the Order Summary:
  { Subtotal:	$225.00, Discount:	-$45.00, Tax:	$0.00, Total:	180.00}
- Navigate to https://magento.softwaretestingboard.com/radiant-tee.html add quantity 4 to the Shopping Cart
- Go to the Shopping Cart
- Check the Order Summary:
Expected: { Subtotal:	$313.00, Discount:	-$111.00, Tax:	$0.00, Order Total:     $202.00 } 

// Cumulative Discount, assuming it doesn't apply to already discounted items: Radiant Tee Discount = 4*22-22 = 66 | Overnight Duffle = (5x45.00)*0.2 = 45 | Total Discount = 66+45 = 111

Actual: { Subtotal:	$313.00, Discount:	-$116.20, Tax:	$0.00, Order Total:     $196.80 } 

Severity: Major

---
Summary: 20% off orders > $200 doesn't apply at an order level:

Description: 20% off orders > $200 aren't calculated at an order level, as there are products that do not trigger this promotion.

Steps to reproduce:

- Navigate to https://magento.softwaretestingboard.com/cruise-dual-analog-watch.html and add quantity 5 to the Shopping Cart
- Go to the Shopping Cart
- Check the Order Summary:
Expected: { Subtotal:	$220.00, Discount:	-$44, Tax:	$0.00, Order Total:     $176.00 } 

Actual: { Subtotal:	$220.00,  Tax:	$0.00, Order Total:     $220.00 } 

Severity: Major 
## To Do:
- tax validation
- shipping method variation
- Add Recently Ordered Products to Cart

## Test Execution:
![image](https://github.com/mihneav/luma.magento.softwaretestingboard.cypress/assets/7737551/cac9fe9e-50ef-418b-8ef5-5aa6fca3274a)
![image](https://github.com/mihneav/luma.magento.softwaretestingboard.cypress/assets/7737551/5a2dd094-2152-4779-afed-c080be0437a4)
![image](https://github.com/mihneav/luma.magento.softwaretestingboard.cypress/assets/7737551/e08cdcdd-c917-45c9-80c0-24873ebeb22b)



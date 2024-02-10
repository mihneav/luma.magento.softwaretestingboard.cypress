const multiCheckoutPage = {
  productShippingRows: `[id^="ship_"]`,
  updateQtyAndAddresses: `.update`,
  continueButton: `button.action.primary.continue`,
  flatRateRadio: `[id$="_flatrate"]`,
  goToReviewOrder: `#payment-continue`,
  placeOrder: `#review-button`,
  orderIdRows: `.orders-list >li .order-id`,
};

module.exports = multiCheckoutPage;

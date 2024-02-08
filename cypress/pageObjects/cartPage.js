const cartPage = {
  cartItem: function (index) {
    const selector = `.cart.item:nth(${index})`;
    return {
      price: `${selector} [data-th="Price"]`,
      subtotal: `${selector} [data-th="Subtotal"]`,
      quantity: `${selector} [data-role="cart-item-qty"]`,
      size: `${selector} .item-options > :nth-child(2)`,
      color: `${selector} .item-options > :nth-child(4)`,
      update: `${selector} .action-edit`,
      delete: `${selector} .action-delete`,
    };
  },

  updateShoppingCart: `[value="update_qty"]`,
  subtotal: `.sub [data-th="Subtotal"]`,
  discount: `[data-th="Discount"]`,
  tax: `[data-th="Tax"]`,
  orderTotal: `[data-th="Order Total"]`,
  proceedToCheckout: `[data-role="proceed-to-checkout"]`,
  multiCheckout: ".multicheckout",
  cartEmpty: ".cart-empty",
  summaryLoader: ".loader > img",
};

module.exports = cartPage;

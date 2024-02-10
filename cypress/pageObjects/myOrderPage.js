const myOrderPage = {
  orderTitle: `.base`,
  orderStatus: `.order-status`,
  orderItemRow: function (index) {
    const selector = `[id^="order-item-row"]:nth(${index})`;
    return {
      name: `${selector} [data-th="Price"]`,
      itemOptions: `${selector}  .item-options`,
      sku: `${selector} .sku`,
      price: `${selector}  > .col.price .price`,
      quantity: `${selector}  .content`,
      subtotal: `${selector} .subtotal .price`,
      delete: `${selector} .action-delete`,
    };
  },
  subtotal: `.subtotal > .amount > .price`,
  discount: `.discount > .amount > .price`,
  shipping: `.shipping > .amount > .price`,
  grandTotal: `strong > .price`,
  shippingAddress: `.box-order-shipping-address > .box-content > address`,
  shippingMethod: `.box-order-shipping-method > .box-content`,
  billingAddress: `.box-order-billing-address > .box-content > address`,
  reorder: `.order > span`,
};

module.exports = myOrderPage;

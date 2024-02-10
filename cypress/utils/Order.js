class Order {
  constructor(
    orderNumber,
    billingAddress,
    shippingAddress,
    products,
    discount
  ) {
    this.orderNumber = orderNumber;
    this.billingAddress = billingAddress;
    this.shippingAddress = shippingAddress;
    this.products = products;
    this.discount = discount;
    this.subtotal = this.calculateSubtotalPrice();
    this.tax = 0;
    this.shipping = this.calculateShipping();
    this.total = this.calculateGrandTotal();
  }

  calculateSubtotalPrice() {
    const subtotalPrice = this.products
      .reduce(
        (sum, product) => sum + parseInt(product.price) * product.quantity,
        0
      )
      .toFixed(2);
    return parseFloat(subtotalPrice);
  }

  calculateShipping() {
    let shipping = 0;
    if (this.calculateSubtotalPrice() < 50) {
      shipping = 5;
    }
    return parseFloat(shipping);
  }
  calculateGrandTotal() {
    let total =
      this.calculateSubtotalPrice() - this.discount + this.calculateShipping();
    return total.toFixed(2);
  }
}

module.exports = Order;

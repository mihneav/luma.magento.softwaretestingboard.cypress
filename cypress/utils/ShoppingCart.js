export class ShoppingCart {
  constructor() {
    this.products = [];
    this.coupons = [];
  }

  addProduct(product) {
    const existingProduct = this.products.find(
      (productFromArray) =>
        productFromArray.name === product.name &&
        productFromArray.size === product.size &&
        productFromArray.color === product.color
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.products.push(product);
    }
  }

  updateProductQuantity(index, newQuantity) {
    this.products[index].quantity = newQuantity;
  }

  removeProduct(index) {
    this.products.splice(index, 1);
  }

  getProductIndex(productName, size, color) {
    const productIndex = this.products.findIndex(
      (productFromArray) =>
        productFromArray.name === productName &&
        (size === undefined || productFromArray.size === size) &&
        (color === undefined || productFromArray.color === color)
    );
    return productIndex;
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

  calculateTshirtsDiscount() {
    const discountedShirts = this.products.filter(
      (product) => product.name.includes("Tee") && product.quantity >= 4
    );
    console.log(discountedShirts);
    const totalShirtDiscount = discountedShirts
      .reduce(
        (sum, product) =>
          sum + product.price * Math.trunc(product.quantity / 4),
        0
      )
      .toFixed(2);
    return parseFloat(totalShirtDiscount);
  }

  // calculatePantsDiscount() { //promotion not implemented
  //   const discountedPants = this.products.filter((product) =>
  //     product.name.includes("Pant")
  //   );
  //   console.log(discountedPants);
  //   const totalPantsDiscount = discountedPants
  //     .reduce((sum, product) => sum + product.price * product.quantity * 0.2, 0)
  //     .toFixed(2);
  //   return parseFloat(totalPantsDiscount);
  // }

  calculateTwentyPercentDiscountOnOrder() {
    let discount = 0;
    if (this.calculateSubtotalPrice() >= 200.0) {
      discount = this.calculateSubtotalPrice() * 0.2;
    }

    return parseFloat(discount);
  }

  addCoupon(coupon) {
    this.coupons.push(coupon);
  }

  calculateCouponDiscount() {
    let totalCouponDiscount = 0;

    const discountedBottles = this.products.filter((product) =>
      product.name.includes("Water Bottle")
    );
    if (this.coupons.includes("h20")) {
      totalCouponDiscount = discountedBottles
        .reduce(
          (sum, product) => sum + product.price * product.quantity * 0.7,
          0
        )
        .toFixed(2);
    }
    return parseFloat(totalCouponDiscount);
  }

  calculateTotalDiscounts() {
    //TODO: tweak total Discounts calculation once cumulative 20% off orders > $200 is fixed
    return (
      this.calculateTshirtsDiscount() +
      this.calculateCouponDiscount() +
      // this.calculatePantsDiscount() +
      this.calculateTwentyPercentDiscountOnOrder()
    );
  }

  calculateNumberOfItems() {
    return this.products.reduce((sum, product) => sum + product.quantity, 0);
  }

  calculateGrandTotal() {
    let total = this.calculateSubtotalPrice() - this.calculateTotalDiscounts();
    return total.toFixed(2);
  }

  clearProducts() {
    this.products.length = 0;
  }
}

class Wishlist {
  constructor() {
    this.products = [];
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

  clearProducts() {
    this.products.length = 0;
  }
}

module.exports = Wishlist;

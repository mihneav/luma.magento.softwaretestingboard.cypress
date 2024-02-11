const productDetailsPage = {
  size: `.size > > `,
  color: function (color) {
    return `[option-label="${color}"]`;
  },
  quantity: `#qty`,
  addToCartButton: `#product-addtocart-button`,
  addToWishlistButton: `.product-addto-links > .towishlist`,
};

module.exports = productDetailsPage;

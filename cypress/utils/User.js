const { faker } = require("@faker-js/faker");
const Address = require("./Address");

class User {
  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.password = faker.internet.password() + "aA7!";
    this.company = faker.company.name();
    this.mobileNumber = faker.phone.number();
    this.billingAddress = new Address();
    this.shippingAddress = new Address();
    this.orders = [];
    this.multiAddress = [];
    this.multiProducts = [];
  }

  get email() {
    return faker.internet.email({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  get state() {
    return faker.location.state(this.country);
  }

  generateUser() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      company: this.company,
      billingAddress: this.billingAddress,
      shippingAddress: this.shippingAddress,
      mobileNumber: this.mobileNumber,
      orders: this.orders,
      multiAddress: this.multiAddress,
      multiProducts: this.multiProducts,
    };
  }
}

module.exports = User;

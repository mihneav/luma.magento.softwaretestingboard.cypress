const { faker } = require("@faker-js/faker");

class User {
  constructor() {
    this._firstName = faker.person.firstName();
    this._lastName = faker.person.lastName();
    this._password = faker.internet.password() + "aA7!";
    this._company = faker.company.name();

    this._country = "United States";
    this._city = faker.location.city();
    this._mobileNumber = faker.phone.number();
    this._orders = [];
  }

  get name() {
    return `${this._firstName} ${this._lastName}`;
  }

  get email() {
    return faker.internet.email({
      firstName: this._firstName,
      lastName: this._lastName,
    });
  }

  get zipcode() {
    return "12345-6789"; //faker.address.zipCode(`${this.state}`);
  }

  get state() {
    return faker.address.state(`${this._country}`);
  }

  generateAddress() {
    return {
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: this._country,
      zipcode: this.zipcode,
      state: this.state,
      city: this._city,
    };
  }

  generateUser() {
    return {
      name: this.name,
      email: this.email,
      password: this._password,
      firstname: this._firstName,
      lastname: this._lastName,
      company: this._company,
      billingAddress: this.generateAddress(),
      shippingAddress: this.generateAddress(),
      mobile_number: this._mobileNumber,
      orders: this._orders,
    };
  }
}

module.exports = User;

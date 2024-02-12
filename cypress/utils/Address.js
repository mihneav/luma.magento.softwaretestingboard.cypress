const { faker } = require("@faker-js/faker");

class Address {
  constructor() {
    this.country = "United States"; // Default country
    this.city = faker.location.city();
    this.zipCode = "12345-6789"; //faker.location.zipCode(`${this.state}`);
    this.state = faker.address.state(this.country);
    this.address1 = faker.location.streetAddress();
    this.address2 = faker.location.secondaryAddress();
  }
}

module.exports = Address;

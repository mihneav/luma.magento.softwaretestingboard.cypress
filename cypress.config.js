const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // reporter: "cypress-mochawesome-reporter",
    baseUrl: "https://magento.softwaretestingboard.com",
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 10000,
    // setupNodeEvents(on, config) {
    //   require("cypress-mochawesome-reporter/plugin")(on);
    // },
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 10000,
  },
});

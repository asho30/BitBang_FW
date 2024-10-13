const { defineConfig } = require("cypress");
module.exports = defineConfig({
  "video": true,
  "screenshotOnRunFailure": true,
  "chromeWebSecurity": false,
  "experimentalMemoryManagement": true,
  "viewportWidth": 1536,
  "viewportHeight": 960,
  "pageLoadTimeout": 10000,
  "requestTimeout": 10000,
  "responseTimeout": 20000,
  "defaultCommandTimeout": 20000,
  "retries": {
    "runMode": 0,
    "openMode": 0
  },
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.log(config) // see everything in here!
      return require('./cypress/plugins/index.js')(on, config);
    },
    "specPattern": "cypress/e2e/*.{js,jsx,ts,tsx}",
  }
});

//npx cypress open --env configFile=staging
//cypress run --env configFile=staging
/*env: {
  "url": "https://app-stag.amplifidor.com/",
  "firstName": "Ahmed",
  "lastName": "Ashour",
  "email": "ahmed.asho@yahoo.com",
  "phoneNumber": "9911122201",
  "superOTP": "123456",
  "companyName": "Amplifidor"
},*/
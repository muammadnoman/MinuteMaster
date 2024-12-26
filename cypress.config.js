const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://minutemasterdevapp-hmh5h0brftcebqaz.uksouth-01.azurewebsites.net',
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    pageLoadTimeout: 50000,
    defaultCommandTimeout: 50000,
    experimentalMemoryManagement: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Minutes Meeting Automation Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
      reportFilename: "Report-[datetime]-report",
      timestamp: "longDate"
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    users: {
      user1: {
        username: "noman.chaudhry@maildrop.cc",
        password: "qwertY12#",
      },
      user2: {
        username: "qatesthub2@gmail.com",
        password: "qwertY12#",
      },
      user3: {
        username: "qatesthub2@maildrop.cc",
        password: "qwertY12#",
      },
      userAdmin: {
        username: "gsa@maildrop.cc",
        password: "abcabc",
      }
    }
  }
})

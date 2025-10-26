const { defineConfig } = require("cypress");
const {readPdfFile} = require('./cypress/support/pdfUtils');

module.exports = defineConfig({
  
  watchForFileChanges: false,
  e2e: {
    browser: "electron",
    setupNodeEvents(on, config) {
      on('task', {
        readPdf({ path }){
          return readPdfFile(path)
        }
      })
      return config;
    },
    // defaultCommandTimeout: 10000
  },
});

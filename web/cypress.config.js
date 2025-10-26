const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      console.log("Configuração do Cypress carregada");
      return config;
    },
    // defaultCommandTimeout: 10000
  },
});

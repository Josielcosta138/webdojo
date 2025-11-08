const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const { readPdfFile } = require('./cypress/support/pdfUtils');
const cors = require('cors')

// Caminho para o arquivo temporário
const envPath = path.join(__dirname, 'cypress/fixtures', 'envToken.json');

module.exports = defineConfig({
  
  // watchForFileChanges: true,
  e2e: {
    browser: "electron",
    baseUrl: "http://localhost:3000",
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {

        on('task', {
          readPdf({ path }){
            return readPdfFile(path)
          },

          saveToken(token) {
          const envData = fs.existsSync(envPath)
            ? JSON.parse(fs.readFileSync(envPath, 'utf8'))
            : {};

          envData.token = token;
          fs.writeFileSync(envPath, JSON.stringify(envData, null, 2));
          config.env.token = token;

          return token;
        },

        saveDate(data) {
          const envData = fs.existsSync(envPath)
            ? JSON.parse(fs.readFileSync(envPath, 'utf8'))
            : {};

          envData.date = data;
          fs.writeFileSync(envPath, JSON.stringify(envData, null, 2));
          config.env.date = data;

          return data;
        },

        readToken() {
          if (!fs.existsSync(envPath)) return null;
          const envData = JSON.parse(fs.readFileSync(envPath, 'utf8'));
          return envData.token || null;
        },

        readDate() {
          if (!fs.existsSync(envPath)) return null;
          const envData = JSON.parse(fs.readFileSync(envPath, 'utf8'));
          return envData.date || null;
        },
          

      });

      return config
    },
  },
});

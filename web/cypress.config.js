const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const { readPdfFile } = require('./cypress/support/pdfUtils');
const cors = require('cors')
const os = require('os');
const pidusage = require('pidusage');

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

        obeterUsoDoSistema: async () => {
          const pid = process.pid;

          // Espera um pouquinho antes de medir
          await new Promise((resolve) => setTimeout(resolve, 500));

          const stats = await pidusage(pid);
          return {
            cpu: stats.cpu.toFixed(2),
            memory: (stats.memory / 1024 / 1024).toFixed(2)
          };
        },

        salvarPerformance(dados) {
          const dir = path.join(__dirname, 'cypress/results');
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          const filePath = path.join(dir, 'performance.json');
          fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
          return null;
        }
        

      });

      return config
    },
  },
});

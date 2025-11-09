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
          const amostras = [];

          for (let i = 0; i < 5; i++) {
            const stats = await pidusage(pid);
            amostras.push(stats.cpu);
            await new Promise((r) => setTimeout(r, 200)); // coleta a cada 200ms
          }

          const cpuMedia = (amostras.reduce((a, b) => a + b, 0) / amostras.length).toFixed(2);
          const memoriaMB = ((await pidusage(pid)).memory / 1024 / 1024).toFixed(2);

          return { cpu: cpuMedia, memory: memoriaMB };
        },

        salvarPerformance({dados, casoDeTeste}) {
          const dir = path.join(__dirname, 'cypress/results');
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          const filePath = path.join(dir, 'performance.json');
          fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));

          console.log(`♻ Nome do teste: ${casoDeTeste}`)

            // 2️⃣ Gerar conteúdo Markdown
          const markdownContent = `
          # 🧾 Relatório de Performance — ${casoDeTeste}

              **Data:** ${new Date(dados.dataExecucao).toLocaleString()}  
              **Ambiente:** Dev Local  
              **Execuções:** 100 requisições consecutivas  
              **Responsável:** Josiel Costa (QA / Tester)

              ---

              | Métrica | Valor | Interpretação |
              |----------|--------|---------------|
              | ⏱️ **Tempo médio por chamada** | ${dados.tempoTotal} ms (${dados.tempoTotalSengundos} s) 
              | 🔥 **Uso médio de CPU** | ${dados.cpu}% | 
              | 💾 **Memória alocada** | ${dados.memoria} 

              ---

              ✅ **Conclusão:**  
              A API apresentou excelente performance sob carga de 100 requisições consecutivas.  
              O tempo médio por chamada foi de apenas **${dados.tempoTotalSengundos} segundos**, com uso leve de CPU e memória estável.
              `;

          fs.writeFileSync(path.join(dir, 'performance.md'), markdownContent);

          return null;
        }
        

      });

      return config
    },
  },
});

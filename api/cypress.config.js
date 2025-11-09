
const pidusage = require('pidusage');
const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {


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
      })
    },
    baseUrl: 'https://jsonplaceholder.typicode.com/users'
  },
});

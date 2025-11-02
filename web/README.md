

# 🧪 Testes Automatizados - WebDojo com Cypress

Este repositório contém os testes automatizados da aplicação **WebDojo**, desenvolvidos com o framework **Cypress**. Os testes cobrem funcionalidades críticas da aplicação e são organizados para facilitar manutenção, escalabilidade e integração contínua.

Ele é um projeto de Estudo aplicado com o curso:
(Ninja do Cypress Uma jornada completa para aprender do absoluto ZERO!). 

Pelo professor: Fernando Papito.

---

## 🚀 Como executar o projeto

### 1. Instalar dependências

Certifique-se de ter o Node.js instalado. Em seguida, instale as dependências do projeto:

```bash
npm install
```

### 2. Executar a aplicação WebDojo

A aplicação está no mesmo repositório. Para iniciar o servidor local:

```bash
npm run dev
```

Isso irá servir a aplicação na porta `3000`.

### 3. Executar os testes Cypress

Você pode rodar os testes de diferentes formas:

- **Abrir interface gráfica do Cypress:**

```bash
npm run cypress:open
```

- **Executar testes em modo headless:**

```bash
npm run cypress:run
```

- **Executar testes com navegador visível:**

```bash
npm run cypress:headed
```

---

## 📁 Estrutura do projeto de testes

Abaixo está a estrutura da pasta `cypress`:

```
cypress/
├── actions/
│   └── consultancy.actions.js
├── e2e/
├── fixtures/
│   ├── 1.pdf
│   ├── consultancyForm.json
│   ├── endereceos.json
│   ├── envToken.json
│   └── RelatorioItensPorCliente.pdf
├── support/
│   ├── commands.js
│   ├── e2e.js
│   ├── index.d.ts
│   ├── pdfUtils.js
│   └── utils.js
└── cypress.config.js
```

### 📌 Descrição das pastas

- `actions/`: Contém arquivos com ações reutilizáveis para testes.
- `e2e/`: Pasta destinada aos testes end-to-end.
- `fixtures/`: Arquivos de dados e documentos utilizados nos testes.
- `support/`: Utilitários, comandos customizados e configurações de suporte.
- `cypress.config.js`: Arquivo de configuração principal do Cypress.

---

## 👨‍💻 Autor

<<<<<<< HEAD
![Josiel Costa - Foto de Perfil](cypress/fixtures/euPerfilEmpresarial.jpg)
=======
![Josiel Costa - Foto de Perfil](/cypress/web/cypress/fixtures/euPerfilEmpresarial.jpg)
>>>>>>> 7dac55d5ab1b76356bd8e5deb65bf221e0bbb7d7

**Josiel Costa**  
Especialista em QA | Cypress | CI  
Tecnologias: Java | React.js

GitHub: [github.com/seu-usuario-no-github](https://github.com/seu-usuario-no-github)
LinkeDin: [https://www.linkedin.com/in/josiel-costa](https://www.linkedin.com/in/josiel-costa-07b2aa140/)


---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```

Para baixar, clique/abra o cartão acima com o arquivo gerado. Se quiser que eu personalize mais (como incluir badges, exemplos de testes, ou instruções de CI), é só me chamar!

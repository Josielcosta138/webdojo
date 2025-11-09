// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-plugin-api';


Cypress.Commands.add('getUsersList', () => {
    return cy.api({
        method: 'GET',
        url: '/',
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('buscarUserPorId', (id) => {
    return cy.api({
        method: 'GET',
        url: `/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('atualizarUser', (id, updatedUser) => {
    return cy.api({
        method: 'PUT',
        url: `/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: updatedUser,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('listarNomes', () => {
    return cy.api({
            method: 'GET',
            url: '/',
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false

        })
})

Cypress.Commands.add('criarUsuario', (users) => {
  return cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: users,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    })
})

Cypress.Commands.add('criarUsuarioTypicode', (users) => {
  return cy.api({
      method: 'POST',
      url: '/',
      body: users,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    })
})

Cypress.Commands.add('excluirUser', (id) => {
    return cy.api({
      method: 'DELETE',
      url: `/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    })
})

Cypress.Commands.add('excluirNotFound', (id) => {
    return cy.api({
        method: 'DELETE',
        url: `https://free.mockerapi.com/${id}`,
        headers: {
            'Content-Type' : 'application/json'
        },
        failOnStatusCode: false
    })
})


Cypress.Commands.add('salvarProcessamentoDaSuite', (casoTeste) => {
    const start = performance.now();

    const end = performance.now()
        const tempo = (end - start).toFixed(2)

        const segundo = tempo/1000;

        cy.log(`⏱️ Tempo total do teste por chamada: ${tempo} ms`)
        cy.log(`⏱️ Tempo total em segundos: ${segundo} segundos`)

        cy.task('obeterUsoDoSistema').then((stats) => {
            cy.log(`🔥 CPU - Percentual médio de uso : ${stats.cpu}%`);
            cy.log(`💾 Memória - Qtde alocada processo Node : ${stats.memory} MB`);

            // ✅ Salvar variaveis
            const resultado = {
                tempoTotal: tempo,
                tempoTotalSengundos: segundo,
                cpu: stats.cpu,
                memoria: stats.memory,
                dataExecucao: new Date().toISOString(),
            };

            cy.task('salvarPerformance', 
                {
                    dados: resultado, 
                    casoDeTeste: casoTeste
                }           
            );
        })
})
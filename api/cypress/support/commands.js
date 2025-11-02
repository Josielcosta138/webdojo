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
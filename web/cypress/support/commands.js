Cypress.Commands.add('start', () => {
    cy.viewport(1440, 900)
    cy.visit('http://localhost:57018')
})

Cypress.Commands.add('submitLoginForm', (email, senha) => {
    cy.get('#email').type(email)
    cy.get('#password').type(senha)

    cy.contains('Button', 'Entrar').click()
})

Cypress.Commands.add('validationTilesAndTitles', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible')
        .click()

    cy.contains('h1', pageTitle)
        .should('be.visible')
})

Cypress.Commands.add('checkedTypeContatact', (tipo) => {
  cy.contains('label', tipo)
    .find('input')  
    .check()
    .should('be.checked')
})
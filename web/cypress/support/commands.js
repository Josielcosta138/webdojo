import { dataAtualFormatada } from '../support/utils.js';

Cypress.Commands.add('login', (ui = false, email, senha) => {

    if(ui) {

        cy.visit('/')

            cy.get('#email').type(email)
            cy.get('#password').type(senha)

            cy.contains('Button', 'Entrar').click()

            //Espera o login finalizar e salvar o token no localStorage
            cy.window().then((win) => {

                const token = win.localStorage.getItem('token')
                cy.log('🔐 Busca pelo token: ' + token)

                cy.task('saveToken', token)
            })

            cy.getCookie('login_date').then((cookie) => {

                if (cookie) {

                    const data = cookie.value
                    cy.log('📅 Data salva: ' + data)

                cy.task('saveDate', data)

                } else {
                    cy.log('⚠️ Cookie login_date não encontrado')
                }
            })

    } else {

        cy.task('readToken').then((token) => {
        cy.log('🔑 Token recuperado: ' + token)

        cy.task('readDate').then((data) => {
        cy.log('📅 Data recuperada: ' + data)

        // Garante que os valores foram lidos
        if (!token || !data) {
            throw new Error(
                '❌ Token ou Data não encontrados. Verifique o arquivo env.json'
            )
        }

        cy.setCookie('login_date', data)

        cy.visit('/dashboard', {
            onBeforeLoad(win) {
            win.localStorage.setItem('token', token)
        },
      })
    })
  })
}
})

Cypress.Commands.add('saveAuthenticationTokenBeforeLogout', (email, senha) => {

    cy.visit('/')

        cy.get('#email').type(email)
        cy.get('#password').type(senha)

        cy.contains('Button', 'Entrar').click()

    
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

Cypress.Commands.add('validatePdf', (pdfPath, expectedText) => {
    cy.task('readPdf', {path: pdfPath}).then((text) => {
        if(Array.isArray(expectedText)) {
            expectedText.forEach(expect => {
                expect(text).to.include(expect);
            });
        }else {
            expect(text).to.include(expectedText);
        }
    })
})
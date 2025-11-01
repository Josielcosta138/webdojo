import { dataAtualFormatada } from '../support/utils.js';

describe('Login Test', () => {

  it.only('CT1 - Deve logar com sucesso.', () => {
    cy.login(true, 'papito@webdojo.com', 'katana123')
    

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

      cy.getCookie('login_date')
        .should('exist')

      cy.getCookie(('login_date')).should((cookie) => {
        expect(cookie.value).to.eq(dataAtualFormatada())
      })

      cy.window().then((win) => {
        const token = win.localStorage.getItem('token')
        expect(token).to.match(/^[a-fA-F0-9]{32}$/)
      })
  })

  it('CT2 - Não Deve logar com sucesso.', () => {
    
    cy.login(true, 'papito@webdojo.com', 'katana1234')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })


  it('CT3 - Não Deve logar emial não cadastrado.', () => {

    cy.login(true, 'papito@webdojo.com', 'katana1234')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
  
})
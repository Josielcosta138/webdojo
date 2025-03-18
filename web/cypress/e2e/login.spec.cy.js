describe('Login Test', () => {
  it('CT1 - Deve logar com sucesso.', () => {
    cy.start()

    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('CT2 - Não Deve logar com sucesso.', () => {
    cy.start()

    cy.submitLoginForm('papito@webdojo.com', 'katana1234')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })


  it('CT3 - Não Deve logar emial não cadastrado.', () => {
    cy.start()

    cy.submitLoginForm('404papito@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
  
})
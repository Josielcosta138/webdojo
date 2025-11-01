import  adress  from '../fixtures/endereceos.json'

describe('CEP Validation', () => {
 
beforeEach(() =>{
    cy.log("▶️ Inicia Login na aplicação")
    
    cy.login()

    cy.contains('h4', 'Integração')
      .click()
  })

  it('should display an error message for invalid CEP', () => {    

      cy.get('#cep').type('88811-700')

      cy.get('.px-6 > span')
        .contains('Buscar')
        .click()

        cy.wait(1000)

        cy.get('#street').should('have.value', `${adress.street}`)

        cy.get('#neighborhood').should('have.value', `${adress.neighborhood}`)

        cy.get('#city').should('have.value', `${adress.city}`)

        cy.get('#state').should('have.value', `${adress.state}`)

  });  
});
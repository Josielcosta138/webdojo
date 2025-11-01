import "cypress-real-events"

describe('Validar hover', () => {

    beforeEach(() => {
    cy.log("▶️ Inicia Login na aplicação")
    cy.login()
})

    it('CT1 - Validar simulação hover', () =>{

        cy.contains('Isso é Mouseover!')
            .should('not.exist')

        cy.get('a[data-cy="instagram-link"]')
            .realHover()
        cy.contains('Isso é Mouseover!')   
            .should('exist') 
    })
})
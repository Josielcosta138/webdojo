import "cypress-real-events"

describe('Validar hover', () => {
    it('CT1 - Validar simulação hover', () =>{
        cy.login()

        cy.contains('Isso é Mouseover!')
            .should('not.exist')

        cy.get('a[data-cy="instagram-link"]')
            .realHover()
        cy.contains('Isso é Mouseover!')   
            .should('exist') 
    })
})
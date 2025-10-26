import "cypress-real-events"

describe('Validar hover', () => {
    it('CT1 - Validar simulação hover', () =>{
        cy.start();

        cy.submitLoginForm('papito@webdojo.com', 'katana123')      

        cy.contains('Isso é Mouseover!')
            .should('not.exist')

        cy.get('a[data-cy="instagram-link"]')
            .realHover()
        cy.contains('Isso é Mouseover!')   
            .should('exist') 
    })
})
describe('Validar link', () => {
    it('CT1 - Validar link e nova aba removendo target', () => {

        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');

        cy.get('a[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')

        cy.contains('h4', 'Formulários')
            .click()

        cy.contains('termos de uso')
            .should('be.visible')
            .invoke('removeAttr', 'target', '_blank')
            .click()

        cy.contains('p', 'Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.') 
            .should('be.visible')
    })
})
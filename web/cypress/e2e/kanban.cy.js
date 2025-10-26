describe('Kanban board', () => {
    it('Deve mover tarefas de To Do para Done', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('Kanban')
            .click()

        const dataTransfer = new DataTransfer()

        cy.contains('div[draggable="true"]', 'Documentar API')
            .trigger('dragstart', { dataTransfer }) //inicio de arraste

        cy.get('.column-done')
            .trigger('drop', { dataTransfer }) //fim de arraste
            .find('h3')
            .should('have.text', 'Done (4)')

        
    })
})
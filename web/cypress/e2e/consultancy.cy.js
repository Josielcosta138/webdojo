describe('Formulário de Consultoria', () => {
  it('CT1 - Deve enviar o formulário de consultoria com sucesso.', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.validationTilesAndTitles('Formulários', 'Consultoria')

    cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')
    cy.get('input[id="email"]').type('teste')
    cy.get('input[placeholder="(00) 00000-0000"]').type('11 91234-5678')
      .should('have.value', '(11) 91234-5678')

    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select('Individual')

    cy.contains('label', 'Pessoa Física')
      .find('input')  
      .click()
      .should('be.checked')

    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('not.be.checked')
    
    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type('12345678909')
      .should('have.value', '123.456.789-09')
    
    const discoveryChannels = [
        'Instagram', 
        'LinkedIn', 
        'Udemy', 
        'YouTube', 
        'Indicação de Amigo'
    ]

      discoveryChannels.forEach(channel => {
        cy.checkedTypeContatact(channel)
      });

    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/1.pdf', { force: true })  


  })
})
  



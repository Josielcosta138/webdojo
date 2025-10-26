describe('Formulário de Consultoria', () => {
  it.only('CT1 - Deve enviar o formulário de consultoria com sucesso.', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.validationTilesAndTitles('Formulários', 'Consultoria')

    cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')
    cy.get('input[id="email"]').type('josiel@teste.com.br')
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

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      .should('be.visible')
      .type('um et Malorum" (The  ethics, very popular during the Renaissance. Tholone in section 1.10.32')
    
    const listaTecnologias = ['React.js', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Docker']
  
      listaTecnologias.forEach(object => {
        cy.log(`🔎 - Tecnologias =>  ${object}`)
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')  
          .should('be.visible')        
          .type(object)
          .type('{enter}')
      })
      
    listaTecnologias.forEach(object => {
      cy.contains('label', 'Tecnologias')
      .parent()
      .contains('span', object)
      .should('be.visible')
    })

    cy.contains('label', 'Li e aceito os termos de uso')
      .find('input[type="checkbox"]')
      .should('be.visible')
      .check()
      .should('be.checked')

    cy.contains('button', 'Enviar formulário')
      .should('be.visible')
      .click()

    // ⚠️ - PONTO DE ATENCÃO A PERFOMANCE (VALIDAR COM VÁRIOS USUARIOs)
    cy.get('.modal', {timeout:10000})
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

  })

  it('CT2 - Validar formulário inválido.', () =>{
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.validationTilesAndTitles('Formulários', 'Consultoria')

    cy.contains('button', 'Enviar formulário')
      .should('be.visible')
      .click()

    //label[text()="Nome Completo *"]//..//p

    cy.contains('label', 'Nome Completo *')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

  })

})
  



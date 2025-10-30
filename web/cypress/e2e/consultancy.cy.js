import {personal, company} from "../fixtures/consultancyForm.json"

describe('Formulário de Consultoria', () => {


  Cypress.Commands.add('fillConsutancyForms', () => {
    
  })


  beforeEach(() =>{
    cy.log("▶️ Inicia Login na aplicação")
    
    cy.login()
  })

  it('CT1 - Deve enviar o formulário de consultoria com sucesso.', () => {
    
    cy.validationTilesAndTitles('Formulários', 'Consultoria')

    cy.get('input[placeholder="Digite seu nome completo"]').type(personal.name)
    cy.get('input[id="email"]').type(personal.email)
    cy.get('input[placeholder="(00) 00000-0000"]').type(personal.phone)
      .should('have.value', '(11) 99999-1000')

    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(personal.consultancyType)

    if(personal.personType === 'cpf') {
      cy.contains('label', 'Pessoa Física')
        .find('input')  
        .click()
        .should('be.checked')

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked')
    }  
    
    if(personal.personType === 'cnpj') {
      cy.contains('label', 'Pessoa Jurídica')
        .find('input')  
        .click()
        .should('be.checked')

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('not.be.checked')
    } 


    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type(personal.document)
      .should('have.value', '123.456.789-09')
    
      personal.discoveryChannel.forEach(channel => {
        cy.checkedTypeContatact(channel)
      });

    cy.get('input[type="file"]')
      .selectFile(personal.file, { force: true })  
      
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
      .should('be.visible')
      .type(personal.description)
  
      personal.techs.forEach(object => {
        cy.log(`🔎 - Tecnologias =>  ${object}`)
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')  
          .should('be.visible')        
          .type(object)
          .type('{enter}')
      })
      
    personal.techs.forEach(object => {
      cy.contains('label', 'Tecnologias')
      .parent()
      .contains('span', object)
      .should('be.visible')
    })

    if(personal.terms === true){
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
    }

    cy.contains('button', 'Enviar formulário')
      .click()

    // ⚠️ - PONTO DE ATENCÃO A PERFOMANCE (VALIDAR COM VÁRIOS USUARIOs)
    cy.get('.modal', {timeout:10000})
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

  })

  it('CT2 - Validar formulário inválido.', () =>{

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

  it('CT3 - Testar apenas beforeach.', () => {
    cy.log(" --->>  Testando beforeEach")
  })

  afterEach(() => {
    cy.log("✅- Finalizado Caso de teste na aplicação .")
  })

})
  



import {faker} from '@faker-js/faker'
import _ from 'lodash'

describe('Texte notificação', () => {

    it('Validar busca de componente da notificação', () => {

        cy.visit('/')
        
        cy.get('#email').type('papito@webdojo.com')
        
        cy.get('#password').type('katana1233')

        cy.contains('Button', 'Entrar').click()

        cy.wait(2500)

        // cy.document().then((doc) => {
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        // })
        
        cy.contains('Acesso negado! Tente novamente.')
            .should('be.visible')

        cy.wait(5000)

        cy.contains('Acesso negado! Tente novamente.')
            .should('not.exist')
    })

    it('Validar tecla Tab - Cy.press()', () => {
        cy.visit('/')

        cy.get('form[class="space-y-4"]')
            .press('Tab')
        cy.focused()
            .should('have.attr', 'id', 'email')

        cy.get('input[id="email"]')
            .press('Tab')
        cy.focused()
            .should('have.attr', 'id', 'password')
    });

    it('Validar simular botão Enter', () => {
        cy.visit('/')

        cy.get('#email').type('papito@webdojo.com')
        
        cy.get('#password').type('katana1233{enter}')        
    });

    it.only('Execução: Teste de carga - API Gerar Boletos (100 requisições)', () =>{
        
         const nome = faker.person.fullName()
         const email = faker.internet.email()
         const password = gerarSenha()

        cy.validarTesteEmMassaDeDados(nome, email, password)
        cy.validarTesteEmMassaDeDados(nome, email, password)
    })
})

function gerarSenha(tamanho = 8) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let senha = '';
  
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[indice];
  }
  
  return senha;
}

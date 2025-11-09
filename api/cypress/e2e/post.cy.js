import 'cypress-plugin-api';
import { faker } from '@faker-js/faker';
const fs = require('fs');
import _ from 'lodash'


faker.locale = 'pt_BR';



const userInvalid = {
      email: faker.internet.email(),
      password: faker.internet.password()
}

const userJSOnInvalid = `{
      name: 'josiel',
      email: 'josiel@gmail.com'
      password: '123456'
}`


describe('POST /api/users/register', () => {
  
  _.times(10, (i) => {
      it.only( `CT1 - Deve cadastrar um novo usuario. N° ${i+1}` , () => {

        const user = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password()
       }

      cy.criarUsuario(user).then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body).to.have.property('success', true)
          expect(response.body).to.have.property('message', 'Usuário cadastrado verificado pela - Automação')
          expect(response.body.user).to.have.property('name', user.name)
          expect(response.body.user).to.have.property('email', user.email)
          expect(response.body.user).to.have.property('id')
        
        cy.salvarProcessamentoDaSuite(`CT1 - Deve cadastrar um novo usuario. N`)
        })      
    })  
  })


  it('CT2 - Deve cadastrar usuário inválido.', () => {
  
    cy.criarUsuario(userInvalid).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('success', false)
        expect(response.body).to.have.property('message', 'Nome é obrigatório.')
    })
  })
  
  it('CT3 - Deve validar tipo do JSON.', () => {
  
    cy.criarUsuario(userJSOnInvalid).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('success', false)
        expect(response.body).to.have.property('error', 'JSON inválido.')
    })
  })
  

})



import 'cypress-plugin-api';
import { faker } from '@faker-js/faker';

describe('PUT /api/users/:id', () => {

    context('Campos obrigatórios', () => {
        it('CT3 - Deve atualizar o usuário e validar a resposta', () => {

            const userInvalid = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };

                cy.atualizarUser(45, userInvalid)
                    .then((response) => {
                        expect(response.status).to.eq(500)
                        // expect(response.body).to.have.property('success', false)
                        // expect(response.body).to.have.property('message', 'Nome é obrigatório.')
                })
            });
        });


    context('Atualização com dados válidos', () => {
        it('CT4 - Deve atualizar o usuário com dados válidos', () => {

            const updatedUser = {
                name: "Ervin UPDATED",
                username: "AntonettUPDATED",
                email: "Ervin@UPDATED.com"
            };

            cy.buscarUserPorId(2)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.deep.include({ id: 2 });

                    const idUserGlobal = response.body.id;

            cy.atualizarUser(idUserGlobal, updatedUser)
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.deep.include(updatedUser);
                    expect(response.body.id).to.eq(idUserGlobal);
                    expect(response.body).to.have.property('id', idUserGlobal);
                    expect(response.body).to.have.property('name', updatedUser.name);
                    expect(response.body).to.have.property('username', updatedUser.username);
                    expect(response.body).to.have.property('email', updatedUser.email);
                }); 
            });
        });
    });
});
    

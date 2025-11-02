import {userCreated} from '../fixtures/user.json';

let idUserGlobal;

describe('DELETE /api/users/:id', () => {
 
    context('Excluir com sucesso', () => {
        it('CT1 - Deve excluir o usuário com sucessos', () => {
            
            cy.criarUsuarioTypicode(userCreated)
                .then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.deep.include({
                        name: userCreated.name,
                        username: userCreated.username,
                        email: userCreated.email
                    });

                    idUserGlobal = response.body.id;

            cy.excluirUser(idUserGlobal)
                .then((response) => {
                    expect(response.status).to.eq(200);
                }); 
            });
        });

        after(() => {
            cy.listarNomes()
                .then(response => {
                   const usuario = response.body.find(user => user.id === idUserGlobal)
                   expect(usuario).to.be.undefined
            })
        })
    });

    context('Excluir Not found (404)', () => {  
        it('Deve exibir erro Not found de users não encontrado.', () => {
            cy.excluirNotFound(404)
            .then(response => {
                expect(response.body.status).to.eql(404)
            })
        })
        
    })  

});

//VALIDAR EM OUTR
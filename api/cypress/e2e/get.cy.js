import 'cypress-plugin-api';

describe('GET /api/users', () => {
    it('CT1 - Deve retornar a lista de usuários', () => {
        cy.getUsersList().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);

            // Verifica um usuário específico (usando deep.equal)
            expect(response.body[0]).to.deep.include({
                id: 1,
                name: "Leanne Graham",
                username: "Bret",
                email: "Sincere@april.biz"
            })

             // Pode validar campos aninhados também
            expect(response.body[0].address).to.deep.include({
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                }
            })

            expect(response.body[0]).to.deep.include({
                phone: "1-770-736-8031 x56442",
                website: "hildegard.org",
                company: {
                    name: "Romaguera-Crona",
                    catchPhrase: "Multi-layered client-server neural-net",
                    bs: "harness real-time e-markets"
                }
            })

        })
    })
})


describe('GET /api/users by id', () => {
    it('CT2 - Deve retornar a lista de usuários validando por nome', () => {
        cy.listarNomes().then((response) => {
            expect(response.status).to.eq(200);

            const user = response.body.find(user => user.id === 2);

            cy.log(`🙍 Usuário encontrado: ${JSON.stringify(user)}`);

            expect(user).to.exist;

            expect(user).to.deep.include({
                id: 2,
                name: "Ervin Howell",
                username: "Antonette",
                email: "Shanna@melissa.tv"
            })
        })
    })
})


describe('PUT /api/users/:id', () => {
    it('CT3 - Deve atualizar o usuário e validar a resposta', () => {
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


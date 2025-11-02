import 'cypress-plugin-api';

describe('GET /api/users', () => {
    it('CT1 - Deve retornar a lista de usuários', () => {
        cy.api({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
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
    it.only('CT2 - Deve retornar a lista de usuários validando por nome', () => {
        cy.api({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false

        }).then((response) => {
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
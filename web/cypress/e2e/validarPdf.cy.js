
describe('Validar PDF.', () => {

    it('CT1 - Teste Login sem SKIP.', () => {
        cy.login()
    })

    it.skip('CT2 - Teste com erro no pdf Com SKIP', () => {

        cy.submitLoginForm('papito@webdojo.com', 'katana123');

        const pdfPath = '.cypress/fixtures/RelatorioItensPorCliente.pdf';

        cy.task('pdfPath', {path: pdfPath}).then((text) => {
            expect(text).to.include('Relatório Itens por Cliente');
            expect(text).to.include('Smartphones');
            expect(text).to.include('55,000');
        })
    })
})
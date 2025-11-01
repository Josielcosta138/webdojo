describe('Reproduzir video.', () => {
    it('Deve permitir reproduzir video exemplo.', () => {
        
        cy.login();

        cy.contains('button', 'Video')
            .click()

        getIframeBody()
            .find('.play-button', {timeout:10000})
            .click()

        getIframeBody()
            .find('.pause-button', {timeout:10000})
            .click()
    })  
})

function getIframeBody() {
  return cy
    .get('iframe[src="/player"]')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
}
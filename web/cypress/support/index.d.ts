/// <reference types="cypress" />

//🔃 Custom Commands 
declare namespace Cypress {
  interface Chainable {
    
    start(): Chainable<void>,
    submitLoginForm(email, senha): Chainable<void>,
    validationTilesAndTitles(): Chainable<void>,
    validatePdf(pdfPath, expectedText): Chainable<void>,
    readPdfFile(path): Chainable<void>,
    login(): Chainable<void>,
  }
}

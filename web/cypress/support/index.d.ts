/// <reference types="cypress" />

//🔃 Custom Commands 
declare namespace Cypress {
  interface Chainable {
    
    submitLoginForm(email, senha): Chainable<void>,
    validationTilesAndTitles(): Chainable<void>,
    validatePdf(pdfPath, expectedText): Chainable<void>,
    readPdfFile(path): Chainable<void>,
    login(value:boolean, email:string, senha:string): Chainable<void>,
    getUsersList(): Chainable<void>,
    validarTesteEmMassaDeDados(nome:string, email:string, password:string):Chainable<void>
  }
}

/// <reference types="cypress" />

//🔃 Custom Commands 
declare namespace Cypress {
  interface Chainable {
    
    submitLoginForm(email, senha): Chainable<void>,
    validationTilesAndTitles(): Chainable<void>,
    validatePdf(pdfPath, expectedText): Chainable<void>,
    readPdfFile(path): Chainable<void>,
    login(): Chainable<void>,
    getUsersList(): Chainable<void>,
    listarNomes(): Chainable<void>,
    buscarUserPorId(id: number): Chainable<void>,
    atualizarUser(id: number, updatedUser: object): Chainable<void>,
    criarUsuario(user: object): Chainable<void>
    criarUsuarioTypicode(user:object): Chainable<void>
    excluirUser(id:number):Chainable<void>
    excluirNotFound(id: number): Chainable<void>
  }
}

/// <reference types="cypress" />

//🔃 Custom Commands 
declare namespace Cypress {
  interface Chainable {
    
    start(): Chainable<void>,
    submitLoginForm(email, senha): Chainable<void>,
    validationTilesAndTitles(): Chainable<void>,

  }
}

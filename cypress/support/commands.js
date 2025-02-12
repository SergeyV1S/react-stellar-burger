/* eslint-disable cypress/no-assigning-return-values */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("prepareWithGetUser", () => {
  cy.visit("/");
  window.localStorage.setItem("access-token", "test-access-token");
  cy.intercept("GET", "ingredients", { fixture: "ingedients" }).as("getIngredients");
  cy.intercept("GET", "api/auth/user", { fixture: "user" }).as("getUser");
  cy.intercept("POST", "orders", { fixture: "order" });
  cy.intercept("POST", "auth/token", { fixture: "order" });

  cy.url().should("include", "/");

  cy.wait("@getIngredients");
  cy.wait("@getUser");
});

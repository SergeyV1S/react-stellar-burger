/* eslint-disable jest/expect-expect */
describe("modal tests", () => {
  beforeEach(() => {
    cy.prepareWithGetUser();
  });

  it("open ingrdient modal", () => {
    cy.get("[data-testid=burger_item_link]:first").should("be.visible").click();

    cy.get("[data-testid=ingredient_details] h1").should("exist").should("have.text", "Детали ингредиента");
  });

  it("check ingrdient data in the modal", () => {
    cy.get("[data-testid=burger_item_link]:first").click();

    cy.get("[data-testid=ingredient_details_name]").should("exist").should("have.text", "Краторная булка N-200i");
    cy.get("[data-testid=ingredient_details_calories]").should("exist").should("have.text", "420");
    cy.get("[data-testid=ingredient_details_proteins]").should("exist").should("have.text", "80");
    cy.get("[data-testid=ingredient_details_fat]").should("exist").should("have.text", "24");
    cy.get("[data-testid=ingredient_details_carbohydrates]").should("exist").should("have.text", "53");
  });
});

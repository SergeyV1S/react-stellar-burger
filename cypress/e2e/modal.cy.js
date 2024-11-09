/* eslint-disable jest/expect-expect */
describe("close modal test", () => {
  beforeEach(() => {
    cy.initIngredients();
  });

  it("close modal when click cross", () => {
    cy.get("[data-testid=burger_item_link]").click();

    cy.get("[data-testid=modal_container]").should("exist");
    cy.get("[data-testid=modal_container] button").should("exist").click();

    cy.get("[data-testid=ingredient_details]").should("not.exist");
  });

  it("close modal when click modal overlay", () => {
    cy.get("[data-testid=burger_item_link]").click();

    cy.get("[data-testid=modal_overlay]").should("exist").click({ force: true });

    cy.get("[data-testid=ingredient_details]").should("not.exist");
  });

  it("close modal when press esc", () => {
    cy.get("[data-testid=burger_item_link]").click();

    cy.get("[data-testid=modal_container]").should("exist");
    cy.get("body").type("{esc}");

    cy.get("[data-testid=ingredient_details]").should("not.exist");
  });
});

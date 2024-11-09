/* eslint-disable cypress/no-assigning-return-values */
/* eslint-disable jest/expect-expect */
describe("move ingredient to constructor", () => {
  beforeEach(() => {
    cy.prepareWithGetUser();
  });

  it("move bun", () => {
    cy.get("[data-testid=burger_item_link]:first").trigger("dragstart");
    const dragContainer = cy.get("[data-testid=up_bun_constructor_item]");

    dragContainer.trigger("drop");
    dragContainer.should("have.text", "Краторная булка N-200i (верх)1255");
    cy.get("[data-testid=down_bun_constructor_item]").should("have.text", "Краторная булка N-200i (низ)1255");
  });

  it("move ingredients", () => {
    const dragContainer = cy.get("[data-testid=igredient_constructor_item]");

    [1, 2].forEach((index) => {
      cy.get("[data-testid=burger_item_link]").eq(index).trigger("dragstart");
      dragContainer.trigger("drop");
    });

    cy.get("[data-testid=igredient_constructor_item]")
      .children()
      .eq(0)
      .should("contain.text", "Биокотлета из марсианской Магнолии424");
    cy.get("[data-testid=igredient_constructor_item]")
      .children()
      .eq(1)
      .should("contain.text", "Филе Люминесцентного тетраодонтимформа988");
  });

  it("move similar ingredients", () => {
    const dragContainer = cy.get("[data-testid=igredient_constructor_item]");

    [1, 1].forEach((index) => {
      cy.get("[data-testid=burger_item_link]").eq(index).trigger("dragstart");
      dragContainer.trigger("drop");
    });

    dragContainer.children().each(($el) => {
      cy.wrap($el).should("contain.text", "Биокотлета из марсианской Магнолии424");
    });
  });
});

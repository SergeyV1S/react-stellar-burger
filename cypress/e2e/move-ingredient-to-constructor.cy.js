/* eslint-disable cypress/no-assigning-return-values */

/* eslint-disable jest/expect-expect */
import {
  BURGER_ITEM_LINK,
  DOWN_BUN_CONSTRUCTOR_ITEM,
  INGREDIENT_CONSTRUCTOR_ITEM,
  UP_BUN_CONSTRUCTOR_ITEM
} from "../selectors.constant";

describe("move ingredient to constructor", () => {
  beforeEach(() => {
    cy.prepareWithGetUser();
  });

  it("move bun", () => {
    cy.get(`${BURGER_ITEM_LINK}:first`).trigger("dragstart");
    const dragContainer = cy.get(UP_BUN_CONSTRUCTOR_ITEM);

    dragContainer.trigger("drop");
    dragContainer.should("have.text", "Краторная булка N-200i (верх)1255");
    cy.get(DOWN_BUN_CONSTRUCTOR_ITEM).should("have.text", "Краторная булка N-200i (низ)1255");
  });

  it("move ingredients", () => {
    const dragContainer = cy.get(INGREDIENT_CONSTRUCTOR_ITEM);

    [1, 2].forEach((index) => {
      cy.get(BURGER_ITEM_LINK).eq(index).trigger("dragstart");
      dragContainer.trigger("drop");
    });

    cy.get(INGREDIENT_CONSTRUCTOR_ITEM)
      .children()
      .eq(0)
      .should("contain.text", "Биокотлета из марсианской Магнолии424");
    cy.get(INGREDIENT_CONSTRUCTOR_ITEM)
      .children()
      .eq(1)
      .should("contain.text", "Филе Люминесцентного тетраодонтимформа988");
  });

  it("move similar ingredients", () => {
    const dragContainer = cy.get(INGREDIENT_CONSTRUCTOR_ITEM);

    [1, 1].forEach((index) => {
      cy.get(BURGER_ITEM_LINK).eq(index).trigger("dragstart");
      dragContainer.trigger("drop");
    });

    dragContainer.children().each(($el) => {
      cy.wrap($el).should("contain.text", "Биокотлета из марсианской Магнолии424");
    });
  });
});

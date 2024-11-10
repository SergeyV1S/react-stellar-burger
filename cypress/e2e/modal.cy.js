/* eslint-disable jest/expect-expect */
import { BURGER_ITEM_LINK, INGREDIENT_DETAILS, MODAL_CONTAINER, MODAL_OVERLAY } from "../selectors.constant";

describe("close modal test", () => {
  beforeEach(() => {
    cy.prepareWithGetUser();
  });

  it("close modal when click cross", () => {
    cy.get(`${BURGER_ITEM_LINK}:first`).click();

    cy.get(MODAL_CONTAINER).should("exist");
    cy.get(`${MODAL_CONTAINER} button`).should("exist").click();

    cy.get(INGREDIENT_DETAILS).should("not.exist");
  });

  it("close modal when click modal overlay", () => {
    cy.get(`${BURGER_ITEM_LINK}:first`).click();

    cy.get(MODAL_OVERLAY).should("exist").click({ force: true });

    cy.get(INGREDIENT_DETAILS).should("not.exist");
  });

  it("close modal when press esc", () => {
    cy.get(`${BURGER_ITEM_LINK}:first`).click();

    cy.get(MODAL_CONTAINER).should("exist");
    cy.get("body").type("{esc}");

    cy.get(INGREDIENT_DETAILS).should("not.exist");
  });
});

/* eslint-disable cypress/no-assigning-return-values */

/* eslint-disable jest/expect-expect */
import { BURGER_ITEM_LINK, CREATE_ORDER_BUTTON, UP_BUN_CONSTRUCTOR_ITEM } from "../selectors.constant";

describe("order modal test", () => {
  beforeEach(() => {
    cy.prepareWithGetUser();
  });

  it("open order modal with order data", () => {
    cy.get(CREATE_ORDER_BUTTON).should("exist").and("be.disabled");
    // Перетаскиваем булку
    cy.get(`${BURGER_ITEM_LINK}:first`).trigger("dragstart");
    cy.get(UP_BUN_CONSTRUCTOR_ITEM).trigger("drop");

    // Перетаскиваем ингредиент
    cy.get(BURGER_ITEM_LINK).eq(1).trigger("dragstart");
    cy.get(UP_BUN_CONSTRUCTOR_ITEM).trigger("drop");

    // Делаем заказ
    cy.get(CREATE_ORDER_BUTTON).should("not.be.disabled");
    cy.get(CREATE_ORDER_BUTTON).click();

    // Прверка модалки с данными
    cy.get("[data-testid=order_modal]").should("exist");
    cy.get("[data-testid=order_modal_number]").should("have.text", "58982");
  });
});

/* eslint-disable cypress/no-assigning-return-values */
/* eslint-disable jest/expect-expect */
describe("order modal test", () => {
  beforeEach(() => {
    cy.prepareWithGetUser();
  });

  it("open order modal with order data", () => {
    const dragContainer = cy.get("[data-testid=up_bun_constructor_item]");
    cy.get("[data-testid=create_order_button]").should("be.disabled");
    // Перетаскиваем булку
    cy.get("[data-testid=burger_item_link]:first").trigger("dragstart");
    dragContainer.trigger("drop");

    // Перетаскиваем ингредиент
    cy.get("[data-testid=burger_item_link]").eq(1).trigger("dragstart");
    dragContainer.trigger("drop");

    // Делаем заказ
    cy.get("[data-testid=create_order_button]").should("not.be.disabled");
    cy.get("[data-testid=create_order_button]").click();

    // Прверка модалки с данными
    cy.get("[data-testid=order_modal]").should("exist");
    cy.get("[data-testid=order_modal_number]").should("have.text", "58982");
  });
});

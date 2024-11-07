import type { IFeedOrderData, IOrder } from "@interfaces/order";
import { EOrderStatus } from "@interfaces/order";

import { createOrderAction, getCurrentOrderAction } from "./action";
import { initialState, orderSlice, toggleOrderModal } from "./reducer";

const feedOrder: IFeedOrderData = {
  ingredients: ["ffdfad", "afafa"],
  _id: "wfwdwfd",
  status: EOrderStatus.created,
  name: "string",
  number: 2342,
  createdAt: "243143",
  updatedAt: "144323"
};

const testOrder: IOrder = {
  name: "order",
  order: feedOrder
};

describe("order slice", () => {
  it("inital state correctly", () => {
    const result = orderSlice.reducer(undefined, { type: "" });

    expect(result).toEqual(initialState);
  });

  it("open order modal", () => {
    const action = { type: toggleOrderModal.type, payload: { isOpen: true } };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, isOrderModalOpen: true });
  });

  it("close order modal", () => {
    const action = { type: toggleOrderModal.type, payload: { isOpen: false } };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, isOrderModalOpen: false });
  });

  it("create order fulfilled", () => {
    const action = { type: createOrderAction.fulfilled.type, payload: testOrder };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, order: testOrder });
  });

  it("create order rejected", () => {
    const action = { type: createOrderAction.rejected.type, error: { message: "Error" } };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("create order pending", () => {
    const action = { type: createOrderAction.pending.type };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, isLoading: true, isOrderModalOpen: true });
  });

  it("get order by number fulfilled", () => {
    const action = { type: getCurrentOrderAction.fulfilled.type, payload: [feedOrder] };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, currentOrder: feedOrder });
  });

  it("get order by number rejected", () => {
    const action = { type: getCurrentOrderAction.rejected.type, error: { message: "Error" } };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("get order by number pending", () => {
    const action = { type: getCurrentOrderAction.pending.type };

    const result = orderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, isLoading: true });
  });
});

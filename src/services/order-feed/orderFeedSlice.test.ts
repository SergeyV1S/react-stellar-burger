import { EOrderStatus } from "@interfaces/order";

import {
  initialState,
  orderFeedSlice,
  wsFeedClose,
  wsFeedConnecting,
  wsFeedError,
  wsFeedMessage,
  wsFeedOpen
} from "./reducer";
import type { IFeedRibbonDataResponse } from "./types";
import { EWsStatuses } from "./types";

const testRibbonData: IFeedRibbonDataResponse = {
  success: true,
  orders: [
    {
      ingredients: ["ffdfad", "afafa"],
      _id: "wfwdwfd",
      status: EOrderStatus.created,
      name: "string",
      number: 2342,
      createdAt: "243143",
      updatedAt: "144323"
    }
  ],
  total: 59321,
  totalToday: 109
};

describe("order-feed slice", () => {
  it("inital state correctly", () => {
    const result = orderFeedSlice.reducer(undefined, { type: "" });

    expect(result).toEqual(initialState);
  });

  it("ws connection open", () => {
    const result = orderFeedSlice.reducer(initialState, { type: wsFeedOpen.type });

    expect(result).toEqual({ ...initialState, wsStatus: EWsStatuses.OPEN });
  });

  it("ws connection close", () => {
    const result = orderFeedSlice.reducer(initialState, { type: wsFeedClose.type });

    expect(result).toEqual({ ...initialState, wsStatus: EWsStatuses.CLOSED });
  });

  it("ws connection connecting", () => {
    const result = orderFeedSlice.reducer(initialState, { type: wsFeedConnecting.type });

    expect(result).toEqual({ ...initialState, wsStatus: EWsStatuses.CONNECTING });
  });

  it("ws error", () => {
    const action = { type: wsFeedError.type, payload: "Error" };
    const result = orderFeedSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.payload });
  });

  it("ws message", () => {
    const action = { type: wsFeedMessage.type, payload: testRibbonData };
    const result = orderFeedSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, ribbonData: testRibbonData });
  });
});

import { EOrderStatus } from "@interfaces/order";

import { EWsStatuses, type IFeedRibbonDataResponse } from "../order-feed";
import {
  initialState,
  profileOrderSlice,
  wsProfileOrderClose,
  wsProfileOrderConnecting,
  wsProfileOrderError,
  wsProfileOrderMessage,
  wsProfileOrderOpen
} from "./reducer";

const testProfileOrderData: IFeedRibbonDataResponse = {
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
    const result = profileOrderSlice.reducer(undefined, { type: "" });

    expect(result).toEqual(initialState);
  });

  it("ws profile connection open", () => {
    const result = profileOrderSlice.reducer(initialState, { type: wsProfileOrderOpen.type });

    expect(result).toEqual({ ...initialState, profileRibbonWsStatus: EWsStatuses.OPEN });
  });

  it("ws profile connection close", () => {
    const result = profileOrderSlice.reducer(initialState, { type: wsProfileOrderClose.type });

    expect(result).toEqual({ ...initialState, profileRibbonWsStatus: EWsStatuses.CLOSED });
  });

  it("ws profile connection connecting", () => {
    const result = profileOrderSlice.reducer(initialState, { type: wsProfileOrderConnecting.type });

    expect(result).toEqual({ ...initialState, profileRibbonWsStatus: EWsStatuses.CONNECTING });
  });

  it("ws profile error", () => {
    const action = { type: wsProfileOrderError.type, payload: "Error" };
    const result = profileOrderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.payload });
  });

  it("ws profile message", () => {
    const action = { type: wsProfileOrderMessage.type, payload: testProfileOrderData };
    const result = profileOrderSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, profileRibbonData: testProfileOrderData });
  });
});

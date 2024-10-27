import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { EWsStatuses, type IInitialState, type IRibbonDataResponse } from "./types";

const initialState: IInitialState = {
  ribbonData: null,
  error: null,
  wsStatus: EWsStatuses.CLOSED
};

export const orderFeedSlice = createSlice({
  name: "orderFeedSlice",
  initialState,
  reducers: {
    wsOpen: (state) => {
      state.wsStatus = EWsStatuses.OPEN;
    },
    wsClose: (state) => {
      state.wsStatus = EWsStatuses.CLOSED;
    },
    wsConnecting: (state) => {
      state.wsStatus = EWsStatuses.CONNECTING;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<IRibbonDataResponse>) => {
      state.ribbonData = action.payload;
      state.error = null;
    }
  },
  selectors: {
    getRibbonOrders: (state) => state.ribbonData,
    getOrderWsStatus: (state) => state.wsStatus,
    getOrderWsError: (state) => state.error
  }
});

export const { wsClose, wsError, wsMessage, wsOpen, wsConnecting } = orderFeedSlice.actions;
export const { getOrderWsError, getOrderWsStatus, getRibbonOrders } = orderFeedSlice.selectors;

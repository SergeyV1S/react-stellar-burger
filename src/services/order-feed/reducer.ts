import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { IFeedRibbonDataResponse, IInitialState } from "./types";
import { EWsStatuses } from "./types";

const initialState: IInitialState = {
  ribbonData: null,
  error: null,
  wsStatus: EWsStatuses.CLOSED
};

export const orderFeedSlice = createSlice({
  name: "orderFeedSlice",
  initialState,
  reducers: {
    wsFeedOpen: (state) => {
      state.wsStatus = EWsStatuses.OPEN;
    },
    wsFeedClose: (state) => {
      state.wsStatus = EWsStatuses.CLOSED;
    },
    wsFeedConnecting: (state) => {
      state.wsStatus = EWsStatuses.CONNECTING;
    },
    wsFeedError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsFeedMessage: (state, action: PayloadAction<IFeedRibbonDataResponse>) => {
      state.ribbonData = action.payload;
      state.error = null;
    }
  },
  selectors: {
    getFeedRibbonOrders: (state) => state.ribbonData,
    getFeedOrderWsStatus: (state) => state.wsStatus,
    getFeedOrderWsError: (state) => state.error
  }
});

export const { wsFeedClose, wsFeedError, wsFeedMessage, wsFeedOpen, wsFeedConnecting } = orderFeedSlice.actions;
export const { getFeedOrderWsError, getFeedOrderWsStatus, getFeedRibbonOrders } = orderFeedSlice.selectors;

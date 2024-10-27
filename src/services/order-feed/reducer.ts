import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { IFeedRibbonDataResponse, IInitialState } from "./types";
import { EWsFeedStatuses } from "./types";

const initialState: IInitialState = {
  ribbonData: null,
  error: null,
  wsStatus: EWsFeedStatuses.CLOSED
};

export const orderFeedSlice = createSlice({
  name: "orderFeedSlice",
  initialState,
  reducers: {
    wsFeedOpen: (state) => {
      state.wsStatus = EWsFeedStatuses.OPEN;
    },
    wsFeedClose: (state) => {
      state.wsStatus = EWsFeedStatuses.CLOSED;
    },
    wsFeedConnecting: (state) => {
      state.wsStatus = EWsFeedStatuses.CONNECTING;
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

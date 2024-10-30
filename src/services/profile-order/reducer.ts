import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { IFeedRibbonDataResponse } from "../order-feed";
import { EWsStatuses } from "../order-feed";
import type { IProfileRibbonInitialState } from "./types";

const initialState: IProfileRibbonInitialState = {
  profileRibbonData: null,
  error: null,
  profileRibbonWsStatus: EWsStatuses.CLOSED
};

export const profileOrderSlice = createSlice({
  name: "profileOrderSlice",
  initialState,
  reducers: {
    wsProfileOrderOpen: (state) => {
      state.profileRibbonWsStatus = EWsStatuses.OPEN;
    },
    wsProfileOrderClose: (state) => {
      state.profileRibbonWsStatus = EWsStatuses.CLOSED;
    },
    wsProfileOrderConnecting: (state) => {
      state.profileRibbonWsStatus = EWsStatuses.CONNECTING;
    },
    wsProfileOrderError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsProfileOrderMessage: (state, action: PayloadAction<IFeedRibbonDataResponse>) => {
      state.profileRibbonData = action.payload;
      state.error = null;
    }
  },
  selectors: {
    getProfileRibbonOrders: (state) => state.profileRibbonData,
    getProfileOrderWsStatus: (state) => state.profileRibbonWsStatus,
    getProfileOrderWsError: (state) => state.error
  }
});

export const {
  wsProfileOrderClose,
  wsProfileOrderError,
  wsProfileOrderMessage,
  wsProfileOrderOpen,
  wsProfileOrderConnecting
} = profileOrderSlice.actions;
export const { getProfileRibbonOrders, getProfileOrderWsStatus, getProfileOrderWsError } = profileOrderSlice.selectors;

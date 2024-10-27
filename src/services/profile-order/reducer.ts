import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { IProfileRibbonInitialState, IRibbonProfileOrderDataResponse } from "./types";
import { EProfileOrderWsStatuses } from "./types";

const initialState: IProfileRibbonInitialState = {
  profileRibbonData: null,
  error: null,
  profileRibbonWsStatus: EProfileOrderWsStatuses.CLOSED
};

export const profileOrderSlice = createSlice({
  name: "profileOrderSlice",
  initialState,
  reducers: {
    wsProfileOrderOpen: (state) => {
      state.profileRibbonWsStatus = EProfileOrderWsStatuses.OPEN;
    },
    wsProfileOrderClose: (state) => {
      state.profileRibbonWsStatus = EProfileOrderWsStatuses.CLOSED;
    },
    wsProfileOrderConnecting: (state) => {
      state.profileRibbonWsStatus = EProfileOrderWsStatuses.CONNECTING;
    },
    wsProfileOrderError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsProfileOrderMessage: (state, action: PayloadAction<IRibbonProfileOrderDataResponse>) => {
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

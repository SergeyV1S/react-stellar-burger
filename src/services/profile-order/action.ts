import { createAction } from "@reduxjs/toolkit";

export const wsProfileOrderConnectAction = createAction<string, "WS_PROFILE_ORDER_CONNEСT_ACTION">(
  "WS_PROFILE_ORDER_CONNEСT_ACTION"
);

export const wsProfileOrderDisconnectAction = createAction("WS_PROFILE_ORDER_DISCONNECT_ACTION");

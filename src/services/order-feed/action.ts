import { createAction } from "@reduxjs/toolkit";

export const wsConnectAction = createAction<string, "WS_CONNEСT_ACTION">("WS_CONNEСT_ACTION");

export const wsDisconnectAction = createAction("WS_DISCONNECT_ACTION");

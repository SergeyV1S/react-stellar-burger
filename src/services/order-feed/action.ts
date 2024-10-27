import { createAction } from "@reduxjs/toolkit";

export const wsOrderFeedConnectAction = createAction<string, "WS_ORDER_FEED_CONNEСT_ACTION">(
  "WS_ORDER_FEED_CONNEСT_ACTION"
);

export const wsOrderFeedDisconnectAction = createAction("WS_ORDER_FEED_DISCONNECT_ACTION");

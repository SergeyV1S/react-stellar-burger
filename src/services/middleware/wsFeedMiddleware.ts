import type { Middleware } from "@reduxjs/toolkit";

import type { IFeedRibbonDataResponse } from "../order-feed";
import { wsOrderFeedConnectAction, wsOrderFeedDisconnectAction } from "../order-feed/action";
import { wsFeedClose, wsFeedConnecting, wsFeedError, wsFeedMessage, wsFeedOpen } from "../order-feed/reducer";
import type { TRootState } from "../store";
import type { IWsActionTypes } from "./types";

const wsFeedMiddleware =
  <S, M>(wsActions: IWsActionTypes<S, M>): Middleware<unknown, TRootState> =>
  (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsActions.connect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsActions.onConnecting());
        isConnected = true;
        url = action.payload;

        socket.onopen = () => {
          dispatch(wsActions.onOpen());
        };

        socket.onclose = () => {
          dispatch(wsActions.onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => dispatch(wsActions.connect(url)), 3000);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);
            dispatch(wsActions.onMessage(parsedData));
          } catch (error) {
            dispatch(wsActions.onError((error as Error).message));
          }
        };

        socket.onerror = () => {
          dispatch(wsActions.onError("Что-то пошло не так"));
        };
      }

      if (socket && wsActions.sendMessage?.match(action)) {
        try {
          const strinifiedData = JSON.stringify(action.payload);
          socket.send(strinifiedData);
        } catch (error) {
          dispatch(wsActions.onError((error as Error).message));
        }
      }

      if (socket && wsActions.disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };

export const feedRibbonWs = wsFeedMiddleware<unknown, IFeedRibbonDataResponse>({
  connect: wsOrderFeedConnectAction,
  disconnect: wsOrderFeedDisconnectAction,
  // sendMessage: wsSendMessage,
  onOpen: wsFeedOpen,
  onClose: wsFeedClose,
  onError: wsFeedError,
  onMessage: wsFeedMessage,
  onConnecting: wsFeedConnecting
});

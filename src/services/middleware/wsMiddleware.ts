import { postRefreshTokenMutation } from "@api/postRefreshTokenMutation";
import type { Middleware } from "@reduxjs/toolkit";

import type { IFeedRibbonDataResponse } from "../order-feed";
import { wsOrderFeedConnectAction, wsOrderFeedDisconnectAction } from "../order-feed/action";
import { wsFeedClose, wsFeedConnecting, wsFeedError, wsFeedMessage, wsFeedOpen } from "../order-feed/reducer";
import {
  wsProfileOrderClose,
  wsProfileOrderConnectAction,
  wsProfileOrderConnecting,
  wsProfileOrderDisconnectAction,
  wsProfileOrderError,
  wsProfileOrderMessage,
  wsProfileOrderOpen
} from "../profile-order";
import type { TRootState } from "../store";
import type { IWsActionTypes } from "./types";

const wsMiddleware =
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
            if (parsedData.message === "Invalid or missing token") {
              postRefreshTokenMutation()
                .then((res) => {
                  dispatch(
                    wsActions.connect(
                      `${localStorage.getItem("access-token")}?token=${res.accessToken.replace("Bearer ", "")}`
                    )
                  );
                })
                .catch((error) => {
                  dispatch(wsActions.onError((error as Error).message));
                });

              dispatch(wsActions.disconnect());

              return;
            }
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

export const profileRibbonWs = wsMiddleware<unknown, IFeedRibbonDataResponse>({
  connect: wsProfileOrderConnectAction,
  disconnect: wsProfileOrderDisconnectAction,
  // sendMessage: wsSendMessage,
  onOpen: wsProfileOrderOpen,
  onClose: wsProfileOrderClose,
  onError: wsProfileOrderError,
  onMessage: wsProfileOrderMessage,
  onConnecting: wsProfileOrderConnecting
});

export const feedRibbonWs = wsMiddleware<unknown, IFeedRibbonDataResponse>({
  connect: wsOrderFeedConnectAction,
  disconnect: wsOrderFeedDisconnectAction,
  // sendMessage: wsSendMessage,
  onOpen: wsFeedOpen,
  onClose: wsFeedClose,
  onError: wsFeedError,
  onMessage: wsFeedMessage,
  onConnecting: wsFeedConnecting
});

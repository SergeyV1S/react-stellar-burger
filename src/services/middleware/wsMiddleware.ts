import { postRefreshTokenMutation } from "@api/postRefreshTokenMutation";
import type { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";

import { wsConnectAction, wsDisconnectAction } from "../order-feed/action";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../order-feed/reducer";
import type { IRibbonDataResponse } from "../order-feed/types";
import type { TRootState } from "../store";

export interface IWsActionTypes<S, M> {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<M>;
  onConnecting: ActionCreatorWithoutPayload;
}

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
                      `${localStorage.getItem("accessToken")}?token=${res.accessToken.replace("Bearer ", "")}`
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

export const feedRibbonWs = wsMiddleware<unknown, IRibbonDataResponse>({
  connect: wsConnectAction,
  disconnect: wsDisconnectAction,
  // sendMessage: wsSendMessage,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
  onConnecting: wsConnecting
});

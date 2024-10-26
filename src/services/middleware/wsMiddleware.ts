import { postRefreshTokenMutation } from "@api/postRefreshTokenMutation";
import type { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";

import type { TAppDispatch, TRootState } from "../store";

export interface IWsActionTypes<S, M> {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<M>;
}

export const wsMiddleware =
  <S, M>(wsActions: IWsActionTypes<S, M>): Middleware<unknown, TRootState, TAppDispatch> =>
  (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsActions.connect.match(action)) {
        socket = new WebSocket(action.payload);
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
                  dispatch(wsActions.connect(`${url}?token=${res.accessToken.replace("Bearer ", "")}`));
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

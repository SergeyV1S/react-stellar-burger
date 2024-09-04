/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

import { rootReducer } from "./reducers";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch;

export default store;
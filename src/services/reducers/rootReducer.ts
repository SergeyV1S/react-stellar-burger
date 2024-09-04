import { combineReducers } from "redux";

import { ingredietReducer } from "./ingredient";

export const rootReducer = combineReducers({
  ingrediets: ingredietReducer
});

export type TRootReducerState = ReturnType<typeof rootReducer>;

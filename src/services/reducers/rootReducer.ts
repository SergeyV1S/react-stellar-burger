import { combineReducers } from "redux";

import { constructorRuducer } from "./constructor";
import { ingredietReducer } from "./ingredient";

export const rootReducer = combineReducers({
  ingrediets: ingredietReducer,
  constructorData: constructorRuducer
});

export type TRootReducerState = ReturnType<typeof rootReducer>;

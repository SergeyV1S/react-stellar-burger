import { combineReducers } from "redux";

import { constructorRuducer } from "./constructor";
import { ingredietReducer } from "./ingredient";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingrediets: ingredietReducer,
  constructorData: constructorRuducer,
  order: orderReducer
});

export type TRootReducerState = ReturnType<typeof rootReducer>;

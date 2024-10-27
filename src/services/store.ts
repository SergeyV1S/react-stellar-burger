import { configureStore as createStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { feedRibbonWs, profileRibbonWs } from "./middleware";
import { rootReducer } from "./rootReducer";

const store = createStore({
  devTools: true,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["ingredientSlice.ingredientsMap"]
      }
    }).concat(feedRibbonWs, profileRibbonWs)
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();

export default store;

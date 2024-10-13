import { configureStore as createStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

import { rootReducer } from "./rootReducer"

const store = createStore({
  devTools: true,
  reducer: rootReducer
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>()
export const useAppSelector = useSelector.withTypes<TRootState>()

export default store

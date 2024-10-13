import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { createOrderAction } from "./action"
import type { IOrder, IOrderInitialState } from "./types"

const initialState: IOrderInitialState = {
  order: null,
  error: undefined,
  isOrderModalOpen: false,
  isLoading: false
}

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    toggleOrderModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOrderModalOpen = action.payload.isOpen
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAction.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.order = action.payload
        state.isLoading = false
      })
      .addCase(createOrderAction.rejected, (state, action) => {
        state.error = action.error?.message
        state.isLoading = false
      })
      .addCase(createOrderAction.pending, (state) => {
        state.isOrderModalOpen = true
        state.order = null
        state.error = undefined
        state.isLoading = true
      })
  },
  selectors: {
    getIsModalOrder: (state) => state.isOrderModalOpen,
    getOrderStore: (state) => state
  }
})

export const { toggleOrderModal } = orderSlice.actions

export const { getIsModalOrder, getOrderStore } = orderSlice.selectors

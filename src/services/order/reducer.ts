import type { IFeedOrderData, IOrder } from "@interfaces/order";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { createOrderAction, getCurrentOrderAction } from "./action";
import type { IOrderInitialState } from "./types";

export const initialState: IOrderInitialState = {
  order: null,
  currentOrder: null,
  error: undefined,
  isOrderModalOpen: false,
  isLoading: false
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    toggleOrderModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOrderModalOpen = action.payload.isOpen;
    }
  },
  extraReducers: (builder) => {
    builder
      // Создание заказа
      .addCase(createOrderAction.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrderAction.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(createOrderAction.pending, (state) => {
        state.isOrderModalOpen = true;
        state.order = null;
        state.error = undefined;
        state.isLoading = true;
      })
      // Получение заказа по номеру
      .addCase(getCurrentOrderAction.fulfilled, (state, action: PayloadAction<IFeedOrderData[]>) => {
        state.currentOrder = action.payload[0];
        state.isLoading = false;
      })
      .addCase(getCurrentOrderAction.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(getCurrentOrderAction.pending, (state) => {
        state.order = null;
        state.error = undefined;
        state.isLoading = true;
      });
  },
  selectors: {
    getIsModalOrder: (state) => state.isOrderModalOpen,
    getOrderStore: (state) => state,
    getCurrentOrder: (state) => state.order
  }
});

export const { toggleOrderModal } = orderSlice.actions;

export const { getIsModalOrder, getOrderStore, getCurrentOrder } = orderSlice.selectors;

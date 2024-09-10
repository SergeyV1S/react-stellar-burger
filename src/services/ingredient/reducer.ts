import type { IIngredient } from "@interfaces/ingredient";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getInrgedientsAction } from "./action";
import type { IIngredientInitialState } from "./types";

const initialState: IIngredientInitialState = {
  data: [],
  error: undefined,
  isLoading: false,
  modal: {
    selectedIngredient: null,
    isSelectedIngredientModalOpen: false
  }
};

export const ingredietSlice = createSlice({
  name: "ingredientSlice", // === reducerPath
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.modal.selectedIngredient = action.payload;
      state.modal.isSelectedIngredientModalOpen = true;
    },
    toggleIngredientModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.modal.isSelectedIngredientModalOpen = action.payload.isOpen;
    }
  },
  selectors: {
    getIngredientsState: (state) => state,
    getIngredientModal: (state) => state.modal
  },
  // если есть готовый экшенк реатор
  extraReducers: (builder) => {
    builder
      .addCase(getInrgedientsAction.fulfilled, (state, action: PayloadAction<{ data: IIngredient[] }>) => {
        state.data = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getInrgedientsAction.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getInrgedientsAction.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
        state.data = [];
      });
  }
});

export const { setSelectedIngredient, toggleIngredientModal } = ingredietSlice.actions;

export const { getIngredientsState, getIngredientModal } = ingredietSlice.selectors;

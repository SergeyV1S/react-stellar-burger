import type { IIngredient } from "@interfaces/ingredient";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getIngredientsAction } from "./action";
import type { IIngredientInitialState } from "./types";

const initialState: IIngredientInitialState = {
  data: [],
  error: undefined,
  isLoading: false,
  ingredientsMap: new Map(),
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
    closeIngredientModal: (state) => {
      state.modal.selectedIngredient = null;
      state.modal.isSelectedIngredientModalOpen = false;
    }
  },
  selectors: {
    getIngredienstMapData: (state) => state.ingredientsMap,
    getIngredientsState: (state) => state,
    getIngredientModal: (state) => state.modal
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsAction.fulfilled, (state, action: PayloadAction<{ data: IIngredient[] }>) => {
        state.isLoading = false;
        state.data = action.payload.data;

        const ingredientsMap = new Map();
        action.payload.data.forEach((item) => {
          ingredientsMap.set(item._id, item);
        });
        state.ingredientsMap = ingredientsMap;
      })
      .addCase(getIngredientsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsAction.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.data = [];
      });
  }
});

export const { setSelectedIngredient, closeIngredientModal } = ingredietSlice.actions;

export const { getIngredientsState, getIngredientModal, getIngredienstMapData } = ingredietSlice.selectors;

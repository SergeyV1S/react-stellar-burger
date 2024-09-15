import { getInrgedientsQuery } from "@api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIngredientsAction = createAsyncThunk("ingredientSlice/getIngredients", async () =>
  getInrgedientsQuery()
);

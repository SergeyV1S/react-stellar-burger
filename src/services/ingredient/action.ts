import { getInrgedientsQuery } from "@api/getIngredientsQuery"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getIngredientsAction = createAsyncThunk("ingredientSlice/getIngredients", async () =>
  getInrgedientsQuery()
)

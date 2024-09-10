import { getInrgedientsQuery } from "@api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getInrgedientsAction = createAsyncThunk("ingredientSlice/getInrgedients", async () =>
  getInrgedientsQuery()
);

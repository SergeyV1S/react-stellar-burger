import { getCurrentOrderQuery } from "@api/getCurrentOrderQuery";
import { postOrderMutation } from "@api/postOrderMutation";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrderAction = createAsyncThunk("orderSlice/createOrder", async (idArr: string[]) =>
  postOrderMutation(idArr)
);

export const getCurrentOrderAction = createAsyncThunk("orderSlice/getCurrentOrder", async (orderNumber: number) =>
  getCurrentOrderQuery(orderNumber)
);

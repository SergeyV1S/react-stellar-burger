import { postOrderMutation } from "@api/postOrderMutation"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const createOrderAction = createAsyncThunk("orderSlice/createOrder", async (idArr: string[]) =>
  postOrderMutation(idArr)
)

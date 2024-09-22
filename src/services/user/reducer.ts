import type { IGetUserResponse } from "@api/getUserQuery";
import type { IPostCreateMutationResponse } from "@api/postCreateUserMutation";
import type { IPostLoginMutationResponse } from "@api/postLoginMutation";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getUserAction, loginUserAction, registerUserAction } from "./action";
import type { IUserInitialState } from "./types";

const defaultUser = {
  email: "",
  name: ""
};

const initialState: IUserInitialState = {
  user: defaultUser,
  error: undefined,
  isLoading: false
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUserAction.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action: PayloadAction<IPostCreateMutationResponse>) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      // Получение пользователя
      .addCase(getUserAction.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUserAction.fulfilled, (state, action: PayloadAction<IGetUserResponse>) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      // Авторизация
      .addCase(loginUserAction.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginUserAction.fulfilled, (state, action: PayloadAction<IPostLoginMutationResponse>) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
  selectors: {
    getuserDataOrder: (state) => state.user,
    getUserStore: (state) => state
  }
});

// export const { } = userSlice.actions;

export const { getUserStore, getuserDataOrder } = userSlice.selectors;

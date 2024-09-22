import { getUserQuery } from "@api/getUserQuery";
import { postCreateUserMutation } from "@api/postCreateUserMutation";
import { postLoginMutation } from "@api/postLoginMutation";
import type { ILoginForm } from "@pages/login/types";
import type { IRegisterForm } from "@pages/register/types/registerForm";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUserAction = createAsyncThunk("userSlice/registerUser", async (userData: IRegisterForm) =>
  postCreateUserMutation(userData)
);

export const getUserAction = createAsyncThunk("userSlice/getUser", async () => getUserQuery());

export const loginUserAction = createAsyncThunk("userSlice/loginUser", async (userAuthData: ILoginForm) =>
  postLoginMutation(userAuthData)
);

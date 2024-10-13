import { getUserQuery } from "@api/getUserQuery"
import { patchUserDataMutation } from "@api/patchUserDataMutation"
import { postCreateUserMutation } from "@api/postCreateUserMutation"
import { postLoginMutation } from "@api/postLoginMutation"
import { postLogoutMutation } from "@api/postLogoutMutation"
import type { ILoginForm } from "@pages/login/types"
import type { IProfileForm } from "@pages/profile/types/profileForm"
import type { IRegisterForm } from "@pages/register/types/registerForm"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerUserAction = createAsyncThunk("userSlice/registerUser", async (userData: IRegisterForm) =>
  postCreateUserMutation(userData)
)

export const getUserAction = createAsyncThunk("userSlice/getUser", async () => getUserQuery())

export const loginUserAction = createAsyncThunk("userSlice/loginUser", async (userAuthData: ILoginForm) =>
  postLoginMutation(userAuthData)
)

export const logoutUserAction = createAsyncThunk("userSlice/logoutUser", async () => postLogoutMutation())

export const updateUserAction = createAsyncThunk("userSlice/updateUser", async (newUserData: IProfileForm) =>
  patchUserDataMutation(newUserData)
)

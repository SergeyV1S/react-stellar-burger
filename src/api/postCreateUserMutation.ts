import type { IUser } from "@interfaces/user"
import type { IRegisterForm } from "@pages/register/types/registerForm"
import { checkReponse } from "@src/utils/checkResponse"

export interface IPostCreateMutationResponse {
  success: boolean
  user: IUser
  accessToken: string
  refreshToken: string
}

export const postCreateUserMutation = async (data: IRegisterForm) =>
  await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(checkReponse)
    .then((jsonRes: IPostCreateMutationResponse) => {
      localStorage.setItem("access-token", jsonRes.accessToken)
      localStorage.setItem("refresh-token", jsonRes.refreshToken)
      return jsonRes
    })

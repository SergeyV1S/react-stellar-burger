import type { IProfileForm } from "@pages/profile/types/profileForm"
import { checkReponse } from "@utils/checkResponse"

import type { IGetUserResponse } from "./getUserQuery"

export const patchUserDataMutation = (newUser: IProfileForm) =>
  fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access-token") || ""
    },
    body: JSON.stringify({
      email: newUser.email,
      name: newUser.name,
      password: newUser.password
    })
  })
    .then(checkReponse)
    .then((jsonRes: IGetUserResponse) => jsonRes)
    .catch((err) => Promise.reject(err))

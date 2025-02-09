import type { IProfileForm } from "@pages/profile/types/profileForm";
import { checkReponse } from "@utils/index";

import type { IGetUserResponse } from "./getUserQuery";

export const patchUserDataMutation = (newUser: IProfileForm) =>
  fetch(`${process.env.BASE_API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access-token") || ""
    },
    body: JSON.stringify({
      email: newUser.email,
      name: newUser.name,
      password: newUser.password
    })
  })
    .then(checkReponse)
    .then((jsonRes: IGetUserResponse) => jsonRes.user)
    .catch((err) => Promise.reject(err));

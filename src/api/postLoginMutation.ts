import type { IUser } from "@interfaces/user";
import type { ILoginForm } from "@pages/login/types";
import { checkReponse } from "@utils/checkResponse";

export interface IPostLoginMutationResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export const postLoginMutation = async (userAuthData: ILoginForm) =>
  await fetch(`${process.env.BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userAuthData)
  })
    .then(checkReponse)
    .then((jsonRes: IPostLoginMutationResponse) => {
      localStorage.setItem("access-token", jsonRes.accessToken.replace("Bearer ", ""));
      localStorage.setItem("refresh-token", jsonRes.refreshToken);
      return jsonRes;
    })
    .catch((error) => {
      throw error;
    });

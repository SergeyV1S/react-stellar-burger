import type { IUser } from "@interfaces/user";
import type { IRegisterForm } from "@pages/register/types/registerForm";
import { checkReponse } from "@utils/index";

export interface IPostCreateMutationResponse {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export const postCreateUserMutation = async (data: IRegisterForm) =>
  await fetch(`${process.env.BASE_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(checkReponse)
    .then((jsonRes: IPostCreateMutationResponse) => {
      localStorage.setItem("access-token", jsonRes.accessToken.replace("Bearer ", ""));
      localStorage.setItem("refresh-token", jsonRes.refreshToken);
      return jsonRes.user;
    })
    .catch((error) => {
      throw error;
    });

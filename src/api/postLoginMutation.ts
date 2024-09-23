import type { IUser } from "@interfaces/user";
import type { ILoginForm } from "@pages/login/types";

export interface IPostLoginMutationResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export const postLoginMutation = async (userAuthData: ILoginForm) =>
  await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userAuthData)
  })
    .then((res): Promise<IPostLoginMutationResponse> => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    })
    .then((jsonRes) => {
      localStorage.setItem("access-token", jsonRes.accessToken);
      localStorage.setItem("refresh-token", jsonRes.refreshToken);
      return jsonRes;
    });
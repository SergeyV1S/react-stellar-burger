import type { IUser } from "@interfaces/user";
import type { IRegisterForm } from "@pages/register/types/registerForm";

export interface IPostCreateMutationResponse {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export const postCreateUserMutation = async (data: IRegisterForm) =>
  await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res): Promise<IPostCreateMutationResponse> => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((jsonRes) => {
      localStorage.setItem("access-token", jsonRes.accessToken);
      localStorage.setItem("refresh-token", jsonRes.refreshToken);
      return jsonRes;
    });

import type { IUser } from "@interfaces/user";

import { fetchWithRefresh } from "./fetchWithRefresh";

export interface IGetUserResponse {
  success: boolean;
  user: IUser;
}

export const getUserQuery = async () =>
  await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access-token") || ""
    }
  })
    .then((res) => res)
    .catch((err) => Promise.reject(err));

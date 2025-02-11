import type { IUser } from "@interfaces/user";

import { fetchWithRefresh } from "../utils";

export interface IGetUserResponse {
  success: boolean;
  user: IUser;
}

export const getUserQuery = async () =>
  await fetchWithRefresh(`${process.env.BASE_API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access-token") || ""
    }
  })
    .then((res: IGetUserResponse) => res.user)
    .catch((err) => Promise.reject(err));

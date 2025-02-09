import { checkReponse } from "@utils/index";

export interface IPostLogoutMutation {
  success: boolean;
  message: string;
}

export const postLogoutMutation = () =>
  fetch(`${process.env.BASE_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem("refresh-token") || ""
    })
  })
    .then(checkReponse)
    .then((jsonRes: IPostLogoutMutation) => {
      if (!jsonRes.success) return Promise.reject("error");
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      return jsonRes.success;
    });

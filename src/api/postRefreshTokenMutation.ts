import { checkReponse } from "@utils/index";

interface IPostRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const postRefreshTokenMutation = () =>
  fetch(`${process.env.BASE_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      token: localStorage.getItem("refresh-token") || ""
    })
  })
    .then(checkReponse)
    .then((refreshData: IPostRefreshTokenResponse) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refresh-token", refreshData.refreshToken);
      localStorage.setItem("access-token", refreshData.accessToken.replace("Bearer ", ""));
      return refreshData;
    });

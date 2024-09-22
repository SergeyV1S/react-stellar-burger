interface IPostRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const postRefreshTokenMutation = () =>
  fetch(`${import.meta.env.VITE_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      token: localStorage.getItem("refresh-token")
    })
  })
    .then((res): Promise<IPostRefreshTokenResponse> => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refresh-token", refreshData.refreshToken);
      localStorage.setItem("access-token", refreshData.accessToken);
      return refreshData;
    })
    .catch((err) => err);

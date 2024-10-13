import { checkReponse } from "@utils/checkResponse"

interface IPostRefreshTokenResponse {
  success: boolean
  accessToken: string
  refreshToken: string
}

export const postRefreshTokenMutation = () =>
  fetch(`${import.meta.env.VITE_API_URL}/auth/token`, {
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
        return Promise.reject(refreshData)
      }
      localStorage.setItem("refresh-token", refreshData.refreshToken)
      localStorage.setItem("access-token", refreshData.accessToken)
      return refreshData
    })

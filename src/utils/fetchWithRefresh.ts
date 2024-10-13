import { postRefreshTokenMutation } from "../api/postRefreshTokenMutation"
import { checkReponse } from "./checkResponse"

interface FetchOptions extends RequestInit {
  headers: Record<string, string>
}

export const fetchWithRefresh = async (url: string, options: FetchOptions) => {
  try {
    const res = await fetch(url, options)
    return await checkReponse(res)
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await postRefreshTokenMutation()
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options)
      return await checkReponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}

import { postRefreshTokenMutation } from "../api/postRefreshTokenMutation";
import { checkReponse } from "./checkResponse";

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await postRefreshTokenMutation();
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

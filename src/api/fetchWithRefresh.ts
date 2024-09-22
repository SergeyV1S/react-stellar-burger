import { postRefreshTokenMutation } from "./postrefreshTokenMutation";

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return res.json();
    } else if (res.status === 403) {
      throw { status: 403 };
    }
    return Promise.reject(`Ошибка ${res.status}`);
  } catch (err: any) {
    if (err.status === 403) {
      const refreshData = await postRefreshTokenMutation();
      if (refreshData === 401) throw refreshData;
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    } else {
      return Promise.reject("other error");
    }
  }
};

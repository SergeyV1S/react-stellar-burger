export const checkReponse = (res: Response) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))

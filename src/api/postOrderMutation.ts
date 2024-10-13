import { checkReponse } from "@utils/checkResponse"

export const postOrderMutation = async (idArr: string[]) =>
  await fetch(import.meta.env.VITE_API_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access-token") || ""
    },
    body: JSON.stringify({
      ingredients: idArr
    })
  })
    .then(checkReponse)
    .then((res) => res)

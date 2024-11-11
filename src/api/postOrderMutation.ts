import { checkReponse } from "@utils/checkResponse";

export const postOrderMutation = async (idArr: string[]) =>
  await fetch(process.env.BASE_API_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access-token") || ""
    },
    body: JSON.stringify({
      ingredients: idArr
    })
  })
    .then(checkReponse)
    .then((res) => res);

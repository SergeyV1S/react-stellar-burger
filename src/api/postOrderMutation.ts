export const postOrderMutation = async (idArr: string[]) =>
  await fetch(import.meta.env.VITE_API_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients: idArr
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });

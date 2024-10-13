export const getInrgedientsQuery = async () =>
  await fetch(import.meta.env.VITE_API_URL + "/ingredients").then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  })

import type { IIngredient } from "@interfaces/ingredient";

interface IState {
  data: IIngredient[] | null;
  error: Error | string;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

export const getInrgedients = async (setState: React.Dispatch<React.SetStateAction<IState>>) => {
  setState((prevState) => ({ ...prevState, isLoading: true }));
  await fetch(import.meta.env.VITE_API_URL + "/ingredients")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((jsonRes) =>
      setState((prevState) => ({ ...prevState, data: jsonRes.data, isSuccess: jsonRes.success }))
    )
    .catch((err: Error) =>
      setState((prevState) => ({
        ...prevState,
        error: typeof err === "string" ? err : err.message,
        isError: true
      }))
    )
    .finally(() => setState((prevState) => ({ ...prevState, isLoading: false })));
};

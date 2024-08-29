import type { IIngredient } from "@interfaces/ingredient";

interface IState {
  data: IIngredient[] | null | Error;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

export const getInrgedients = async (setState: React.Dispatch<React.SetStateAction<IState>>) => {
  setState((prevState) => ({ ...prevState, isLoading: true }));

  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/ingredients");

    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
    }

    const jsonRes = await res.json();

    setState((prevState) => ({
      ...prevState,
      data: jsonRes.data,
      isSuccess: true,
      isError: false
    }));
  } catch (err: any) {
    setState((prevState) => ({
      ...prevState,
      data: err,
      isError: true,
      isSuccess: false
    }));
  } finally {
    setState((prevState) => ({ ...prevState, isLoading: false }));
  }
};

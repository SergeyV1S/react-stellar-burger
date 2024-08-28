import type { IDataType } from "@utils/data";
import { useEffect, useState } from "react";

import { AppHeader } from "@components/app-header";
import { BurgerConstructor } from "@components/burger-constructor";
import { BurgerIngredients } from "@components/burger-ingredients";

import app from "./app.module.css";

interface IState {
  data: IDataType[] | null;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

export const App = () => {
  const [state, setState] = useState<IState>({
    data: null,
    isSuccess: false,
    isError: false,
    isLoading: false
  });

  const fetchData = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    await fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((jsonRes) =>
        setState((prevState) => ({ ...prevState, data: jsonRes.data, isSuccess: jsonRes.success }))
      )
      .catch((err) => setState((prevState) => ({ ...prevState, data: err.message, isError: true })))
      .finally(() => setState((prevState) => ({ ...prevState, isLoading: false })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={app.container}>
        {state.isSuccess && state.data && (
          <>
            <BurgerIngredients products={state.data} />
            <BurgerConstructor products={state.data} />
          </>
        )}
        {state.isLoading && <div>Загрузка...</div>}
      </main>
    </>
  );
};

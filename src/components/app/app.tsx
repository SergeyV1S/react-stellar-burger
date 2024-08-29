import type { IIngredient } from "@interfaces/ingredient";
import { getInrgedients } from "@utils/api";
import { useEffect, useState } from "react";

import { AppHeader } from "@components/app-header";
import { BurgerConstructor } from "@components/burger-constructor";
import { BurgerIngredients } from "@components/burger-ingredients";

import app from "./app.module.css";

interface IState {
  data: IIngredient[] | null | Error;
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

  useEffect(() => {
    getInrgedients(setState);
  }, []);

  return (
    <>
      <AppHeader />
      <main className={app.container}>
        {state.isSuccess && state.data && Array.isArray(state.data) && (
          <>
            <BurgerIngredients products={state.data} />
            <BurgerConstructor products={state.data} />
          </>
        )}
        {state.isLoading && <div>Загрузка...</div>}
        {state.isError && state.data && "message" in state.data && <div>{state.data.message}</div>}
      </main>
    </>
  );
};

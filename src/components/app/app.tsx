/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { TRootReducerState } from "@services/reducers";
import { getInrgedients } from "@utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader } from "@components/app-header";
import { BurgerConstructor } from "@components/burger-constructor";
import { BurgerIngredients } from "@components/burger-ingredients";

import app from "./app.module.css";

export const App = () => {
  const dispatch = useDispatch();
  const { data, error, isError, isLoading, isSuccess } = useSelector((store: TRootReducerState) => store.ingrediets);

  useEffect(() => {
    // @ts-expect-error
    dispatch(getInrgedients());
  }, []);

  return (
    <>
      <AppHeader />
      <main className={app.container}>
        {isSuccess && data && (
          <>
            <BurgerIngredients products={data} />
            <BurgerConstructor products={data} />
          </>
        )}
        {isLoading && <div>Загрузка...</div>}
        {isError && typeof error === "object" && <div>{error.message}</div>}
        {isError && typeof error === "string" && <div>{error}</div>}
      </main>
    </>
  );
};

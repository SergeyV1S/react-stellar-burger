/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { TRootReducerState } from "@services/reducers";
import type { TAppDispatch } from "@services/store";
import { getInrgedients } from "@services/thunks/getInrgedients";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader } from "@components/app-header";
import { BurgerConstructor } from "@components/burger-constructor";
import { BurgerIngredients } from "@components/burger-ingredients";

import app from "./app.module.css";

export const App = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const { error, isLoading, isSuccess } = useSelector((store: TRootReducerState) => store.ingrediets);

  useEffect(() => {
    // @ts-expect-error
    dispatch(getInrgedients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={app.container}>
        {isSuccess && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
        {isLoading && <div>Загрузка...</div>}
        {error && typeof error === "object" && <div>{error.message}</div>}
        {error && typeof error === "string" && <div>{error}</div>}
      </main>
    </>
  );
};

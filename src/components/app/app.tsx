import { getInrgedientsAction } from "@services/ingredient";
import { getIngredientsState } from "@services/ingredient";
import { type TAppDispatch, useAppDispatch, useAppSelector } from "@services/store";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AppHeader } from "@components/app-header";
import { BurgerConstructor } from "@components/burger-constructor";
import { BurgerIngredients } from "@components/burger-ingredients";

import app from "./app.module.css";

export const App = () => {
  const dispatch = useAppDispatch<TAppDispatch>();
  const { data, isLoading, error } = useAppSelector(getIngredientsState);

  useEffect(() => {
    dispatch(getInrgedientsAction());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={app.container}>
        {data && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
        {isLoading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
      </main>
    </>
  );
};

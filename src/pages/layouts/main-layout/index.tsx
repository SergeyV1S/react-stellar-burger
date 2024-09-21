import { getIngredientsAction } from "@services/ingredient";
import { getIngredientsState } from "@services/ingredient";
import { type TAppDispatch, useAppDispatch, useAppSelector } from "@services/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { AppHeader } from "@components/app-header";

import styles from "./index-layout.module.css";

export const IndexLayout = () => {
  const dispatch = useAppDispatch<TAppDispatch>();
  const { data, isLoading, error } = useAppSelector(getIngredientsState);

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        {data && <Outlet />}
        {isLoading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
      </main>
    </>
  );
};

import { getIngredientsAction } from "@services/ingredient";
import { getIngredientsState } from "@services/ingredient";
import { type TAppDispatch, useAppDispatch, useAppSelector } from "@services/store";
import { AppHeader, AppHeaderMobile } from "@src/components/app-header";
import { useIsMobile } from "@src/context";
import "@src/index.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Spinner } from "@components/loader";

import styles from "./index-layout.module.css";

export const IndexLayout = () => {
  const dispatch = useAppDispatch<TAppDispatch>();
  const { data, isLoading, error } = useAppSelector(getIngredientsState);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch]);

  return (
    <>
      {isMobile && <AppHeaderMobile />}
      {!isMobile && <AppHeader />}

      <main className={styles.container}>
        {data && !isLoading && <Outlet />}
        {isLoading && (
          <div className='spinner_wrapper'>
            <Spinner />
          </div>
        )}
        {error && <div>{error}</div>}
      </main>
    </>
  );
};

import { getIngredientsAction } from "@services/ingredient"
import { getIngredientsState } from "@services/ingredient"
import { type TAppDispatch, useAppDispatch, useAppSelector } from "@services/store"
import "@src/index.css"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { AppHeader } from "@components/app-header"
import { Spinner } from "@components/loader"

import styles from "./index-layout.module.css"

export const IndexLayout = () => {
  const dispatch = useAppDispatch<TAppDispatch>()
  const { data, isLoading, error } = useAppSelector(getIngredientsState)

  useEffect(() => {
    dispatch(getIngredientsAction())
  }, [dispatch])

  return (
    <>
      <AppHeader />
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
  )
}

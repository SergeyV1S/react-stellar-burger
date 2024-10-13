/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getIngredientModal, getIngredientsState } from "@services/ingredient"
import { useAppSelector } from "@services/store"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef, useState } from "react"

import { IngredientDetails } from "@components/ingredient-details"
import { Modal } from "@components/modal"

import burgerIngredients from "./burger-ingredients.module.css"
import { BurgerItem } from "./burger-item"
import { checkTabPosition } from "./utils"

export const BurgerIngredients = () => {
  // Хуки
  const [currentTab, setCurrentTab] = useState("bun")

  const { data } = useAppSelector(getIngredientsState)
  const { isSelectedIngredientModalOpen } = useAppSelector(getIngredientModal)

  const bunsRef = useRef<HTMLDivElement>(null)
  const mainsRef = useRef<HTMLDivElement>(null)
  const saucesRef = useRef<HTMLDivElement>(null)
  const ingredientsRef = useRef<HTMLDivElement>(null)

  // Данные для отрисовки ингредиентов по типам и скролла
  const ingredientTypesData = [
    { name: "Булки", type: "bun", ref: bunsRef },
    { name: "Основное", type: "main", ref: mainsRef },
    { name: "Соусы", type: "sauce", ref: saucesRef }
  ]

  // Функционал

  const selectTab = (tab: string) => {
    document.getElementById(tab)?.scrollIntoView({ behavior: "smooth" })
    setCurrentTab(tab)
  }

  const checkPosition = () => {
    const ingredientsTop = ingredientsRef.current!.getBoundingClientRect().top
    const bunsTop = bunsRef.current!.getBoundingClientRect().top
    const mainsTop = mainsRef.current!.getBoundingClientRect().top
    const saucesTop = saucesRef.current!.getBoundingClientRect().top

    setCurrentTab(checkTabPosition(ingredientsTop, bunsTop, mainsTop, saucesTop))
  }

  return (
    <section className={burgerIngredients.container}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={burgerIngredients.tab_menu_container}>
        <Tab value='bun' active={currentTab === "bun"} onClick={selectTab}>
          Булки
        </Tab>
        <Tab value='main' active={currentTab === "main"} onClick={selectTab}>
          Начинки
        </Tab>
        <Tab value='sauce' active={currentTab === "sauce"} onClick={selectTab}>
          Соусы
        </Tab>
      </div>
      <div ref={ingredientsRef} onScroll={checkPosition} className={burgerIngredients.ingredients}>
        {ingredientTypesData.map((ingredientType) => (
          <div key={ingredientType.type}>
            <h2 ref={ingredientType.ref} id={ingredientType.type} className='text text_type_main-medium'>
              {ingredientType.name}
            </h2>
            <div className={burgerIngredients.type_block_container}>
              {data &&
                data.map(
                  (product) => product.type === ingredientType.type && <BurgerItem item={product} key={product._id} />
                )}
            </div>
          </div>
        ))}
      </div>
      {isSelectedIngredientModalOpen && (
        <Modal>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  )
}

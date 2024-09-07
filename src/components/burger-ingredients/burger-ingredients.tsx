/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TOGGLE_SELECTED_INGREDIENT_MODAL } from "@services/actions/inrgedients";
import type { TRootReducerState } from "@services/reducers";
import type { TAppDispatch } from "@services/store";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IngredientDetails } from "@components/ingredient-details";
import { Modal } from "@components/modal";

import burgerIngredients from "./burger-ingredients.module.css";
import { BurgerItem } from "./burger-item";

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");

  const { data, isSelectedIngredientModalOpen, selectedIngredient } = useSelector(
    (store: TRootReducerState) => store.ingrediets
  );
  const dispatch = useDispatch<TAppDispatch>();

  const bunsRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  const ingredientTypesData = [
    { name: "Булки", type: "bun", ref: bunsRef },
    { name: "Основное", type: "main", ref: mainsRef },
    { name: "Соусы", type: "sauce", ref: saucesRef }
  ];

  const selectTab = (tab: string) => {
    document.getElementById(tab)?.scrollIntoView({ behavior: "smooth" });
    setCurrentTab(tab);
  };

  const closeModal = () => dispatch({ type: TOGGLE_SELECTED_INGREDIENT_MODAL, isOpen: false });

  const checkPosition = () => {
    if (
      ingredientsRef.current!.getBoundingClientRect().top - mainsRef.current!.getBoundingClientRect().top >
      bunsRef.current!.getBoundingClientRect().top - ingredientsRef.current!.getBoundingClientRect().top
    ) {
      setCurrentTab("main");
    }
    if (bunsRef.current!.getBoundingClientRect().top > 180) {
      setCurrentTab("bun");
    }
    if (saucesRef.current!.getBoundingClientRect().top - ingredientsRef.current!.getBoundingClientRect().top < 400) {
      setCurrentTab("sauce");
    }
  };

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
        <Modal closeModal={closeModal} title='Детали ингредиента'>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};

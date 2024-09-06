/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { TRootReducerState } from "@services/reducers";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import burgerIngredients from "./burger-ingredients.module.css";
import { BurgerItem } from "./burger-item";

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");

  const products = useSelector((store: TRootReducerState) => store.ingrediets.data);
  const bunsRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  const ingredientTypes = [
    { name: "Булки", type: "bun", ref: bunsRef },
    { name: "Основное", type: "main", ref: mainsRef },
    { name: "Соусы", type: "sauce", ref: saucesRef }
  ];

  const selectTab = (tab: string) => {
    document.getElementById(tab)?.scrollIntoView({ behavior: "smooth" });
    setCurrentTab(tab);
  };

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
        {ingredientTypes.map((ingredientType) => (
          <div key={ingredientType.type}>
            <h2 ref={ingredientType.ref} id={ingredientType.type} className='text text_type_main-medium'>
              {ingredientType.name}
            </h2>
            <div className={burgerIngredients.type_block_container}>
              {products &&
                products.map(
                  (product) => product.type === ingredientType.type && <BurgerItem item={product} key={product._id} />
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import type { IDataType } from "@utils/data";

import { TabMenu } from "../ui";
import burgerIngredients from "./burger-ingredients.module.css";
import { BurgerTypeBlock } from "./burger-type-block";

const filterCategories = (data: IDataType[]) => {
  const buns = data.filter((item) => item.type === "bun");
  const mains = data.filter((item) => item.type === "main");
  const sauces = data.filter((item) => item.type === "sauce");
  return { buns, mains, sauces };
};

interface IBurgerIngredientsProps {
  products: IDataType[];
}

export const BurgerIngredients = ({ products }: IBurgerIngredientsProps) => {
  const { buns, mains, sauces } = filterCategories(products);
  return (
    <section className={burgerIngredients.container}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <TabMenu />
      <div className={burgerIngredients.ingredients}>
        <BurgerTypeBlock blockName='Булки' items={buns} />
        <BurgerTypeBlock blockName='Основное' items={mains} />
        <BurgerTypeBlock blockName='Соусы' items={sauces} />
      </div>
    </section>
  );
};

import type { TRootReducerState } from "@services/reducers";
import { useSelector } from "react-redux";

import { TabMenu } from "../ui";
import burgerIngredients from "./burger-ingredients.module.css";
import { BurgerItem } from "./burger-item";

const ingredientTypes = [
  { name: "Булки", type: "bun" },
  { name: "Основное", type: "main" },
  { name: "Булки", type: "sauce" }
];

export const BurgerIngredients = () => {
  const products = useSelector((store: TRootReducerState) => store.ingrediets.data);

  return (
    <section className={burgerIngredients.container}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <TabMenu />
      <div className={burgerIngredients.ingredients}>
        {ingredientTypes.map((ingredientType) => (
          <div key={ingredientType.type}>
            <h2 className='text text_type_main-medium'>{ingredientType.name}</h2>
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

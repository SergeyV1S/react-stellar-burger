import type { IIngredient } from "@interfaces/ingredient";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import { IngredientDetails } from "@components/ingredient-details";
import { Modal } from "@components/modal";

import burgerItem from "./burger-item.module.css";

interface IBurgerItemProps {
  item: IIngredient;
  count: number;
}

export const BurgerItem = ({ count, item }: IBurgerItemProps) => {
  const [isModal, setIsModal] = useState(false);
  return (
    <div className={burgerItem.wrapper}>
      <div className={burgerItem.container} onClick={() => setIsModal(true)}>
        <div className={burgerItem.image_container}>
          <img src={item.image} alt={item.name} />
          <Counter count={count} size='default' extraClass='m-1' />
        </div>
        <div className={burgerItem.price_container}>
          <p className='text text_type_digits-default'>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className='text text_type_main-default'>{item.name}</p>
      </div>
      {isModal && (
        <Modal closeModal={() => setIsModal(false)} title='Детали ингредиента'>
          <IngredientDetails {...item} />
        </Modal>
      )}
    </div>
  );
};

import type { IIngredient } from "@interfaces/ingredient";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientDetails } from "@components/ingredient-details";
import { Modal, useModal } from "@components/modal";

import burgerItem from "./burger-item.module.css";

interface IBurgerItemProps {
  item: IIngredient;
  count: number;
}

export const BurgerItem = ({ count, item }: IBurgerItemProps) => {
  const { isModal, openModal, closeModal } = useModal();
  return (
    <div className={burgerItem.wrapper}>
      <div className={burgerItem.container} onClick={openModal}>
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
        <Modal closeModal={closeModal} title='Детали ингредиента'>
          <IngredientDetails ingredient={item} />
        </Modal>
      )}
    </div>
  );
};

import type { IIngredient } from "@interfaces/ingredient";
import { getIsModalOrder } from "@services/order";
import { useAppSelector } from "@services/store";
import { OrderDetails } from "@src/components/order-details";
import { cn } from "@src/utils";
import {
  Button,
  CloseIcon,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import { Modal } from "@components/modal";

import mobileBurgerConstructorStyles from "./mobile.module.css";

interface IMobileBurgerConstructorProps {
  ingredients: IIngredient[];
  bun: IIngredient | null;
  totalCoast: number;
  createOrder: () => void;
  removeIngredient: (ingredient: IIngredient) => {
    payload: IIngredient;
    type: "constructorSlice/removeIngredientFromConstructor";
  };
}

export const MobileBurgerConstructor = ({
  bun,
  ingredients,
  totalCoast,
  createOrder,
  removeIngredient
}: IMobileBurgerConstructorProps) => {
  const [isIngredientListOpen, setIsIngredientListOpen] = useState(false);
  const isOrderModalOpen = useAppSelector(getIsModalOrder);

  const onClickHandler = () => {
    if (isIngredientListOpen) {
      createOrder();
      setIsIngredientListOpen(false);
    } else {
      setIsIngredientListOpen(true);
    }
  };

  return (
    <>
      <div className={mobileBurgerConstructorStyles.mobile_panel}>
        <div className={mobileBurgerConstructorStyles.mobile_panel_button_container}>
          <p className={cn("text text_type_digits-default", mobileBurgerConstructorStyles.mobile_panel_cost)}>
            {totalCoast} <CurrencyIcon type='primary' />
          </p>
          <Button
            size='small'
            disabled={!bun || ingredients.length === 0}
            onClick={onClickHandler}
            data-testid='create_order_button'
            htmlType='button'
            type='primary'
          >
            {isIngredientListOpen ? "Заказать" : "Смотреть заказ"}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          mobileBurgerConstructorStyles.inrgedient_list_wrapper,
          isIngredientListOpen && mobileBurgerConstructorStyles.inrgedient_list_wrapper_active
        )}
      >
        <div className={mobileBurgerConstructorStyles.inrgedient_list_container}>
          <h1 className='text text_type_main-large mt-5 ml-5'>Заказ</h1>
          <button
            className={mobileBurgerConstructorStyles.mobile_nav_close}
            onClick={() => setIsIngredientListOpen(false)}
          >
            <CloseIcon type='secondary' />
          </button>
          {bun && (
            <ConstructorElement
              extraClass={mobileBurgerConstructorStyles.constructor_element}
              type='top'
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
          {ingredients.length !== 0 &&
            ingredients.map((ingredient) => (
              <ConstructorElement
                key={ingredient.uuid}
                extraClass={mobileBurgerConstructorStyles.constructor_element}
                handleClose={() => removeIngredient(ingredient)}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            ))}
          {bun && (
            <ConstructorElement
              extraClass={mobileBurgerConstructorStyles.constructor_element}
              type='bottom'
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>
      {isOrderModalOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

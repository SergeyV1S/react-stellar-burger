/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { IIngredient } from "@interfaces/ingredient";
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "@services/actions/consructor";
import { TOGGLE_ORDER_MODAL } from "@services/actions/order";
import type { TRootReducerState } from "@services/reducers";
import type { TAppDispatch } from "@services/store";
import { postOrder } from "@services/thunks/postOrder";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "@components/modal";
import { OrderDetails } from "@components/order-details";

import burgerConstructor from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const bun = useSelector((store: TRootReducerState) => store.constructorData.bun);
  const ingredients = useSelector((store: TRootReducerState) => store.constructorData.ingredients);
  const isModal = useSelector((store: TRootReducerState) => store.order.isOrderModalOpen);

  const createOrder = () => {
    if (bun) {
      const idArr = [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id];
      // @ts-expect-error
      dispatch(postOrder(idArr));
    }
  };

  const totalCoast = useMemo(
    () => (bun ? bun.price * 2 : 0) + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
    [bun, ingredients]
  );

  const closeModal = () => {
    dispatch({ type: TOGGLE_ORDER_MODAL, isOpen: false });
  };

  const removeIngredientFromConstructor = (ingredient: IIngredient) => {
    dispatch({ type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient: ingredient });
  };

  return (
    <section className={burgerConstructor.wrapper}>
      <div className={burgerConstructor.burger_constructor_wrapper}>
        <div className={burgerConstructor.bun_wrapper}>
          {bun ? (
            <ConstructorElement
              type='top'
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div className={`${burgerConstructor.no_ingredients_container} ${burgerConstructor.no_bun_top}`}>
              <p className='text text_type_main-default'>Перетащите булку в эту область</p>
            </div>
          )}
        </div>
        <div className={burgerConstructor.ingredients_wrapper}>
          {ingredients.length !== 0 ? (
            ingredients.map((ingredient) => (
              <div key={ingredient.uuid} className={burgerConstructor.ingredients_container}>
                <div className={burgerConstructor.drag_icon_wrapper}>
                  <DragIcon type='primary' />
                </div>
                <ConstructorElement
                  handleClose={() => removeIngredientFromConstructor(ingredient)}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </div>
            ))
          ) : (
            <div className={`${burgerConstructor.no_ingredients_container} ${burgerConstructor.no_ingredients}`}>
              <p className='text text_type_main-default'>Перетащите ингредиент в эту область</p>
            </div>
          )}
        </div>
        <div className={burgerConstructor.bun_wrapper}>
          {bun ? (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <div className={`${burgerConstructor.no_ingredients_container} ${burgerConstructor.no_bun_bottom}`}>
              <p className='text text_type_main-default'>Перетащите булку в эту область</p>
            </div>
          )}
        </div>
      </div>
      <div className={burgerConstructor.button_container}>
        <p className='text text_type_digits-medium'>
          {totalCoast} <CurrencyIcon type='primary' />
        </p>
        <Button
          disabled={!bun || ingredients.length === 0}
          onClick={createOrder}
          htmlType='button'
          type='primary'
          size='large'
        >
          Оформить заказ
        </Button>
      </div>
      {isModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

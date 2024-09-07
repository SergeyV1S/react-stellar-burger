/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { IIngredient } from "@interfaces/ingredient";
import { MOVE_ITEM, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "@services/actions/consructor";
import { TOGGLE_ORDER_MODAL } from "@services/actions/order";
import type { TRootReducerState } from "@services/reducers";
import type { TAppDispatch } from "@services/store";
import { addUuidToIngredient } from "@services/thunks/addUuidToIngredient";
import { postOrder } from "@services/thunks/postOrder";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "@components/modal";
import { OrderDetails } from "@components/order-details";

import burgerConstructor from "./burger-constructor.module.css";
import { IngredientElement } from "./ingredient-element/ingedient-element";

export const BurgerConstructor = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const { bun, ingredients } = useSelector((store: TRootReducerState) => store.constructorData);
  const { isOrderModalOpen } = useSelector((store: TRootReducerState) => store.order);

  const [{ isOver, isBun }, dropTargetConstructorRef] = useDrop({
    accept: "burger-item",
    // @ts-expect-error
    drop: (ingredient: IIngredient) => dispatch(addUuidToIngredient(ingredient)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isBun: monitor.getItem() && monitor.getItem().type === "bun"
    })
  });

  const createOrder = () => {
    if (bun) {
      // @ts-expect-error
      dispatch(postOrder([bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id]));
    }
  };

  const totalCoast = useMemo(
    () => (bun ? bun.price * 2 : 0) + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
    [bun, ingredients]
  );

  const closeModal = () => dispatch({ type: TOGGLE_ORDER_MODAL, isOpen: false });

  const removeIngredientFromConstructor = (ingredient: IIngredient) =>
    dispatch({ type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient: ingredient });

  const ingredientDndStyles = useMemo(
    () => (!isBun && isOver ? burgerConstructor.no_ingredients_dnd_hover : burgerConstructor.no_ingredients),
    [isBun, isOver]
  );

  const bunDndtyles = useMemo(() => isBun && isOver && burgerConstructor.no_bun_dnd_hover, [isBun, isOver]);

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: MOVE_ITEM,
      payload: { dragIndex, hoverIndex }
    });
  };

  return (
    <section className={burgerConstructor.wrapper}>
      <div ref={dropTargetConstructorRef} className={burgerConstructor.burger_constructor_wrapper}>
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
            <div
              className={`${burgerConstructor.no_ingredients_container} ${burgerConstructor.no_bun_top} ${bunDndtyles}`}
            >
              <p className='text text_type_main-default'>Перетащите булку в эту область</p>
            </div>
          )}
        </div>
        <div className={burgerConstructor.ingredients_wrapper}>
          {ingredients.length !== 0 ? (
            ingredients.map((ingredient, index) => (
              <IngredientElement
                key={ingredient.uuid}
                removeIngredientFromConstructor={removeIngredientFromConstructor}
                ingredient={ingredient}
                index={index}
                moveIngredient={moveIngredient}
              />
            ))
          ) : (
            <div className={`${burgerConstructor.no_ingredients_container} ${ingredientDndStyles}`}>
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
            <div
              className={`${burgerConstructor.no_ingredients_container} ${burgerConstructor.no_bun_bottom} ${bunDndtyles}`}
            >
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
      {isOrderModalOpen && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

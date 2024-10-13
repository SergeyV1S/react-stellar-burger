import type { IIngredient } from "@interfaces/ingredient"
import {
  addIngredientToConstructor,
  getConstructorState,
  moveItem,
  removeIngredientFromConstructor
} from "@services/constructor"
import { createOrderAction, getIsModalOrder } from "@services/order"
import { useAppDispatch, useAppSelector } from "@services/store"
import { getUserStore } from "@services/user"
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useMemo } from "react"
import { useDrop } from "react-dnd"
import { useNavigate } from "react-router-dom"

import { Modal } from "@components/modal"
import { OrderDetails } from "@components/order-details"

import burgerConstructor from "./burger-constructor.module.css"
import { IngredientElement } from "./ingredient-element/ingedient-element"
import { countTotalCost, formatIngredientsForRequest } from "./utils"

export const BurgerConstructor = () => {
  // Хуки
  const dispatch = useAppDispatch()
  const { bun, ingredients } = useAppSelector(getConstructorState)
  const isOrderModalOpen = useAppSelector(getIsModalOrder)
  const { user } = useAppSelector(getUserStore)
  const navigate = useNavigate()

  const [{ isOver, isBun }, dropTargetConstructorRef] = useDrop({
    accept: "burger-item",
    drop: (ingredient: IIngredient) => dispatch(addIngredientToConstructor(ingredient)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isBun: monitor.getItem() && monitor.getItem().type === "bun"
    })
  })

  // Функции
  const moveIngredient = (dragIndex: number, hoverIndex: number) => dispatch(moveItem({ dragIndex, hoverIndex }))

  const createOrder = () => {
    if (!user.email) {
      navigate("/login")
      return
    }
    if (bun) {
      dispatch(createOrderAction(formatIngredientsForRequest(bun._id, ingredients)))
    }
  }

  const removeIngredient = (ingredient: IIngredient) => dispatch(removeIngredientFromConstructor(ingredient))

  // Стили при перетаскивании
  const ingredientDndStyles = useMemo(
    () => (!isBun && isOver ? burgerConstructor.no_ingredients_dnd_hover : burgerConstructor.no_ingredients),
    [isBun, isOver]
  )

  const bunDndtyles = isBun && isOver && burgerConstructor.no_bun_dnd_hover

  // Рассчет итоговой стоимости
  const totalCoast = useMemo(() => countTotalCost(bun, ingredients), [bun, ingredients])

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
                removeIngredient={removeIngredient}
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
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

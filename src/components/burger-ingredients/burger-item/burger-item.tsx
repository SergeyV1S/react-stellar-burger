import type { IIngredient } from "@interfaces/ingredient"
import { getConstructorState } from "@services/constructor"
import { useAppSelector } from "@services/store"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag } from "react-dnd"
import { Link, useLocation } from "react-router-dom"

import burgerItem from "./burger-item.module.css"

interface IBurgerItemProps {
  item: IIngredient
}

export const BurgerItem = ({ item }: IBurgerItemProps) => {
  // Хуки
  const location = useLocation()
  const { bun, ingredients } = useAppSelector(getConstructorState)

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: "burger-item",
    item: item,

    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  // Подсчет кол-ва выбранных элементов
  const count = ingredients.filter((element) => item._id === element._id)

  return (
    <Link
      to={`/ingredients/${item._id}`}
      state={{ backgroundLocation: location }}
      className={`${burgerItem.wrapper} ${isDragging && burgerItem.dragCard}`}
      ref={dragRef}
    >
      <div className={burgerItem.container}>
        <div className={burgerItem.image_container}>
          <img ref={dragPreviewRef} src={item.image} alt={item.name} />
          {count.length !== 0 && <Counter count={count.length} size='default' extraClass='m-1' />}
          {bun && bun._id === item._id && <Counter count={2} size='default' extraClass='m-1' />}
        </div>
        <div className={burgerItem.price_container}>
          <p className='text text_type_digits-default'>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className='text text_type_main-default'>{item.name}</p>
      </div>
    </Link>
  )
}

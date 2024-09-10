import type { IIngredient } from "@interfaces/ingredient";
import { getConstructorState } from "@services/constructor";
import { setSelectedIngredient } from "@services/ingredient";
import { type TAppDispatch, useAppDispatch, useAppSelector } from "@services/store";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import burgerItem from "./burger-item.module.css";

interface IBurgerItemProps {
  item: IIngredient;
}

export const BurgerItem = ({ item }: IBurgerItemProps) => {
  // Хуки
  const dispatch = useAppDispatch<TAppDispatch>();
  const { bun, ingredients } = useAppSelector(getConstructorState);

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: "burger-item",
    item: item,

    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // Подсчет кол-ва выбранных элементов
  const count = ingredients.filter((element) => item._id === element._id);

  // Открытие модального окна
  const openModal = () => dispatch(setSelectedIngredient(item));

  return (
    <div className={`${burgerItem.wrapper} ${isDragging && burgerItem.dragCard}`} ref={dragRef}>
      <div className={burgerItem.container} onClick={openModal}>
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
    </div>
  );
};

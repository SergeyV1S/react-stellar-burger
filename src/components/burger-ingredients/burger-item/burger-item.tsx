import type { IIngredient } from "@interfaces/ingredient";
import { addIngredientToConstructor, getConstructorState } from "@services/constructor";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useIsMobile } from "@src/context";
import { cn } from "@src/utils";
import { Button, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import burgerItem from "./burger-item.module.css";

interface IBurgerItemProps {
  item: IIngredient;
}

export const BurgerItem = ({ item }: IBurgerItemProps) => {
  // Хуки
  const location = useLocation();
  const { bun, ingredients } = useAppSelector(getConstructorState);
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: "burger-item",
    item: item,

    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const addIngredient = (e: React.SyntheticEvent<Element, Event>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addIngredientToConstructor(item));
  };

  // Подсчет кол-ва выбранных элементов
  const count = ingredients.filter((element) => item._id === element._id);

  return (
    <Link
      data-testid='burger_item_link'
      to={`/ingredients/${item._id}`}
      state={{ backgroundLocation: location }}
      className={cn(burgerItem.wrapper, isDragging && burgerItem.dragCard)}
      ref={dragRef}
    >
      <div className={burgerItem.container}>
        <div className={burgerItem.image_container}>
          <img ref={dragPreviewRef} src={item.image} alt={item.name} />
          {count.length !== 0 && <Counter count={count.length} size='default' extraClass='m-1' />}
          {bun && bun._id === item._id && <Counter count={2} size='default' extraClass='m-1' />}
        </div>
        <div className={burgerItem.price_container}>
          <p className={cn("text text_type_digits-default", burgerItem.digits)}>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={cn("text", isMobile ? "text_type_main-small" : "text_type_main-default")}>{item.name}</p>
        {isMobile && (
          <Button type='secondary' htmlType='button' size='small' onClick={(e) => addIngredient(e)}>
            Добавить
          </Button>
        )}
      </div>
    </Link>
  );
};

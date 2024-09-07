import type { IIngredient } from "@interfaces/ingredient";
import { SET_SELECTED_INGREDIENT } from "@services/actions/inrgedients";
import type { TRootReducerState } from "@services/reducers";
import type { TAppDispatch } from "@services/store";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import burgerItem from "./burger-item.module.css";

interface IBurgerItemProps {
  item: IIngredient;
}

export const BurgerItem = ({ item }: IBurgerItemProps) => {
  const dispatch = useDispatch<TAppDispatch>();
  const bun = useSelector((store: TRootReducerState) => store.constructorData.bun);
  const ingredients = useSelector((store: TRootReducerState) => store.constructorData.ingredients);

  const count = ingredients.filter((element) => item._id === element._id);

  const openModal = () => dispatch({ type: SET_SELECTED_INGREDIENT, ingredient: item });

  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: "burger-item",
    item: item,

    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

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

/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { IIngredient } from "@interfaces/ingredient";
import type { TRootReducerState } from "@services/reducers";
import type { TAppDispatch } from "@services/store";
import { addUuidToIngredient } from "@services/thunks/addUuidToIngredient";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";

// import { IngredientDetails } from "@components/ingredient-details";
// import { Modal } from "@components/modal";
import burgerItem from "./burger-item.module.css";

interface IBurgerItemProps {
  item: IIngredient;
}

export const BurgerItem = ({ item }: IBurgerItemProps) => {
  // const { isModal, closeModal } = useModal();

  const dispatch = useDispatch<TAppDispatch>();
  const bun = useSelector((store: TRootReducerState) => store.constructorData.bun);
  const ingredients = useSelector((store: TRootReducerState) => store.constructorData.ingredients);

  const count = ingredients.filter((element) => item._id === element._id);

  // @ts-expect-error
  const addIngredient = () => dispatch(addUuidToIngredient(item));

  return (
    <div className={burgerItem.wrapper}>
      {/* onClick={openModal} */}
      <div className={burgerItem.container} onClick={addIngredient}>
        <div className={burgerItem.image_container}>
          <img src={item.image} alt={item.name} />
          {count.length !== 0 && <Counter count={count.length} size='default' extraClass='m-1' />}
          {bun && bun._id === item._id && <Counter count={2} size='default' extraClass='m-1' />}
        </div>
        <div className={burgerItem.price_container}>
          <p className='text text_type_digits-default'>{item.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className='text text_type_main-default'>{item.name}</p>
      </div>
      {/* {isModal && (
        <Modal closeModal={closeModal} title='Детали ингредиента'>
          <IngredientDetails ingredient={item} />
        </Modal>
      )} */}
    </div>
  );
};

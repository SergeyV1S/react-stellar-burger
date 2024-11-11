import { getIngredientsState } from "@services/ingredient";
import { useAppSelector } from "@services/store";
import { useLocation, useParams } from "react-router-dom";

import { Spinner } from "@components/loader";

import currentOrderPageStyles from "./current-order.module.css";

export const CurrentOrderPage = () => {
  const {
    data,
    modal: { selectedIngredient }
  } = useAppSelector(getIngredientsState);
  const { state } = useLocation();

  const { orderId } = useParams();

  const currentItem = data ? data.filter((item) => item._id === orderId)[0] : selectedIngredient;

  return (
    <div className={state ? currentOrderPageStyles.modal_container : currentOrderPageStyles.page_conatiner}>
      {currentItem ? (
        <div className={currentOrderPageStyles.content}>
          <h1 className='text text_type_main-large'>Детали ингредиента</h1>
          <div className={currentOrderPageStyles.ingredients}>
            <img src={currentItem.image_large} alt={currentItem.name} />
            <p className='text text_type_main-medium mb-8'>{currentItem.name}</p>
            <div className={currentOrderPageStyles.compound_container}>
              <section className={currentOrderPageStyles.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Калории,ккал</p>
                <p className='text text_type_digits-default text_color_inactive'>{currentItem.calories}</p>
              </section>
              <section className={currentOrderPageStyles.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
                <p className='text text_type_digits-default text_color_inactive'>{currentItem.proteins}</p>
              </section>
              <section className={currentOrderPageStyles.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
                <p className='text text_type_digits-default text_color_inactive'>{currentItem.fat}</p>
              </section>
              <section className={currentOrderPageStyles.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
                <p className='text text_type_digits-default text_color_inactive'>{currentItem.carbohydrates}</p>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div className='spinner_wrapper'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

import { getIngredientsState } from "@services/ingredient";
import { useAppSelector } from "@services/store";
import "@src/index.css";
import { useLocation, useParams } from "react-router-dom";

import { Spinner } from "@components/loader";

import ingredientDetails from "./ingredient-details.module.css";

export const IngredientDetails = () => {
  const {
    data,
    modal: { selectedIngredient }
  } = useAppSelector(getIngredientsState);
  const { state } = useLocation();

  const { id } = useParams();

  const currentItem = data ? data.filter((item) => item._id === id)[0] : selectedIngredient;

  return (
    <div className={state ? ingredientDetails.modal_container : ingredientDetails.page_container}>
      {currentItem ? (
        <div className={ingredientDetails.content} data-testid='ingredient_details'>
          <h1 className='text text_type_main-large'>Детали ингредиента</h1>
          <div className={ingredientDetails.ingredients}>
            <img src={currentItem.image_large} alt={currentItem.name} />
            <p className='text text_type_main-medium mb-8' data-testid='ingredient_details_name'>
              {currentItem.name}
            </p>
            <div className={ingredientDetails.compound_container}>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Калории,ккал</p>
                <p
                  className='text text_type_digits-default text_color_inactive'
                  data-testid='ingredient_details_calories'
                >
                  {currentItem.calories}
                </p>
              </div>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
                <p
                  className='text text_type_digits-default text_color_inactive'
                  data-testid='ingredient_details_proteins'
                >
                  {currentItem.proteins}
                </p>
              </div>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
                <p className='text text_type_digits-default text_color_inactive' data-testid='ingredient_details_fat'>
                  {currentItem.fat}
                </p>
              </div>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
                <p
                  className='text text_type_digits-default text_color_inactive'
                  data-testid='ingredient_details_carbohydrates'
                >
                  {currentItem.carbohydrates}
                </p>
              </div>
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

import { getIngredientsState } from "@services/ingredient";
import { useAppSelector } from "@services/store";
import { useIsMobile } from "@src/context";
import "@src/index.css";
import { cn } from "@src/utils";
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
  const isMobile = useIsMobile();

  const currentItem = data ? data.filter((item) => item._id === id)[0] : selectedIngredient;

  return (
    <div className={state ? ingredientDetails.modal_container : ingredientDetails.page_container}>
      {currentItem ? (
        <div className={ingredientDetails.content} data-testid='ingredient_details'>
          <h1 className={cn("text", isMobile ? "text_type_main-medium" : "text_type_main-large")}>
            Детали ингредиента
          </h1>
          <div className={ingredientDetails.ingredients}>
            <img
              className={ingredientDetails.image}
              src={isMobile ? currentItem.image_mobile : currentItem.image_large}
              alt={currentItem.name}
            />
            <p
              className={cn("text mb-8", isMobile ? "text_type_main-default" : "text_type_main-medium")}
              data-testid='ingredient_details_name'
            >
              {currentItem.name}
            </p>
            <div className={ingredientDetails.compound_container}>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Калории,ккал</p>
                <p
                  className={cn(
                    "text text_color_inactive",
                    isMobile ? "text_type_main-small" : "text_type_main-default"
                  )}
                  data-testid='ingredient_details_calories'
                >
                  {currentItem.calories}
                </p>
              </div>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
                <p
                  className={cn(
                    "text text_color_inactive",
                    isMobile ? "text_type_main-small" : "text_type_main-default"
                  )}
                  data-testid='ingredient_details_proteins'
                >
                  {currentItem.proteins}
                </p>
              </div>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
                <p
                  className={cn(
                    "text text_color_inactive",
                    isMobile ? "text_type_main-small" : "text_type_main-default"
                  )}
                  data-testid='ingredient_details_fat'
                >
                  {currentItem.fat}
                </p>
              </div>
              <div className={ingredientDetails.compound_item}>
                <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
                <p
                  className={cn(
                    "text text_color_inactive",
                    isMobile ? "text_type_main-small" : "text_type_main-default"
                  )}
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

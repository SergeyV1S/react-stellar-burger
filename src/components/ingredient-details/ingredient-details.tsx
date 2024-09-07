import type { IIngredient } from "@interfaces/ingredient";

import ingredientDetails from "./ingredient-details.module.css";

interface IIngredientDetailsProps {
  ingredient: IIngredient | null;
}

export const IngredientDetails = ({ ingredient }: IIngredientDetailsProps) => (
  <div className={ingredientDetails.container}>
    {ingredient ? (
      <div className={ingredientDetails.content}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className='text text_type_main-medium'>{ingredient.name}</p>
        <div className={ingredientDetails.compound_container}>
          <div className={ingredientDetails.compound_item}>
            <p className='text text_type_main-small text_color_inactive'>Калории,ккал</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
          </div>
          <div className={ingredientDetails.compound_item}>
            <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
          </div>
          <div className={ingredientDetails.compound_item}>
            <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
          </div>
          <div className={ingredientDetails.compound_item}>
            <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className=''>Загрузка...</div>
    )}
  </div>
);

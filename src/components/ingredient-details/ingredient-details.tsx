import ingredientDetails from "./ingredient-details.module.css";

interface IIngredientDetailsProps {
  image_large: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export const IngredientDetails = ({
  image_large,
  name,
  calories,
  carbohydrates,
  fat,
  proteins
}: IIngredientDetailsProps) => (
  <div className={ingredientDetails.container}>
    <div className={ingredientDetails.content}>
      <img src={image_large} alt='Изображение ингредиента' />
      <p className='text text_type_main-medium'>{name}</p>
      <div className={ingredientDetails.compound_container}>
        <div className={ingredientDetails.compound_item}>
          <p className='text text_type_main-small text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
        </div>
        <div className={ingredientDetails.compound_item}>
          <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
        </div>
        <div className={ingredientDetails.compound_item}>
          <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
        </div>
        <div className={ingredientDetails.compound_item}>
          <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
        </div>
      </div>
    </div>
  </div>
);

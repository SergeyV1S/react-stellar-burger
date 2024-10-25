import type { IIngredient } from "@interfaces/ingredient";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import orderCardStyles from "./order-card.module.css";

interface IOrderCardProps {
  orderNumber: number;
  createdDate: string;
  orderName: string;
  totalCost: number;
  ingredients: (IIngredient | undefined)[];
}

export const OrderCard = ({ orderNumber, createdDate, orderName, totalCost, ingredients }: IOrderCardProps) => (
  <div className={orderCardStyles.wrapper}>
    <div className={`pt-6 pb-6 pl-6 pr-6 ${orderCardStyles.container}`}>
      <div className={orderCardStyles.number_date}>
        <p className='text text_type_digits-default'>{orderNumber}</p>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdDate)} />
      </div>
      <p className={`text text_type_main-medium text_color_primary mt-6 ${orderCardStyles.title}`}>{orderName}</p>
      <div className={orderCardStyles.ingredients_cost}>
        <div className={orderCardStyles.ingredients}>
          {ingredients.map(
            (ingredient) =>
              ingredient && (
                <div key={ingredient._id} className={orderCardStyles.imgae_wrapper}>
                  <img className={orderCardStyles.image} src={ingredient.image_mobile} alt={ingredient.name} />
                </div>
              )
          )}
        </div>
        <p className=''>{totalCost}</p>
      </div>
    </div>
  </div>
);

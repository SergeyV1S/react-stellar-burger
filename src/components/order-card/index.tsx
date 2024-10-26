import type { IIngredient } from "@interfaces/ingredient";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import orderCardStyles from "./order-card.module.css";

interface IOrderCardProps {
  orderNumber: number;
  createdDate: string;
  orderName: string;
  totalCost: number;
  isProfile: boolean;
  ingredients: (IIngredient | undefined)[];
  orderStatus: string;
}

export const OrderCard = ({
  orderNumber,
  createdDate,
  orderName,
  isProfile,
  totalCost,
  ingredients,
  orderStatus
}: IOrderCardProps) => (
  <div className={orderCardStyles.wrapper}>
    <div className={`p-6 ${orderCardStyles.container}`}>
      <div className={orderCardStyles.number_date}>
        <p className='text text_type_digits-default'>{orderNumber}</p>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdDate)} />
      </div>
      <div>
        <p className={`text text_type_main-medium text_color_primary ${orderCardStyles.title}`}>{orderName}</p>
        {isProfile && (
          <p
            className={`text text_type_main-default text_color_primary mt-2 ${orderStatus === "done" && orderCardStyles.done_order}`}
          >
            {orderStatus === "done" ? "Создан" : "Готовится"}
          </p>
        )}
      </div>
      <div className={orderCardStyles.ingredients_cost}>
        <div className={orderCardStyles.ingredients}>
          {ingredients.map(
            (ingredient) =>
              ingredient && (
                <div key={ingredient._id} className={orderCardStyles.image_wrapper}>
                  <img className={orderCardStyles.image} src={ingredient.image_mobile} alt={ingredient.name} />
                </div>
              )
          )}
        </div>
        <p className={`text text_type_digits-default ${orderCardStyles.cost}`}>
          {totalCost}
          <CurrencyIcon type='primary' />
        </p>
      </div>
    </div>
  </div>
);

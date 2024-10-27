import type { IIngredient } from "@interfaces/ingredient";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

import orderCardStyles from "./order-card.module.css";

interface IOrderCardProps {
  orderNumber: number;
  createdDate: string;
  orderName: string;
  totalCost: number;
  isProfile: boolean;
  ingredients: (IIngredient | undefined)[];
  orderStatus: string;
  path: string;
}

export const OrderCard = ({
  orderNumber,
  createdDate,
  orderName,
  isProfile,
  totalCost,
  ingredients,
  orderStatus,
  path
}: IOrderCardProps) => {
  const location = useLocation();

  return (
    <Link to={`${path}/${orderNumber}`} state={{ backgroundLocation: location }} className={orderCardStyles.wrapper}>
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
              (ingredient, index) =>
                ingredient && (
                  <div key={ingredient.uuid + index.toString()} className={orderCardStyles.image_wrapper}>
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
    </Link>
  );
};

import type { IIngredient } from "@interfaces/ingredient";
import type { EOrderStatus } from "@services/order-feed";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

import orderCardStyles from "./order-card.module.css";
import { translateOrderStatus } from "./utils/translateOrderStatus";

interface IOrderCardProps {
  number: number;
  createdAt: string;
  name: string;
  totalCost: number;
  isProfile: boolean;
  ingredientsData: IIngredient[];
  status: EOrderStatus;
  path: string;
}

export const OrderCard = ({
  number,
  createdAt,
  name,
  isProfile,
  totalCost,
  ingredientsData,
  status,
  path
}: IOrderCardProps) => {
  const location = useLocation();

  return (
    <Link to={`${path}/${number}`} state={{ backgroundLocation: location }} className={orderCardStyles.wrapper}>
      <div className={`p-6 ${orderCardStyles.container}`}>
        <div className={orderCardStyles.number_date}>
          <p className='text text_type_digits-default'>{number}</p>
          <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
        </div>
        <div>
          <p className={`text text_type_main-medium text_color_primary ${orderCardStyles.title}`}>{name}</p>
          {isProfile && (
            <p
              className={`text text_type_main-default text_color_primary mt-2 ${status === "done" && orderCardStyles.done_order}`}
            >
              {translateOrderStatus(status)}
            </p>
          )}
        </div>
        <div className={orderCardStyles.ingredients_cost}>
          <div className={orderCardStyles.ingredients}>
            {ingredientsData.slice(0, 6).map((ingredient, index) => (
              <div key={ingredient.uuid + index.toString()} className={orderCardStyles.image_wrapper}>
                <img
                  className={`${orderCardStyles.image} ${index === 5 && orderCardStyles.image_last}`}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                {index === 5 && (
                  <p className={`text text_type_digits-default ${orderCardStyles.last_image_counter}`}>
                    +{ingredientsData.length - 5}
                  </p>
                )}
              </div>
            ))}
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

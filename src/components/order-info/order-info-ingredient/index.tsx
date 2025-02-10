import { cn } from "@src/utils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import orderInfoIngredientStyles from "./order-info-ingredient.module.css";

interface IOrderInfoIngredientProps {
  image_mobile: string;
  name: string;
  price: number;
}

export const OrderInfoIngredient = ({ image_mobile, name, price }: IOrderInfoIngredientProps) => (
  <div className={orderInfoIngredientStyles.compound_item}>
    <div className={orderInfoIngredientStyles.image_wrapper}>
      <img className={orderInfoIngredientStyles.image} src={image_mobile} alt={name} />
    </div>
    <p className={cn(orderInfoIngredientStyles.body, "text text_type_main-default")}>{name}</p>
    <div className={cn("text text_type_digits-default", orderInfoIngredientStyles.price)}>
      <p>1 x {price}</p>
      <CurrencyIcon type='primary' />
    </div>
  </div>
);

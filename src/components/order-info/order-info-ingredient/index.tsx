import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import orderInfoIngredient from "./order-info-ingredient.module.css";

interface IOrderInfoIngredientProps {
  image_mobile: string;
  name: string;
  price: number;
}

export const OrderInfoIngredient = ({ image_mobile, name, price }: IOrderInfoIngredientProps) => (
  <div className={orderInfoIngredient.compound_item}>
    <div className={orderInfoIngredient.image_wrapper}>
      <img className={orderInfoIngredient.image} src={image_mobile} alt={name} />
    </div>
    <p className='text text_type_main-default'>{name}</p>
    <div className={`text text_type_digits-default ${orderInfoIngredient.price}`}>
      <p>1 x {price}</p>
      <CurrencyIcon type='primary' />
    </div>
  </div>
);

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import orderInfoStyles from "../order-info.module.css";
import orderInfoIngredient from "./order-info-ingredient.module.css";

export const OrderInfoIngredient = () => (
  <div className={orderInfoIngredient.compound_item}>
    <div className={orderInfoIngredient.image_wrapper}>
      {/* <img className={orderCardStyles.image} src={ingredient.image_mobile} alt={ingredient.name} /> */}
    </div>
    <p className='text text_type_main-default'>Филе</p>
    <div className={orderInfoStyles.price}>
      <p>1 x 300</p>
      <CurrencyIcon type='primary' />
    </div>
  </div>
);

import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import burgerItem from "./burger-item.module.css";

interface IBurgerItemProps {
  image: string;
  count: number;
  price: number;
  name: string;
}

export const BurgerItem = ({ count, image, name, price }: IBurgerItemProps) => (
  <div className={burgerItem.wrapper}>
    <div className={burgerItem.container}>
      <div className={burgerItem.image_container}>
        <img src={image} alt={name} />
        <Counter count={count} size='default' extraClass='m-1' />
      </div>
      <div className={burgerItem.price_container}>
        <p className='text text_type_digits-default'>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className='text text_type_main-default'>{name}</p>
    </div>
  </div>
);

import { data } from "@utils/data";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructor from "./burger-constructor.module.css";

const ingredients = data.filter((ingredient) => ingredient.type !== "bun");
const bun = data.filter((item) => item.type === "bun")[0];

export const BurgerConstructor = () => (
  <section className={burgerConstructor.wrapper}>
    <div className={burgerConstructor.burger_constructor_wrapper}>
      <div className={burgerConstructor.bun_wrapper}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={burgerConstructor.ingredients_wrapper}>
        {ingredients.map((ingredient) => (
          <div key={ingredient._id} className={burgerConstructor.ingredients_container}>
            <div className={burgerConstructor.drag_icon_wrapper}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ))}
      </div>
      <div className={burgerConstructor.bun_wrapper}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    </div>
    <div className={burgerConstructor.button_container}>
      <p className='text text_type_digits-medium'>
        610 <CurrencyIcon type='primary' />
      </p>
      <Button htmlType='button' type='primary' size='large'>
        Оформить заказ
      </Button>
    </div>
  </section>
);

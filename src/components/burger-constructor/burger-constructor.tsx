import { data } from "@utils/data";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructor from "./burger-constructor.module.css";

const ingredients = data.filter((ingredient) => ingredient.type !== "bun");
const buns = data.filter((item) => item.type === "bun");

export const BurgerConstructor = () => (
  <section style={{ marginTop: 100 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ paddingLeft: 32 }}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={buns[0].name + " (верх)"}
          price={buns[0].price}
          thumbnail={buns[0].image}
        />
      </div>
      <div className={burgerConstructor.ingredients}>
        {ingredients.map((ingredient) => (
          <div
            key={ingredient._id}
            style={{ paddingLeft: 32, paddingRight: 8, position: "relative" }}
          >
            <div style={{ position: "absolute", left: 0, top: "35%" }}>
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
      <div style={{ paddingLeft: 32 }}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={buns[1].name + " (низ)"}
          price={buns[1].price}
          thumbnail={buns[1].image}
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

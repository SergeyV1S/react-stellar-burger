import checkmark from "@images/checkmark.webp";

import orderDetails from "./order-details.module.css";

export const OrderDetails = () => (
  <div className={orderDetails.container}>
    <p className={"text text_type_digits-large " + orderDetails.digits}>034536</p>
    <p className='text text_type_main-medium'>идентификатор заказа</p>
    <img src={checkmark} alt='checkmark' />
    <div className={orderDetails.text_group}>
      <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-small text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  </div>
);

import type { TRootReducerState } from "@services/reducers";
import { useSelector } from "react-redux";

import checkmark from "@images/checkmark.webp";

import orderDetails from "./order-details.module.css";

export const OrderDetails = () => {
  const { error, order, isLoading } = useSelector((store: TRootReducerState) => store.order);

  return (
    <>
      {order && (
        <div className={orderDetails.container}>
          <p className={"text text_type_digits-large " + orderDetails.digits}>{order.order.number}</p>
          <p className='text text_type_main-medium'>идентификатор заказа</p>
          <img src={checkmark} alt='checkmark' />
          <div className={orderDetails.text_group}>
            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
          </div>
        </div>
      )}
      {isLoading && <div className='text'>Загрузка...</div>}
      {error && <div>{error}</div>}
    </>
  );
};

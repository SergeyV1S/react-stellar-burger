import { getOrderStore, toggleOrderModal } from "@services/order";
import { useAppDispatch, useAppSelector } from "@services/store";
import { getUserStore } from "@services/user";
import { useIsMobile } from "@src/context";
import { cn } from "@src/utils";
import { Navigate } from "react-router-dom";

import checkmark from "@images/checkmark.webp";

import { Spinner } from "@components/loader";

import orderDetails from "./order-details.module.css";

export const OrderDetails = () => {
  const { error, order, isLoading } = useAppSelector(getOrderStore);
  const { user } = useAppSelector(getUserStore);
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  if (error === "jwt expired" || !user.email) {
    dispatch(toggleOrderModal({ isOpen: false }));
    return <Navigate to='/login' />;
  }

  return (
    <>
      {order && (
        <div className={orderDetails.container} data-testid='order_modal'>
          <p
            className={cn("text", isMobile ? "text_type_digits-medium" : "text_type_digits-large", orderDetails.digits)}
            data-testid='order_modal_number'
          >
            {order.order.number}
          </p>
          <p className={cn("text", isMobile ? "text_type_main-small" : "text_type_main-medium")}>
            идентификатор заказа
          </p>
          <img src={checkmark} alt='checkmark' />
          <div className={orderDetails.text_group}>
            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
          </div>
        </div>
      )}
      {isLoading && (
        <div className={orderDetails.spinner_wrapper}>
          <Spinner />
        </div>
      )}
    </>
  );
};

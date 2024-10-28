/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useOrderList } from "@hooks/useOrderList";
import { getCurrentOrderAction } from "@services/order";
import { useAppDispatch, useAppSelector } from "@services/store";
import { translateOrderStatus } from "@utils/translateOrderStatus";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Spinner } from "../loader";
import { OrderInfoIngredient } from "./order-info-ingredient";
import orderInfoStyles from "./order-info.module.css";
import { findOrderData } from "./utils/findOrderData";

export const OrderInfo = () => {
  const { orderId } = useParams();
  const { state } = useLocation();

  const dispatch = useAppDispatch();
  const currentOrder = useAppSelector(findOrderData(+orderId!));

  useEffect(() => {
    if (!currentOrder) {
      dispatch(getCurrentOrderAction(+orderId!));
    }
  }, []);

  const { getIngredientFromMap, countTotalOrderCost } = useOrderList();
  const orderIngredients = currentOrder && getIngredientFromMap(currentOrder.ingredients);

  return (
    <div className={state ? orderInfoStyles.modal_container : orderInfoStyles.page_conatiner}>
      {currentOrder ? (
        <div className={orderInfoStyles.content}>
          <p className={`text text_type_digits-default ${orderInfoStyles.order_number}`}>#{currentOrder.number}</p>
          <div className={orderInfoStyles.info}>
            <h1 className='text text_type_main-medium'>{currentOrder.name}</h1>
            <p
              className={`text text_type_main-default ${currentOrder.status === "done" && orderInfoStyles.done_order}`}
            >
              {translateOrderStatus(currentOrder.status)}
            </p>
          </div>
          <div className={orderInfoStyles.compound_container}>
            <p className='text text_type_main-medium mb-6'>Состав:</p>
            <div className={orderInfoStyles.ingredients_container}>
              {orderIngredients &&
                orderIngredients.map((orderIngredient, index) => (
                  <OrderInfoIngredient key={orderIngredient + index.toString()} {...orderIngredient} />
                ))}
            </div>
          </div>
          <div className={orderInfoStyles.footer}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(currentOrder.updatedAt)} />
            </p>
            <p className={`text text_type_digits-medium ${orderInfoStyles.price}`}>
              <span>{countTotalOrderCost(currentOrder.ingredients)}</span>
              <CurrencyIcon type='primary' />
            </p>
          </div>
        </div>
      ) : (
        <div className='spinner_wrapper'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

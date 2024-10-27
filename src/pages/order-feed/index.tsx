import { EWsStatuses, getOrderWsStatus, wsConnectAction } from "@services/order-feed";
import { getRibbonOrders } from "@services/order-feed";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect } from "react";

import { Spinner } from "@components/loader";
import { OrderList } from "@components/order-list";

import orderFeedStyles from "./order-feed.module.css";

export const OrderFeedPage = () => {
  const dispatch = useAppDispatch();
  const orderRibbon = useAppSelector(getRibbonOrders);
  const wsStatus = useAppSelector(getOrderWsStatus);

  useEffect(() => {
    dispatch(wsConnectAction(`${import.meta.env.BASE_WS_URL}/orders/all`));
  }, []);

  return (
    <div className={orderFeedStyles.wrapper}>
      <h1 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h1>
      {wsStatus === EWsStatuses.OPEN && orderRibbon ? (
        <div className={orderFeedStyles.container}>
          <section className={orderFeedStyles.orderlist_wrapper}>
            <OrderList orderRibbon={orderRibbon} path='/order-feed' />
          </section>
          <section className={orderFeedStyles.order_ribbon}>
            <div className={orderFeedStyles.order_statuses}>
              <div>
                <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                <div className={orderFeedStyles.status_column}>
                  {orderRibbon &&
                    orderRibbon.orders
                      .filter((orderForFilter) => orderForFilter.status === "done")
                      .slice(0, 10)
                      .map((order) => (
                        <p className={`text text_type_digits-default ${orderFeedStyles.done_orders}`} key={order._id}>
                          {order.number}
                        </p>
                      ))}
                </div>
              </div>
              <div>
                <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                <div className={orderFeedStyles.status_column}>
                  {orderRibbon &&
                    orderRibbon.orders
                      .filter((orderForFilter) => orderForFilter.status !== "done")
                      .map((order) => (
                        <p className='text text_type_digits-default' key={order._id}>
                          {order.number}
                        </p>
                      ))}
                </div>
              </div>
            </div>
            <div className=''>
              <h3 className='text text_type_main-medium'>Выполнено за все время: </h3>
              <p className={`text text_type_digits-large ${orderFeedStyles.digits}`}>{orderRibbon.total}</p>
            </div>
            <div className=''>
              <h3 className='text text_type_main-medium'>Выполнено за сегодня: </h3>
              <p className={`text text_type_digits-large ${orderFeedStyles.digits}`}>{orderRibbon.totalToday}</p>
            </div>
          </section>
        </div>
      ) : (
        <div className='spinner_wrapper'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

import {
  EWsStatuses,
  getFeedOrderWsStatus,
  wsOrderFeedConnectAction,
  wsOrderFeedDisconnectAction
} from "@services/order-feed";
import { getFeedRibbonOrders } from "@services/order-feed";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useIsMobile } from "@src/context";
import { cn } from "@src/utils";
import { useEffect } from "react";

import { Spinner } from "@components/loader";
import { OrderList } from "@components/order-list";

import { OrderFeedMobile } from "./components";
import { FeedStatistic } from "./components/statistic";
import orderFeedStyles from "./order-feed.module.css";

export const OrderFeedPage = () => {
  const dispatch = useAppDispatch();
  const orderRibbon = useAppSelector(getFeedRibbonOrders);
  const wsStatus = useAppSelector(getFeedOrderWsStatus);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(wsOrderFeedConnectAction(`${process.env.BASE_WS_URL}/orders/all`));

    return () => {
      dispatch(wsOrderFeedDisconnectAction());
    };
  }, []);

  return (
    <div className={orderFeedStyles.wrapper}>
      <h1 className={cn(orderFeedStyles.heading, "text text_type_main-large")}>Лента заказов</h1>
      {wsStatus === EWsStatuses.OPEN && orderRibbon ? (
        isMobile ? (
          <OrderFeedMobile orderRibbon={orderRibbon} />
        ) : (
          <div className={orderFeedStyles.container}>
            <section className={orderFeedStyles.orderlist_wrapper}>
              <OrderList orders={orderRibbon.orders} path='/order-feed' />
            </section>
            <FeedStatistic orderRibbon={orderRibbon} isMobile={isMobile} />
          </div>
        )
      ) : (
        <div className='spinner_wrapper'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

import { EWsStatuses } from "@services/order-feed";
import {
  getProfileOrderWsStatus,
  getProfileRibbonOrders,
  wsProfileOrderConnectAction,
  wsProfileOrderDisconnectAction
} from "@services/profile-order";
import { useAppDispatch, useAppSelector } from "@services/store";
import { Spinner } from "@src/components/loader";
import { useEffect } from "react";

import { OrderList } from "@components/order-list";

import orderHistoryStyles from "./order-history.module.css";

export const OrderHistoryPage = () => {
  const dispatch = useAppDispatch();
  const orderRibbon = useAppSelector(getProfileRibbonOrders);
  const wsStatus = useAppSelector(getProfileOrderWsStatus);

  useEffect(() => {
    dispatch(
      wsProfileOrderConnectAction(`${import.meta.env.BASE_WS_URL}/orders?token=${localStorage.getItem("access-token")}`)
    );

    return () => {
      dispatch(wsProfileOrderDisconnectAction());
    };
  }, []);

  return (
    <section className={orderHistoryStyles.wrapper}>
      <div className={orderHistoryStyles.container}>
        {wsStatus === EWsStatuses.OPEN && orderRibbon ? (
          <OrderList path='/profile/orders' orderRibbon={orderRibbon} />
        ) : (
          <div className='spinner_wrapper'>
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
};

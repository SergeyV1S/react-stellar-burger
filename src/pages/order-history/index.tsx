import { OrderList } from "@components/order-list";

import orderHistoryStyles from "./order-history.module.css";

export const OrderHistoryPage = () => (
  <section className={orderHistoryStyles.wrapper}>
    <div className={orderHistoryStyles.container}>
      <OrderList />
    </div>
  </section>
);

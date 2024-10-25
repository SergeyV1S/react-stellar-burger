import { OrderList } from "@components/order-list";

import orderHistoryStyles from "./order-history.module.css";

export const OrderHistoryPage = () => (
  <section className={orderHistoryStyles.container}>
    <OrderList />
  </section>
);

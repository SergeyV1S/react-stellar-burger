import { useOrderList } from "@hooks/useOrderList";
import type { IFeedOrderData } from "@interfaces/order";
import { useMatch } from "react-router-dom";

import { OrderCard } from "../order-card";
import orderListStyles from "./order-list.module.css";

interface IOrderListProps {
  path: string;
  orders: IFeedOrderData[];
}

export const OrderList = ({ path, orders }: IOrderListProps) => {
  const { getIngredientFromMap, countTotalOrderCost } = useOrderList();
  const match = useMatch("/profile/orders");

  return (
    <div className={orderListStyles.container}>
      {orders.map((order) => (
        <OrderCard
          path={path}
          key={order.number}
          isProfile={!!match}
          totalCost={countTotalOrderCost(order.ingredients)}
          ingredientsData={getIngredientFromMap(order.ingredients)}
          {...order}
        />
      ))}
    </div>
  );
};

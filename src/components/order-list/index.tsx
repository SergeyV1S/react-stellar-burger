import { useOrderList } from "@hooks/useOrderList";
import type { IFeedRibbonDataResponse } from "@services/order-feed";
import { useMatch } from "react-router-dom";

import { OrderCard } from "../order-card";
import orderListStyles from "./order-list.module.css";

interface IOrderListProps {
  path: string;
  orderRibbon: IFeedRibbonDataResponse | null;
}

export const OrderList = ({ path, orderRibbon }: IOrderListProps) => {
  const { getIngredientFromMap, countTotalOrderCost } = useOrderList();
  const match = useMatch("/profile/orders");

  return (
    <div className={orderListStyles.container}>
      {orderRibbon &&
        orderRibbon.orders.map((order) => (
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

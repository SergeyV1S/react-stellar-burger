import { useSelectIngredientsByUid } from "@hooks/useSelectIngredientsByUid";
import type { IRibbonDataResponse } from "@services/order-feed";
import { useMatch } from "react-router-dom";

import { OrderCard } from "../order-card";
import orderListStyles from "./order-list.module.css";

interface IOrderListProps {
  path: string;
  orderRibbon: IRibbonDataResponse | null;
}

export const OrderList = ({ path, orderRibbon }: IOrderListProps) => {
  const { getIngredientFromMap } = useSelectIngredientsByUid();
  const match = useMatch("/profile/orders");

  return (
    <div className={orderListStyles.container}>
      {orderRibbon &&
        orderRibbon.orders.map((order) => (
          <OrderCard
            path={path}
            key={order.number}
            orderNumber={order.number}
            orderStatus={order.status}
            createdDate={order.createdAt}
            orderName={order.name}
            isProfile={!!match}
            totalCost={0}
            ingredients={getIngredientFromMap(order.ingredients)}
          />
        ))}
    </div>
  );
};

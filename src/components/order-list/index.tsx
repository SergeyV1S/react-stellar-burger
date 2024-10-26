import { useSelectIngredientsByUid } from "@hooks/useSelectIngredientsByUid";
import { useMatch } from "react-router-dom";

import { OrderCard } from "../order-card";
import orderListStyles from "./order-list.module.css";

interface IOrderListProps {
  path: string;
}

export const OrderList = ({ path }: IOrderListProps) => {
  const data = {
    success: true,
    orders: [
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa0942"
        ],
        _id: "1",
        status: "done",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      },
      {
        ingredients: [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0941",
          "643d69a5c3f7b9001cfa093e",
          "643d69a5c3f7b9001cfa0942"
        ],
        _id: "d",
        status: "done",
        number: 2,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      }
    ],
    total: 1,
    totalToday: 1
  };

  const { getIngredientFromMap } = useSelectIngredientsByUid();
  const match = useMatch("/profile/orders");

  return (
    <div className={orderListStyles.container}>
      {data.orders.map((order) => (
        <OrderCard
          path={path}
          key={order.number}
          orderNumber={order.number}
          orderStatus={order.status}
          createdDate={order.createdAt}
          orderName={"бургер"}
          isProfile={!!match}
          totalCost={0}
          ingredients={getIngredientFromMap(order.ingredients)}
        />
      ))}
    </div>
  );
};

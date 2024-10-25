import { useSelectIngredientsByUid } from "@hooks/useSelectIngredientsByUid";

import { OrderCard } from "../order-card";
import orderListStyles from "./order-list.module.css";

export const OrderList = () => {
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
        _id: "",
        status: "done",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      }
    ],
    total: 1,
    totalToday: 1
  };

  const { getIngredientFromMap } = useSelectIngredientsByUid();

  return (
    <div className={orderListStyles.wrapper}>
      <div className={orderListStyles.container}>
        {data.orders.map((order) => (
          <OrderCard
            key={order.number}
            orderNumber={order.number}
            createdDate={order.createdAt}
            orderName={"бургер"}
            totalCost={0}
            ingredients={getIngredientFromMap(order.ingredients)}
          />
        ))}
      </div>
    </div>
  );
};

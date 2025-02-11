import type { IFeedRibbonDataResponse } from "@services/order-feed";
import { cn } from "@src/utils";

import orderStatisticStyles from "./order-statistic.module.css";

interface IFeedStatisticProps {
  orderRibbon: IFeedRibbonDataResponse;
  isMobile: boolean;
}

export const FeedStatistic = ({ orderRibbon, isMobile }: IFeedStatisticProps) => (
  <section className={orderStatisticStyles.order_ribbon}>
    <div className={orderStatisticStyles.order_statuses}>
      <div>
        <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
        <div className={orderStatisticStyles.status_column}>
          {orderRibbon &&
            orderRibbon.orders
              .filter((orderForFilter) => orderForFilter.status === "done")
              .slice(0, 10)
              .map((order) => (
                <p className={cn("text text_type_digits-default", orderStatisticStyles.done_orders)} key={order._id}>
                  {order.number}
                </p>
              ))}
        </div>
      </div>
      <div>
        <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
        <div className={orderStatisticStyles.status_column}>
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
    <div>
      <h3 className={isMobile ? "text text_type_main-medium" : "text text_type_main-medium"}>
        Выполнено за все время:{" "}
      </h3>
      <p
        className={cn(
          "text",
          isMobile ? "text_type_digits-medium" : "text_type_digits-large",
          orderStatisticStyles.digits
        )}
      >
        {orderRibbon.total}
      </p>
    </div>
    <div>
      <h3 className={isMobile ? "text text_type_main-medium" : "text text_type_main-medium"}>Выполнено за сегодня: </h3>
      <p
        className={cn(
          "text",
          isMobile ? "text_type_digits-medium" : "text_type_digits-large",
          orderStatisticStyles.digits
        )}
      >
        {orderRibbon.totalToday}
      </p>
    </div>
  </section>
);

import type { IFeedRibbonDataResponse } from "@services/order-feed";
import { useIsMobile } from "@src/context";
import { cn } from "@utils/index";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import { OrderList } from "@components/order-list";

import { FeedStatistic } from "../statistic";
import orderFeedMobileStyles from "./order-feed-mobile.module.css";

interface IOrderFeedMobileProps {
  orderRibbon: IFeedRibbonDataResponse;
}

export const OrderFeedMobile = ({ orderRibbon }: IOrderFeedMobileProps) => {
  const [pageContent, setPageContent] = useState("feed");
  const isMobile = useIsMobile();

  return (
    <>
      <nav className={orderFeedMobileStyles.navigation}>
        <Button
          htmlType='button'
          onClick={() => setPageContent("feed")}
          extraClass={cn(orderFeedMobileStyles.button, pageContent === "feed" && orderFeedMobileStyles.button_active)}
          type='secondary'
        >
          Заказы
        </Button>
        <Button
          htmlType='button'
          onClick={() => setPageContent("stat")}
          extraClass={cn(orderFeedMobileStyles.button, pageContent === "stat" && orderFeedMobileStyles.button_active)}
          type='secondary'
        >
          Статистика
        </Button>
      </nav>
      <section className='mt-10 ml-5 mr-5'>
        {pageContent === "stat" ? (
          <FeedStatistic orderRibbon={orderRibbon} isMobile={isMobile} />
        ) : (
          <OrderList orders={orderRibbon.orders} path='/order-feed' />
        )}
      </section>
    </>
  );
};

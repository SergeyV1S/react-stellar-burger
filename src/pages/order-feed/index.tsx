import { OrderList } from "@components/order-list";

import orderFeedStyles from "./order-feed.module.css";

const numberOrder = ["032533", "034433", "034513", "134533", "234533", "434533", "034533"];

export const OrderFeedPage = () => (
  <div className={orderFeedStyles.wrapper}>
    <h1 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h1>
    <div className={orderFeedStyles.container}>
      <section className={orderFeedStyles.orderlist_wrapper}>
        <OrderList />
      </section>
      <section className={orderFeedStyles.order_ribbon}>
        <div className={orderFeedStyles.order_statuses}>
          <div>
            <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
            <div className={orderFeedStyles.status_column}>
              {numberOrder.map((value) => (
                <p className={`text text_type_digits-default ${orderFeedStyles.done_orders}`} key={value}>
                  {value}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
            <div className={orderFeedStyles.status_column}>
              {numberOrder.map((value) => (
                <p className={`text text_type_digits-default`} key={value}>
                  {value}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className=''>
          <h3 className='text text_type_main-medium'>Выполнено за все время: </h3>
          <p className={`text text_type_digits-large ${orderFeedStyles.digits}`}>28 752</p>
        </div>
        <div className=''>
          <h3 className='text text_type_main-medium'>Выполнено за сегодня: </h3>
          <p className={`text text_type_digits-large ${orderFeedStyles.digits}`}>138</p>
        </div>
      </section>
    </div>
    {/* {isSelectedIngredientModalOpen && (
      <Modal>
        <IngredientDetails />
      </Modal>
    )} */}
  </div>
);

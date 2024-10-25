import { OrderList } from "@components/order-list";

import orderFeedStyles from "./order-feed.module.css";

export const OrderFeedPage = () => (
  <section className={orderFeedStyles.container}>
    <h1 className='text text_type_main-large'>Соберите бургер</h1>
    <OrderList />
    {/* {isSelectedIngredientModalOpen && (
      <Modal>
        <IngredientDetails />
      </Modal>
    )} */}
  </section>
);

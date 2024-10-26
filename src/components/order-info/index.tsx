import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom";

import { OrderInfoIngredient } from "./order-info-ingredient";
import orderInfoStyles from "./order-info.module.css";

export const OrderInfo = () => {
  // const {
  //     data,
  //     modal: { selectedIngredient }
  //   } = useAppSelector(getIngredientsState);
  const { state } = useLocation();

  // const { id } = useParams();

  // const currentItem = data ? data.filter((item) => item._id === id)[0] : selectedIngredient;

  return (
    <div className={state ? orderInfoStyles.modal_container : orderInfoStyles.page_conatiner}>
      <div className={orderInfoStyles.content}>
        <p className='text text_type_digits-default'>#034533</p>
        <div className={orderInfoStyles.info}>
          <h1 className='text text_type_main-medium'>Black Hole Singularity острый бургер</h1>
          <p className='text text_type_main-default'>Выполнен</p>
        </div>
        <div className={orderInfoStyles.compound_container}>
          <p className='text text_type_main-medium mb-2'>Состав:</p>
          <OrderInfoIngredient />
        </div>
        <div className={orderInfoStyles.footer}>
          <p className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date()} />
          </p>
          <p className={`text text_type_digits-medium ${orderInfoStyles.price}`}>
            <span>510</span>
            <CurrencyIcon type='primary' />
          </p>
        </div>
      </div>
      {/* ) : (
        <div className='spinner_wrapper'>
          <Spinner />
        </div>
      )} */}
    </div>
  );
};

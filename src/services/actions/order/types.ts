import type { IOrder } from "@services/reducers/order/types";

import type { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, TOGGLE_ORDER_MODAL } from ".";

export interface IGetOrderAction {
  type: typeof GET_ORDER;
}

export interface IGetOrderSuccessAction {
  type: typeof GET_ORDER_SUCCESS;
  order: IOrder;
}

export interface IGetOrderFailedAction {
  type: typeof GET_ORDER_FAILED;
  error: string;
}

export interface IToggleOrderModalAction {
  type: typeof TOGGLE_ORDER_MODAL;
  isOpen: boolean;
}

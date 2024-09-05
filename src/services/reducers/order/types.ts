import type {
  IGetOrderAction,
  IGetOrderFailedAction,
  IGetOrderSuccessAction,
  IToggleOrderModalAction
} from "@services/actions/order/types";

export interface IOrderInitialState {
  order: IOrder | null;
  error: string;
  isOrderModalOpen: boolean;
  isLoading: boolean;
}

export interface IOrder {
  name: string;
  order: {
    number: number;
  };
}

export type TOrderActions = IGetOrderAction | IGetOrderSuccessAction | IGetOrderFailedAction | IToggleOrderModalAction;

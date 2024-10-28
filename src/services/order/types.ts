import type { IFeedOrderData, IOrder } from "@interfaces/order";

export interface IOrderInitialState {
  order: IOrder | null;
  currentOrder: IFeedOrderData | null;
  error: string | undefined;
  isOrderModalOpen: boolean;
  isLoading: boolean;
}

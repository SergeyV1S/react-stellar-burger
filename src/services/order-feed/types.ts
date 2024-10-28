import type { IFeedOrderData } from "@interfaces/order";

export interface IFeedRibbonDataResponse {
  success: true;
  orders: IFeedOrderData[];
  total: number;
  totalToday: number;
}

export enum EWsFeedStatuses {
  OPEN = "OPEN",
  CONNECTING = "CONNECTING",
  CLOSED = "CLOSED"
}

export interface IInitialState {
  ribbonData: IFeedRibbonDataResponse | null;
  error: string | null;
  wsStatus: EWsFeedStatuses;
}

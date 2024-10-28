import type { IFeedOrderData } from "@interfaces/order";

export interface IRibbonProfileOrderDataResponse {
  success: true;
  orders: IFeedOrderData[];
  total: number;
  totalToday: number;
}

export enum EProfileOrderWsStatuses {
  OPEN = "OPEN",
  CONNECTING = "CONNECTING",
  CLOSED = "CLOSED"
}

export interface IProfileRibbonInitialState {
  profileRibbonData: IRibbonProfileOrderDataResponse | null;
  error: string | null;
  profileRibbonWsStatus: EProfileOrderWsStatuses;
}

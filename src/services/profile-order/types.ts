import type { EOrderStatus } from "../order-feed";

export interface IRibbonProfileOrderDataResponse {
  success: true;
  orders: IRibbonProfileOrderData[];
  total: number;
  totalToday: number;
}

export interface IRibbonProfileOrderData {
  ingredients: string[];
  _id: string;
  status: EOrderStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
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

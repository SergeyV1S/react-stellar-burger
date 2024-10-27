export interface IRibbonDataResponse {
  success: true;
  orders: IRibbonOrderData[];
  total: number;
  totalToday: number;
}

export interface IRibbonOrderData {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export enum EWsStatuses {
  OPEN = "OPEN",
  CONNECTING = "CONNECTING",
  CLOSED = "CLOSED"
}

export interface IInitialState {
  ribbonData: IRibbonDataResponse | null;
  error: string | null;
  wsStatus: EWsStatuses;
}

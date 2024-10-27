export interface IFeedRibbonDataResponse {
  success: true;
  orders: IFeedRibbonOrderData[];
  total: number;
  totalToday: number;
}

export interface IFeedRibbonOrderData {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
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

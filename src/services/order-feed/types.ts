export interface IFeedRibbonDataResponse {
  success: true;
  orders: IFeedRibbonOrderData[];
  total: number;
  totalToday: number;
}

export enum EOrderStatus {
  created = "created",
  pending = "pending",
  done = "done"
}

export interface IFeedRibbonOrderData {
  ingredients: string[];
  _id: string;
  status: EOrderStatus;
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

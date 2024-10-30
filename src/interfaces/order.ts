import type { IOrderOwner } from "./user";

export interface IOrder {
  name: string;
  order: IFeedOrderData;
}

export interface IOrderWithOwner extends IFeedOrderData {
  owner: IOrderOwner;
}

export enum EOrderStatus {
  created = "created",
  pending = "pending",
  done = "done"
}

export interface IFeedOrderData {
  ingredients: string[];
  _id: string;
  status: EOrderStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

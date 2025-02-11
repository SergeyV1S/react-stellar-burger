import type { IFeedOrderData } from "@interfaces/order";
import { checkReponse } from "@utils/index";

export interface IGetCurrentOrderResponse {
  success: boolean;
  orders: IFeedOrderData[];
}

export const getCurrentOrderQuery = async (orderNumber: number) =>
  await fetch(`${process.env.BASE_API_URL}/orders/${orderNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkReponse)
    .then((res: IGetCurrentOrderResponse) => res.orders)
    .catch((err) => Promise.reject(err));

import type { IFeedOrderData } from "@interfaces/order";
import { checkReponse } from "@utils/checkResponse";

export interface IGetCurrentOrderResponse {
  success: boolean;
  orders: IFeedOrderData[];
}

export const getCurrentOrderQuery = async (orderNumber: number) =>
  await fetch(`${import.meta.env.BASE_API_URL}/orders/${orderNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkReponse)
    .then((res: IGetCurrentOrderResponse) => res)
    .catch((err) => Promise.reject(err));

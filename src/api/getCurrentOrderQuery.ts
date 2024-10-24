import { fetchWithRefresh } from "../utils/fetchWithRefresh";

export interface IGetCurrentOrderResponse {
  success: boolean;
}

export const getCurrentOrderQuery = async (orderID: string) =>
  await fetchWithRefresh(`${import.meta.env.BASE_API_URL}/orders/${orderID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res): Promise<IGetCurrentOrderResponse> => res)
    .catch((err) => Promise.reject(err));

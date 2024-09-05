import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "@services/actions/order";
import type { TOrderActions } from "@services/reducers/order/types";
import type { Dispatch } from "react";

interface IOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const postOrder = (idArr: string[]) => async (dispatch: Dispatch<TOrderActions>) => {
  dispatch({ type: GET_ORDER });
  await fetch(import.meta.env.VITE_API_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients: idArr
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((jsonRes: IOrderResponse) =>
      dispatch({ type: GET_ORDER_SUCCESS, order: { name: jsonRes.name, order: jsonRes.order } })
    )
    .catch((err: Error) => dispatch({ type: GET_ORDER_FAILED, error: typeof err === "string" ? err : err.message }));
};

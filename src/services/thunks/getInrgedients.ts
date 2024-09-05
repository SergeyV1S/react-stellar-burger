import type { IIngredient } from "@interfaces/ingredient";
import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "@services/actions/inrgedients";
import type { TIngredientActions } from "@services/reducers/ingredient/types";
import type { Dispatch } from "react";

interface IInrgedientsResponse {
  data: IIngredient[];
  success: boolean;
}

export const getInrgedients = () => async (dispatch: Dispatch<TIngredientActions>) => {
  dispatch({ type: GET_INGREDIENTS });
  await fetch(import.meta.env.VITE_API_URL + "/ingredients")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((jsonRes: IInrgedientsResponse) => dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: jsonRes.data }))
    .catch((err: Error) =>
      dispatch({ type: GET_INGREDIENTS_FAILED, error: typeof err === "string" ? err : err.message })
    );
};

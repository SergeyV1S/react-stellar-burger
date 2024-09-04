import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
} from "@services/actions/inrgedients/ingredient";

export const getInrgedients = () => (dispatch: any) => {
  dispatch({ type: GET_INGREDIENTS });
  fetch(import.meta.env.VITE_API_URL + "/ingredients")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((jsonRes) => dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: jsonRes.data }))
    .catch((err: Error) =>
      dispatch({ type: GET_INGREDIENTS_FAILED, error: typeof err === "string" ? err : err.message })
    );
};

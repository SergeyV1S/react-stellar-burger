import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS
} from "@services/actions/inrgedients/ingredient";

import type { IIngredientInitialState, TIngredientActions } from "./types";

const initialState: IIngredientInitialState = {
  data: [],
  error: "",
  isSuccess: false,
  isError: false,
  isLoading: false
};

export const ingredietReducer = (state = initialState, action: TIngredientActions): IIngredientInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.ingredients,
        isLoading: false,
        isSuccess: true
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isError: true
      };
    default: {
      return state;
    }
  }
};

import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  SET_SELECTED_INGREDIENT,
  TOGGLE_SELECTED_INGREDIENT_MODAL
} from "@services/actions/inrgedients";

import type { IIngredientInitialState, TIngredientActions } from "./types";

const initialState: IIngredientInitialState = {
  data: [],
  selectedIngredient: null,
  error: "",
  isSuccess: false,
  isLoading: false,
  isSelectedIngredientModalOpen: false
};

export const ingredietReducer = (state = initialState, action: TIngredientActions): IIngredientInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        error: ""
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
        isLoading: false
      };
    case SET_SELECTED_INGREDIENT:
      return {
        ...state,
        isSelectedIngredientModalOpen: true,
        selectedIngredient: action.ingredient
      };
    case TOGGLE_SELECTED_INGREDIENT_MODAL:
      return {
        ...state,
        isSelectedIngredientModalOpen: action.isOpen
      };
    default: {
      return state;
    }
  }
};

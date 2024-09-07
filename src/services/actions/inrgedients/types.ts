import type { IIngredient } from "@interfaces/ingredient";

import type {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  SET_SELECTED_INGREDIENT,
  TOGGLE_SELECTED_INGREDIENT_MODAL
} from ".";

export interface IGetInrgedientsAction {
  type: typeof GET_INGREDIENTS;
}

export interface IGetInrgedientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: IIngredient[];
}

export interface IGetInrgedientsFailedAction {
  type: typeof GET_INGREDIENTS_FAILED;
  error: Error | string;
}

export interface ISetSelectedIngredientAction {
  type: typeof SET_SELECTED_INGREDIENT;
  ingredient: IIngredient;
}

export interface IToggleSelectedIngredientModalAction {
  type: typeof TOGGLE_SELECTED_INGREDIENT_MODAL;
  isOpen: boolean;
}

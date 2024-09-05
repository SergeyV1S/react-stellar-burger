import type { IIngredient } from "@interfaces/ingredient";

import type { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from ".";

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

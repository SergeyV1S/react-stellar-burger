import type { IIngredient } from "@interfaces/ingredient";
import { ADD_INGREDIENT_TO_CONSTRUCTOR } from "@services/actions/consructor";
import type { TConstructorActions } from "@services/reducers/constructor/types";
import uuid from "react-uuid";
import type { Dispatch } from "redux";

export const addUuidToIngredient = (selectedIngredient: IIngredient) => (dispatch: Dispatch<TConstructorActions>) => {
  const uuindItem = { ...selectedIngredient, uuid: uuid() };
  dispatch({ type: ADD_INGREDIENT_TO_CONSTRUCTOR, ingredient: uuindItem });
};

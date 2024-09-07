import type { IIngredient } from "@interfaces/ingredient";

import type { ADD_INGREDIENT_TO_CONSTRUCTOR, MOVE_ITEM, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from ".";

export interface IAddInregientToConstructorAction {
  type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  ingredient: IIngredient;
}

export interface IRemoveInregientToConstructorAction {
  type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  ingredient: IIngredient;
}

export interface IMoveItemAction {
  type: typeof MOVE_ITEM;
  payload: { dragIndex: number; hoverIndex: number };
}

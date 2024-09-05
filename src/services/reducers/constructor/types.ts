import type { IIngredient } from "@interfaces/ingredient";
import type {
  IAddInregientToConstructorAction,
  IMoveItemAction,
  IRemoveInregientToConstructorAction
} from "@services/actions/consructor/types";

export interface IConstructorInitialState {
  bun: null | IIngredient;
  ingredients: IIngredient[];
}

export type TConstructorActions =
  | IAddInregientToConstructorAction
  | IRemoveInregientToConstructorAction
  | IMoveItemAction;

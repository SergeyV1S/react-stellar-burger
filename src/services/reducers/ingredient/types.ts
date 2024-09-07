import type { IIngredient } from "@interfaces/ingredient";
import type {
  IGetInrgedientsAction,
  IGetInrgedientsFailedAction,
  IGetInrgedientsSuccessAction,
  ISetSelectedIngredientAction,
  IToggleSelectedIngredientModalAction
} from "@services/actions/inrgedients/types";

export interface IIngredientInitialState {
  isSelectedIngredientModalOpen: boolean;
  selectedIngredient: null | IIngredient;
  data: null | IIngredient[];
  error: string | Error;
  isSuccess: boolean;
  isLoading: boolean;
}

export type TIngredientActions =
  | IGetInrgedientsAction
  | IGetInrgedientsSuccessAction
  | IGetInrgedientsFailedAction
  | ISetSelectedIngredientAction
  | IToggleSelectedIngredientModalAction;

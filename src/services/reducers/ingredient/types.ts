import type { IIngredient } from "@interfaces/ingredient";
import type {
  IGetInrgedientsAction,
  IGetInrgedientsFailedAction,
  IGetInrgedientsSuccessAction
} from "@services/actions/inrgedients/types";

export interface IIngredientInitialState {
  data: null | IIngredient[];
  error: string | Error;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

export type TIngredientActions = IGetInrgedientsAction | IGetInrgedientsSuccessAction | IGetInrgedientsFailedAction;

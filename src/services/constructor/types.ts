import type { IIngredient } from "@interfaces/ingredient"

export interface IConstructorInitialState {
  bun: null | IIngredient
  ingredients: IIngredient[]
}

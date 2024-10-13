import type { IIngredient } from "@interfaces/ingredient"

export interface IIngredientInitialState {
  modal: {
    isSelectedIngredientModalOpen: boolean
    selectedIngredient: null | IIngredient
  }
  data: IIngredient[]
  error: string | undefined
  isLoading: boolean
}

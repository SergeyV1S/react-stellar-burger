import type { IIngredient } from "@interfaces/ingredient"

export const formatIngredientsForRequest = (bunId: string, ingredients: IIngredient[]) => [
  bunId,
  ...ingredients.map((ingredient) => ingredient._id),
  bunId
]

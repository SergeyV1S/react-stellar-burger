import type { IIngredient } from "@interfaces/ingredient"

export const countTotalCost = (bun: IIngredient | null, ingredients: IIngredient[]) =>
  (bun ? bun.price * 2 : 0) + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

import type { IIngredient } from "@interfaces/ingredient";

export const filterCategories = (data: IIngredient[]) => {
  const ingredients = data.filter((ingredient) => ingredient.type !== "bun");
  const bun = data.filter((item) => item.type === "bun")[0];
  return { ingredients, bun };
};

import type { IIngredient } from "@interfaces/ingredient";

export const filterCategories = (data: IIngredient[]) => {
  const buns = data.filter((item) => item.type === "bun");
  const mains = data.filter((item) => item.type === "main");
  const sauces = data.filter((item) => item.type === "sauce");
  return { buns, mains, sauces };
};

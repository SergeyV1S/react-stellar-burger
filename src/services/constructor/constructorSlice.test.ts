import type { IIngredient } from "@interfaces/ingredient";

import {
  addIngredientToConstructor,
  clearConstructor,
  constructorSlice,
  initialState,
  moveItem,
  removeIngredientFromConstructor
} from "./reducer";

const ingredient: IIngredient = {
  __v: 1,
  _id: "fwgqwgqgq",
  calories: 111,
  carbohydrates: 1111,
  fat: 43243242,
  image: "image",
  image_large: "large_image",
  image_mobile: "mobile_image",
  name: "d",
  price: 111,
  proteins: 13431,
  type: "sauce",
  uuid: "dd-q"
};

describe("constructor slice", () => {
  it("initial state correctly", () => {
    const result = constructorSlice.reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("add ingredient to constructor", () => {
    const action = { type: addIngredientToConstructor.type, payload: ingredient };

    const result = constructorSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, ingredients: [ingredient] });
  });

  it("add bun to constructor", () => {
    const ingredientForBunTest: IIngredient = { ...ingredient, type: "bun" };
    const action = { type: addIngredientToConstructor.type, payload: ingredientForBunTest };

    const result = constructorSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, bun: ingredientForBunTest });
  });

  it("remove ingredient from constructor", () => {
    const prevState = { ...initialState, ingredients: [ingredient] };
    const action = { type: removeIngredientFromConstructor.type, payload: ingredient };

    const result = constructorSlice.reducer(prevState, action);

    expect(result).toEqual(initialState);
  });

  it("dnd move ingredient in constructor", () => {
    const prevState = {
      ...initialState,
      bun: ingredient,
      ingredients: [
        ingredient,
        { ...ingredient, _v: 2, _id: "ufdsoia", uuid: "ar-he" },
        { ...ingredient, _v: 3, _id: "uoia", uuid: "oa-shf" }
      ]
    };
    const action = { type: moveItem.type, payload: { dragIndex: 0, hoverIndex: 2 } };

    const result = constructorSlice.reducer(prevState, action);

    expect(result.ingredients).toEqual([
      { ...ingredient, _v: 2, _id: "ufdsoia", uuid: "ar-he" },
      { ...ingredient, _v: 3, _id: "uoia", uuid: "oa-shf" },
      ingredient
    ]);
  });

  it("clear constructor", () => {
    const prevState = { ...initialState, bun: ingredient, ingredients: [{ ...ingredient, type: "sauce" }] };
    const action = { type: clearConstructor.type };

    const result = constructorSlice.reducer(prevState, action);

    expect(result).toEqual(initialState);
  });
});

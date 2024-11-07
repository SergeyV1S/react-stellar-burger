import type { IIngredient } from "@interfaces/ingredient";

import {
  addIngredientToConstructor,
  clearConstructor,
  constructorSlice,
  initialState,
  moveItem,
  removeIngredientFromConstructor
} from "./reducer";

const testIngredient: IIngredient = {
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
    const action = { type: addIngredientToConstructor.type, payload: testIngredient };

    const result = constructorSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, ingredients: [testIngredient] });
  });

  it("add bun to constructor", () => {
    const ingredientForBunTest: IIngredient = { ...testIngredient, type: "bun" };
    const action = { type: addIngredientToConstructor.type, payload: ingredientForBunTest };

    const result = constructorSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, bun: ingredientForBunTest });
  });

  it("remove ingredient from constructor", () => {
    const prevState = { ...initialState, ingredients: [testIngredient] };
    const action = { type: removeIngredientFromConstructor.type, payload: testIngredient };

    const result = constructorSlice.reducer(prevState, action);

    expect(result).toEqual(initialState);
  });

  it("dnd move ingredient in constructor", () => {
    const prevState = {
      ...initialState,
      bun: testIngredient,
      ingredients: [
        testIngredient,
        { ...testIngredient, _v: 2, _id: "ufdsoia", uuid: "ar-he" },
        { ...testIngredient, _v: 3, _id: "uoia", uuid: "oa-shf" }
      ]
    };
    const action = { type: moveItem.type, payload: { dragIndex: 0, hoverIndex: 2 } };

    const result = constructorSlice.reducer(prevState, action);

    expect(result.ingredients).toEqual([
      { ...testIngredient, _v: 2, _id: "ufdsoia", uuid: "ar-he" },
      { ...testIngredient, _v: 3, _id: "uoia", uuid: "oa-shf" },
      testIngredient
    ]);
  });

  it("clear constructor", () => {
    const prevState = { ...initialState, bun: testIngredient, ingredients: [{ ...testIngredient, type: "sauce" }] };
    const action = { type: clearConstructor.type };

    const result = constructorSlice.reducer(prevState, action);

    expect(result).toEqual(initialState);
  });
});

import type { IIngredient } from "@interfaces/ingredient";

import { getIngredientsAction } from "./action";
import { closeIngredientModal, ingredientSlice, initialState, setSelectedIngredient } from "./reducer";

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

describe("ingredient slice", () => {
  it("initial state correctly", () => {
    const result = ingredientSlice.reducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("close ingredient modal", () => {
    const action = { type: closeIngredientModal.type };

    const result = ingredientSlice.reducer(initialState, action);

    expect(result.modal).toEqual(initialState.modal);
  });

  it("set selected ingredient to state", () => {
    const action = { type: setSelectedIngredient.type, payload: testIngredient };

    const result = ingredientSlice.reducer(initialState, action);

    expect(result.modal).toEqual({
      selectedIngredient: testIngredient,
      isSelectedIngredientModalOpen: true
    });
  });

  it("get ingredient fulfilled", () => {
    const action = { type: getIngredientsAction.fulfilled.type, payload: { data: [testIngredient] } };

    const result = ingredientSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      data: [testIngredient],
      ingredientsMap: new Map<string, IIngredient>().set(testIngredient._id, testIngredient)
    });
  });

  it("get ingredient rejected", () => {
    const action = { type: getIngredientsAction.rejected.type, error: { message: "Error" } };

    const result = ingredientSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, error: action.error.message });
  });

  it("get ingredient pending", () => {
    const action = { type: getIngredientsAction.pending.type };

    const result = ingredientSlice.reducer(initialState, action);

    expect(result).toEqual({ ...initialState, isLoading: true });
  });
});

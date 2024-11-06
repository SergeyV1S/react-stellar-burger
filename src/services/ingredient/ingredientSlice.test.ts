import type { IIngredient } from "@interfaces/ingredient";

import { closeIngredientModal, ingredientSlice, initialState, setSelectedIngredient } from "./reducer";

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
    const action = { type: setSelectedIngredient.type, payload: ingredient };

    const result = ingredientSlice.reducer(initialState, action);

    expect(result.modal).toEqual({
      selectedIngredient: ingredient,
      isSelectedIngredientModalOpen: true
    });
  });
});

import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "@services/actions/consructor";

import type { IConstructorInitialState, TConstructorActions } from "./types";

const initialState: IConstructorInitialState = {
  bun: null,
  ingredients: []
};

export const constructorRuducer = (state = initialState, action: TConstructorActions): IConstructorInitialState => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      if (action.ingredient.type !== "bun") {
        return {
          ...state,
          ingredients: [...state.ingredients, action.ingredient]
        };
      } else {
        return {
          ...state,
          bun: action.ingredient
        };
      }
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter((ingredient) => ingredient.uuid !== action.ingredient.uuid)
      };
    }
    default: {
      return state;
    }
  }
};

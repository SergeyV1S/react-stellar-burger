import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  MOVE_ITEM,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR
} from "@services/actions/consructor";

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
    case MOVE_ITEM: {
      const updatedIngredients = [...state.ingredients];
      const [draggedIngredient] = updatedIngredients.splice(action.payload.dragIndex, 1);
      updatedIngredients.splice(action.payload.hoverIndex, 0, draggedIngredient);
      return {
        ...state,
        ingredients: updatedIngredients
      };
    }
    default: {
      return state;
    }
  }
};

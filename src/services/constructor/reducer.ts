import type { IIngredient } from "@interfaces/ingredient"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice, nanoid } from "@reduxjs/toolkit"

import type { IConstructorInitialState } from "./types"

const initialState: IConstructorInitialState = {
  bun: null,
  ingredients: []
}

export const consructorSlice = createSlice({
  name: "constructorSlice",
  initialState,
  reducers: {
    addIngredientToConstructor: {
      reducer: (state, action: PayloadAction<IIngredient>) => {
        if (action.payload.type !== "bun") {
          state.ingredients.push(action.payload)
        } else {
          state.bun = action.payload
        }
      },
      prepare: (selectedIngredient) => ({ payload: { ...selectedIngredient, uuid: nanoid() } })
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<IIngredient>) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.uuid !== action.payload.uuid)
    },
    moveItem: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const updatedIngredients = [...state.ingredients]
      const [draggedIngredient] = updatedIngredients.splice(action.payload.dragIndex, 1)
      updatedIngredients.splice(action.payload.hoverIndex, 0, draggedIngredient)
      state.ingredients = updatedIngredients
    },
    clearConstructor: (state) => {
      state.bun = null
      state.ingredients = []
    }
  },
  selectors: {
    getConstructorState: (state) => state
  }
})

export const { addIngredientToConstructor, moveItem, removeIngredientFromConstructor, clearConstructor } =
  consructorSlice.actions

export const { getConstructorState } = consructorSlice.selectors

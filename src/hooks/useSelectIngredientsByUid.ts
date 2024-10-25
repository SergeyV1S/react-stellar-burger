import { getIngredienstMapData } from "@services/ingredient";
import { useAppSelector } from "@services/store";
import { useCallback } from "react";

export const useSelectIngredientsByUid = () => {
  const ingredientsFromState = useAppSelector(getIngredienstMapData);

  const getIngredientFromMap = useCallback(
    (ingredientsUid: string[]) => ingredientsUid.map((uid) => ingredientsFromState.get(uid)),
    [ingredientsFromState]
  );

  return { getIngredientFromMap };
};

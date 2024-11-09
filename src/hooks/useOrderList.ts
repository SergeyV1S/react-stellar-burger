import { getIngredienstMapData } from "@services/ingredient";
import { useAppSelector } from "@services/store";
import { useCallback } from "react";

export const useOrderList = () => {
  const ingredientsFromState = useAppSelector(getIngredienstMapData);

  const getIngredientFromMap = useCallback(
    (ingredientsUid: string[]) =>
      ingredientsUid.map((uid) => ingredientsFromState.get(uid)).filter((ingredient) => ingredient !== undefined),
    [ingredientsFromState]
  );

  const countTotalOrderCost = useCallback(
    (ingredientsUid: string[]) =>
      getIngredientFromMap(ingredientsUid).reduce((sum, ingrdient) => sum + ingrdient.price, 0),
    [getIngredientFromMap]
  );

  return { getIngredientFromMap, countTotalOrderCost };
};

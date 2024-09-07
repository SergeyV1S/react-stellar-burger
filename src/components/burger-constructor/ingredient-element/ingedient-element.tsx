import type { IIngredient } from "@interfaces/ingredient";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import burgerIngredientElement from "./ingredient-element.module.css";

interface IIngredientElementProps {
  removeIngredientFromConstructor: (ingredient: IIngredient) => {
    type: "REMOVE_INGREDIENT_FROM_CONSTRUCTOR";
    ingredient: IIngredient;
  };
  ingredient: IIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

export const IngredientElement = ({
  removeIngredientFromConstructor,
  ingredient,
  index,
  moveIngredient
}: IIngredientElementProps) => {
  const ingredientElementRef = useRef<HTMLDivElement>(null);

  const [, dropTargetIngredientsRef] = useDrop({
    accept: "switch-ingredient-position",
    hover: (draggedItem: any, monitor) => {
      if (!ingredientElementRef.current) return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ingredientElementRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY && hoverClientY > hoverMiddleY) return;

      moveIngredient(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    }
  });

  const [{ isDragging }, dragIngredientRef, dragPreviewIngredientRef] = useDrag({
    type: "switch-ingredient-position",
    item: { ...ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  dragPreviewIngredientRef(dropTargetIngredientsRef(dragIngredientRef(ingredientElementRef)));

  return (
    <div
      ref={ingredientElementRef}
      className={burgerIngredientElement.ingredients_container}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={burgerIngredientElement.drag_icon_wrapper}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        handleClose={() => removeIngredientFromConstructor(ingredient)}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
};

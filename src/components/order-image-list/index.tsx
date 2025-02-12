import type { IIngredient } from "@interfaces/ingredient";
import { cn } from "@src/utils";

import orderImageListStyles from "./order-image-list.module.css";

interface IOrderImageListProps {
  ingredient: IIngredient;
  index: number;
  imageCount: number;
}

export const OrderImageList = ({ ingredient, index, imageCount }: IOrderImageListProps) => (
  <div className={orderImageListStyles.image_wrapper}>
    <img
      className={cn("orderImageListStyles.image", index === 5 && orderImageListStyles.image_last)}
      src={ingredient.image_mobile}
      alt={ingredient.name}
    />
    {index === 5 && (
      <p className={cn("text text_type_digits-default", orderImageListStyles.last_image_counter)}>+{imageCount}</p>
    )}
  </div>
);

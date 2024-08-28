import type { IIngredient } from "@interfaces/ingredient";

import { BurgerItem } from "../burger-item";
import burgerTypeBlock from "./burger-type-block.module.css";

interface BurgerTypeBlockProps {
  items: IIngredient[];
  blockName: string;
}

export const BurgerTypeBlock = ({ items, blockName }: BurgerTypeBlockProps) => (
  <div>
    <h2 className='text text_type_main-medium'>{blockName}</h2>
    <div className={burgerTypeBlock.container}>
      {items.map((item) => (
        <BurgerItem count={1} item={item} key={item._id} />
      ))}
    </div>
  </div>
);

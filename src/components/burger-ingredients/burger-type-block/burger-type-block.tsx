import type { IDataType } from "@utils/data";

import { BurgerItem } from "../burger-item";
import burgerTypeBlock from "./burger-type-block.module.css";

interface BurgerTypeBlockProps {
  items: IDataType[];
  blockName: string;
}

export const BurgerTypeBlock = ({ items, blockName }: BurgerTypeBlockProps) => (
  <div>
    <h2 className='text text_type_main-medium'>{blockName}</h2>
    <div className={burgerTypeBlock.container}>
      {items.map((bun) => (
        <BurgerItem count={1} image={bun.image} name={bun.name} price={bun.price} key={bun._id} />
      ))}
    </div>
  </div>
);

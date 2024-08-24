import { AppHeader } from "@components/app-header";
import { BurgerConstructor } from "@components/burger-constructor";
import { BurgerIngredients } from "@components/burger-ingredients";

import app from "./app.module.css";

export const App = () => (
  <>
    <AppHeader />
    <main className={app.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  </>
);

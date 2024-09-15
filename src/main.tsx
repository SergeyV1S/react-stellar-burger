import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "@components/app";

import "./index.css";
import store from "./services/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

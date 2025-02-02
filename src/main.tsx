import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { IsMobileProvider } from "./context/IsMobileProvider";
import "./index.css";
import { AppRoutes } from "./router";
import store from "./services/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <IsMobileProvider>
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  </IsMobileProvider>
);

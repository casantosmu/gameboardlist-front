import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { setupStore } from "./store/store";
import GlobalStyle from "./styles/GlobalStyle/GlobalStyle";
import Theme from "./styles/Theme/Theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

const store = setupStore();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Theme>
          <GlobalStyle />
          <App />
        </Theme>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import GlobalStyle from "./styles/GlobalStyle/GlobalStyle";
import Theme from "./styles/Theme/Theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <GlobalStyle />
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>
);

import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../store/store";
import GlobalStyle from "../styles/GlobalStyle/GlobalStyle";
import Theme from "../styles/Theme/Theme";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
    <Provider store={store}>
      <Theme>
        <GlobalStyle />
        {children}
      </Theme>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProviders;

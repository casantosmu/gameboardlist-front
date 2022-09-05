import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import uiSlice from "./slices/uiSlice";

const rootReducer = combineReducers({
  user: userSlice,
  ui: uiSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

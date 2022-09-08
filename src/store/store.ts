import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice/userSlice";
import uiSlice from "./slices/uiSlice/uiSlice";
import gameboardsSlice from "./slices/gameboardsSlice/gameboardsSlice";

const rootReducer = combineReducers({
  user: userSlice,
  ui: uiSlice,
  gameboards: gameboardsSlice,
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

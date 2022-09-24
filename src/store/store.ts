import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import gameboardsSlice from "./gameboards/gameboardsSlice";
import userSlice from "./user/userSlice";
import uiSlice from "./ui/uiSlice";

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

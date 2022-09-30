import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gameboard, Gameboards } from "../../types/gameboards";

interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | false;
  gameboards: Gameboards;
}

const initialState: InitialState = {
  status: "idle",
  error: false,
  gameboards: [],
};

const gameboardsSlice = createSlice({
  name: "gameboards",
  initialState,
  reducers: {
    gameboardsLoad: (state) => {
      state.status = "loading";
      state.error = false;
    },
    gameboardsLoadSuccess: (_, action: PayloadAction<Gameboards>) => {
      return {
        status: "succeeded",
        error: false,
        gameboards: action.payload,
      };
    },
    gameboardsLoadFailure: (_, action: PayloadAction<string>) => {
      return {
        status: "failed",
        error: action.payload,
        gameboards: [],
      };
    },
    gameboardsDeleteSuccess: (state, action: PayloadAction<string>) => {
      state.status = "succeeded";
      state.gameboards = state.gameboards.filter(
        (gameboard) => gameboard.id !== action.payload
      );
    },
    gameboardsAdd: (state, action: PayloadAction<Gameboard>) => {
      state.gameboards = [...state.gameboards, action.payload];
    },
  },
});

export const {
  gameboardsLoad: gameboardsLoadAction,
  gameboardsLoadSuccess: gameboardsLoadSuccessAction,
  gameboardsLoadFailure: gameboardsLoadFailureAction,
  gameboardsDeleteSuccess: gameboardsDeleteSuccessAction,
  gameboardsAdd: gameboardsAddAction,
} = gameboardsSlice.actions;
export default gameboardsSlice.reducer;

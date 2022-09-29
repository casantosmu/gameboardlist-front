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
      return {
        status: "loading",
        error: false,
        gameboards: state.gameboards,
      };
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
    gameboardsDelete: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        gameboards: state.gameboards.filter(
          (gameboard) => gameboard.id !== action.payload
        ),
      };
    },
    gameboardsAdd: (state, action: PayloadAction<Gameboard>) => {
      return {
        ...state,
        gameboards: [...state.gameboards, action.payload],
      };
    },
  },
});

export const {
  gameboardsLoad: gameboardsLoadAction,
  gameboardsLoadSuccess: gameboardsLoadSuccessAction,
  gameboardsLoadFailure: gameboardsLoadFailureAction,
  gameboardsDelete: gameboardsDeleteAction,
  gameboardsAdd: gameboardsAddAction,
} = gameboardsSlice.actions;
export default gameboardsSlice.reducer;

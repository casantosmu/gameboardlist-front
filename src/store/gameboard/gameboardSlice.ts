import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gameboard } from "../../types/gameboards";

interface InitialState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | false;
  gameboard: Gameboard | null;
}

const initialState: InitialState = {
  status: "idle",
  error: false,
  gameboard: null,
};

const gameboardSlice = createSlice({
  name: "gameboard",
  initialState,
  reducers: {
    gameboardLoad: (state) => {
      return {
        status: "loading",
        error: false,
        gameboard: state.gameboard,
      };
    },
    gameboardLoadSuccess: (_, action: PayloadAction<Gameboard>) => {
      return {
        status: "succeeded",
        error: false,
        gameboard: action.payload,
      };
    },
    gameboardLoadFailure: (_, action: PayloadAction<string>) => {
      return {
        status: "failed",
        error: action.payload,
        gameboard: null,
      };
    },
  },
});

export const {
  gameboardLoad: gameboardLoadAction,
  gameboardLoadSuccess: gameboardLoadSuccessAction,
  gameboardLoadFailure: gameboardLoadFailureAction,
} = gameboardSlice.actions;
export default gameboardSlice.reducer;

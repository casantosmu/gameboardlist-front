import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gameboards } from "../../types/interfaces";

const initialGameboards = {
  gameboards: [] as Gameboards,
};

const gameboardsSlice = createSlice({
  name: "gameboards",
  initialState: initialGameboards,
  reducers: {
    loadGameboards(state, action: PayloadAction<Gameboards>) {
      return {
        ...state,
        gameboards: action.payload,
      };
    },
  },
});

export const { loadGameboards: loadGameboardsAction } = gameboardsSlice.actions;
export default gameboardsSlice.reducer;

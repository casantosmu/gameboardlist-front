import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/interfaces";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { loginUser: loginUserAction } = userSlice.actions;
export default userSlice.reducer;

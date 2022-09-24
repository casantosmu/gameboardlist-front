import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/interfaces";
import { getInitialUser } from "../../utils/utils";

const initialUser = getInitialUser();

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    loginUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { loginUser: loginUserAction } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/interfaces";
import getInitialUser from "../../utils/getInitialUser";

const initialUser = getInitialUser();

const userSlice = createSlice({
  name: "user",
  initialState: initialUser as User,
  reducers: {
    loginUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { loginUser: loginUserAction } = userSlice.actions;
export default userSlice.reducer;

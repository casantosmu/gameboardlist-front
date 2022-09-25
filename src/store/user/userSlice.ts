import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { getInitialUser } from "../../utils/utils";

const initialUser = getInitialUser();

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    loginUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
    logoutUser() {
      return {
        id: "",
        name: "",
        email: "",
        token: "",
      };
    },
  },
});

export const { loginUser: loginUserAction, logoutUser: logoutUserAction } =
  userSlice.actions;
export default userSlice.reducer;
